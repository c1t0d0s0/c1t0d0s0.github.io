#!/usr/bin/env python3
"""
update_sitemap.py

sitemap.xml に登録されている各 Web ページを HTTP HEAD/GET でチェックし、
サーバーから返される Last-Modified ヘッダーを元に sitemap.xml の <lastmod> を自動更新するスクリプト。

特徴:
- sitemap.xml 内のコメント（<!-- ... -->）やインデント、改行等の構造を 100% 保持
- ThreadPoolExecutor による並行処理で全 URL を高速チェック
- HEAD リクエストを基本とし、ヘッダーが得られない場合は GET でフォールバック
- 日本標準時 (JST, Asia/Tokyo) に変換して YYYY-MM-DD 形式で記録
- --dry-run オプション対応（書き込みを行わずに変更差分のみ確認可能）
"""

import argparse
import concurrent.futures
import email.utils
import os
import re
import ssl
import sys
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

# デフォルトのタイムゾーン (JST: UTC+9)
DEFAULT_TIMEZONE = timezone(timedelta(hours=9))


def parse_http_last_modified(header_val: str, tz: timezone = DEFAULT_TIMEZONE) -> str | None:
    """HTTP Last-Modified ヘッダー文字列 (RFC 2822/1123) を YYYY-MM-DD 形式に変換する"""
    if not header_val:
        return None
    try:
        dt = email.utils.parsedate_to_datetime(header_val)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        local_dt = dt.astimezone(tz)
        return local_dt.strftime("%Y-%m-%d")
    except Exception as e:
        sys.stderr.write(f"Warning: Failed to parse Last-Modified '{header_val}': {e}\n")
        return None


def fetch_url_last_modified(url: str, timeout: float = 10.0, tz: timezone = DEFAULT_TIMEZONE) -> tuple[str, str | None, str]:
    """
    指定された URL へ HEAD (失敗時は GET) リクエストを送り、Last-Modified 日付を取得する。
    戻り値: (url, YYYY-MM-DD日付 or None, メッセージ)
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; sitemap-updater/1.0; +https://c1t0d0s0.y8n.org/)",
        "Accept": "*/*",
    }
    ctx = ssl.create_default_context()

    # 1. まずは HEAD リクエストで高速取得
    try:
        req = urllib.request.Request(url, headers=headers, method="HEAD")
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
            lm_header = resp.headers.get("Last-Modified")
            if lm_header:
                date_str = parse_http_last_modified(lm_header, tz=tz)
                if date_str:
                    return url, date_str, f"HTTP {resp.status} (HEAD)"
    except urllib.error.HTTPError as e:
        # 405 Method Not Allowed などの場合は GET にフォールバック
        if e.code not in (405, 501):
            return url, None, f"HTTP Error {e.code}"
    except Exception as e:
        pass

    # 2. HEAD で得られなかった場合は GET (最初の 1KB のみ) で再試行
    try:
        get_headers = headers.copy()
        get_headers["Range"] = "bytes=0-1024"
        req = urllib.request.Request(url, headers=get_headers, method="GET")
        with urllib.request.urlopen(req, timeout=timeout, context=ctx) as resp:
            lm_header = resp.headers.get("Last-Modified")
            if lm_header:
                date_str = parse_http_last_modified(lm_header, tz=tz)
                if date_str:
                    return url, date_str, f"HTTP {resp.status} (GET)"
            return url, None, f"HTTP {resp.status} (No Last-Modified header)"
    except urllib.error.HTTPError as e:
        return url, None, f"HTTP Error {e.code}"
    except Exception as e:
        return url, None, f"Network Error: {e}"


def extract_sitemap_urls(xml_content: str) -> list[tuple[str, str | None]]:
    """sitemap.xml の中から (loc, lastmod) のタプルリストを抽出する"""
    results = []
    url_blocks = re.findall(r"<url>[\s\S]*?</url>", xml_content)
    for block in url_blocks:
        loc_match = re.search(r"<loc>\s*(https?://[^\s<]+)\s*</loc>", block)
        if not loc_match:
            continue
        loc = loc_match.group(1).strip()
        lastmod_match = re.search(r"<lastmod>\s*([^<\s]+)\s*</lastmod>", block)
        lastmod = lastmod_match.group(1).strip() if lastmod_match else None
        results.append((loc, lastmod))
    return results


def update_sitemap_content(
    xml_content: str,
    url_to_new_date: dict[str, str],
    update_top_to_latest: bool = False
) -> tuple[str, list[dict]]:
    """
    sitemap.xml のコンテンツ内の <lastmod> を更新する。
    戻り値: (更新後のXML文字列, 処理結果サマリーリスト)
    """
    results = []
    latest_date = None

    if update_top_to_latest:
        valid_dates = [d for d in url_to_new_date.values() if d]
        if valid_dates:
            latest_date = max(valid_dates)

    def replace_url_block(match: re.Match) -> str:
        block = match.group(0)
        loc_match = re.search(r"<loc>\s*(https?://[^\s<]+)\s*</loc>", block)
        if not loc_match:
            return block

        loc = loc_match.group(1).strip()
        lastmod_match = re.search(r"<lastmod>\s*([^<\s]+)\s*</lastmod>", block)
        old_date = lastmod_match.group(1).strip() if lastmod_match else None

        # トップページかつ --update-top-to-latest 指定時
        new_date = url_to_new_date.get(loc)
        if update_top_to_latest and loc.rstrip("/") in ("https://c1t0d0s0.y8n.org", "http://c1t0d0s0.y8n.org"):
            if latest_date:
                new_date = latest_date

        if not new_date:
            results.append({
                "loc": loc,
                "old_date": old_date,
                "new_date": None,
                "status": "SKIPPED",
                "detail": "Date not available"
            })
            return block

        if old_date == new_date:
            results.append({
                "loc": loc,
                "old_date": old_date,
                "new_date": new_date,
                "status": "UNCHANGED",
                "detail": "Already up to date"
            })
            return block

        # 更新を実行
        if lastmod_match:
            new_block = block[:lastmod_match.start(1)] + new_date + block[lastmod_match.end(1):]
        else:
            # lastmod がない場合は </loc> の後ろに追記
            new_block = block[:loc_match.end()] + f"\n    <lastmod>{new_date}</lastmod>" + block[loc_match.end():]

        results.append({
            "loc": loc,
            "old_date": old_date,
            "new_date": new_date,
            "status": "UPDATED",
            "detail": f"{old_date or '(none)'} -> {new_date}"
        })
        return new_block

    new_content = re.sub(r"<url>[\s\S]*?</url>", replace_url_block, xml_content)
    return new_content, results


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Check live web pages registered in sitemap.xml and update their <lastmod> dates based on server Last-Modified headers."
    )
    parser.add_argument(
        "sitemap",
        nargs="?",
        default="sitemap.xml",
        help="Path to sitemap.xml file (default: sitemap.xml)"
    )
    parser.add_argument(
        "--dry-run", "-n",
        action="store_true",
        help="Check and preview changes without modifying the sitemap.xml file"
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=10.0,
        help="HTTP request timeout in seconds (default: 10.0)"
    )
    parser.add_argument(
        "--workers", "-w",
        type=int,
        default=8,
        help="Number of concurrent worker threads (default: 8)"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Show details for all URLs, including unchanged ones"
    )
    parser.add_argument(
        "--update-top-to-latest",
        action="store_true",
        help="Set the top portal URL (/) to the newest lastmod date found among all apps"
    )

    args = parser.parse_args()

    sitemap_path = os.path.abspath(args.sitemap)
    if not os.path.isfile(sitemap_path):
        sys.stderr.write(f"Error: sitemap file not found at '{sitemap_path}'\n")
        return 1

    print(f"Reading sitemap from: {sitemap_path}")
    with open(sitemap_path, "r", encoding="utf-8") as f:
        xml_content = f.read()

    entries = extract_sitemap_urls(xml_content)
    if not entries:
        print("No <url> entries found in sitemap.")
        return 0

    print(f"Found {len(entries)} URLs in sitemap. Fetching Last-Modified headers (concurrency={args.workers})...\n")

    url_to_new_date: dict[str, str] = {}
    fetch_details: dict[str, str] = {}

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as executor:
        future_to_url = {
            executor.submit(fetch_url_last_modified, loc, args.timeout, DEFAULT_TIMEZONE): loc
            for loc, _ in entries
        }
        for future in concurrent.futures.as_completed(future_to_url):
            url, date_str, detail = future.result()
            if date_str:
                url_to_new_date[url] = date_str
            fetch_details[url] = detail

    updated_xml, results = update_sitemap_content(
        xml_content,
        url_to_new_date,
        update_top_to_latest=args.update_top_to_latest
    )

    # 差分表示
    updated_items = [r for r in results if r["status"] == "UPDATED"]
    unchanged_items = [r for r in results if r["status"] == "UNCHANGED"]
    skipped_items = [r for r in results if r["status"] == "SKIPPED"]

    print("=" * 75)
    print(f"{'STATUS':<10} {'DATE':<22} {'URL'}")
    print("=" * 75)

    for r in results:
        status = r["status"]
        if status == "UPDATED":
            date_info = f"{r['old_date'] or '(none)'} -> {r['new_date']}"
            print(f"\033[32m{status:<10}\033[0m {date_info:<22} {r['loc']}")
        elif status == "SKIPPED":
            print(f"\033[31m{status:<10}\033[0m {'-':<22} {r['loc']} ({fetch_details.get(r['loc'], '')})")
        elif args.verbose:
            print(f"\033[90m{status:<10}\033[0m {r['old_date'] or '-':<22} {r['loc']}")

    print("=" * 75)
    print(f"Summary: {len(results)} total | \033[32m{len(updated_items)} updated\033[0m | {len(unchanged_items)} unchanged | \033[31m{len(skipped_items)} skipped\033[0m")

    if args.dry_run:
        print("\n[DRY RUN] No changes were written to file.")
    else:
        if updated_items:
            with open(sitemap_path, "w", encoding="utf-8") as f:
                f.write(updated_xml)
            print(f"\nSuccessfully wrote {len(updated_items)} updates to: {sitemap_path}")
        else:
            print("\nAll URLs are already up to date. No changes needed.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
