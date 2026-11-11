# c1t0d0s0.github.io

c1t0d0s0 が制作・公開している Web アプリのポータルサイトです。
GitHub Pages でビルドなしにそのまま公開しています（https://c1t0d0s0.y8n.org/）。

| ページ | 内容 |
|---|---|
| [`index.html`](https://c1t0d0s0.y8n.org/) | ポータル。各 Web アプリへのカード一覧（日本語／英語、ライト／ダーク） |
| [`study.html`](https://c1t0d0s0.y8n.org/study.html) | **THE LEARNING ZOO**。小学生向け学習アプリのリンク集 |
| [`desktop.html`](https://c1t0d0s0.y8n.org/desktop.html) | CDE（UNIX ワークステーション）風の Web デスクトップ。アプリをウィンドウで開ける |

ポータルと THE LEARNING ZOO は、それぞれ別の PWA としてインストールできます。

---

## ポータル（index.html）

- カードは `sitemap.xml` の `<lastmod>` が新しい順に並びます。1週間以内に更新されたカードには、キラキラの印が付きます。
- 日本語／英語の切り替えと、ライト／ダークテーマの切り替えができます（`app.js` の `I18N_DATA`）。
- 検索とカテゴリでの絞り込みができます。
- 構造化データ（JSON-LD）を `<head>` に持っています。

**アプリを追加するとき**は、次の4か所を更新します。

1. `index.html` のカード
2. `index.html` の JSON-LD（`WebApplication` と `ItemList` の項目、`numberOfItems`）
3. `app.js` の日英の文言
4. `sitemap.xml`

サムネイルは `assets/images/` に、`.webp` と `.jpg` の両方を置きます。

## THE LEARNING ZOO（study.html）

算数・国語・理科・社会の黒板に、学習アプリへのリンクを並べた動物園風のページです。
各教科にはキャラクター（リスザル・オオヤマネコ・柴犬・スズメ）がいます。

- **全画面ビューアー**: リンクはページ内の全画面ビューアー（iframe）で開き、「もどる」でこのページに戻ります。
- **学年えらび**: 選んだ学年を `?grade=N` として各アプリへ渡します。
- **季節と時刻**:
  - 月ごとに、背景（空・地面・木・置き物・降ってくるもの）が変わります。
  - 時刻に合わせて、空の色と太陽・月の位置が変わります。
  - 1・4・6・8・10・12月は、動物たちが季節の格好をします。
- **ライオンの家族**: 幅 1280px 以上の画面では、ライオンの親子が黒板の後ろを通って左右を歩き回ります。
- **スーパー**: 教科ごとの「今日のチャレンジ」を7日連続でクリアすると、その教科の動物が金色の「スーパー」になります。4匹そろうと、ライオンもスーパーになります。
- **がんばり ノート**: Google ログインすると、学習アプリの記録（Firestore）から、今日・今週・今月の進捗をグラフで見られます。

**リンクを追加するとき**は、次の3か所を更新します。

1. 該当する教科の `<ul class="links">` に `<li>` を1つ足す
2. `<head>` の JSON-LD に同じアプリを足す
3. `sitemap.xml` に追加する

がんばり ノートの集計対象は、リンクから自動で決まります。アプリの記録 ID がパス名と同じであることが前提です。

### 確認用のクエリパラメータ

| パラメータ | 例 | 内容 |
|---|---|---|
| `month` | `?month=12` | 指定した月の背景・衣装で表示 |
| `time` | `?time=18`、`?time=18:30` | 指定した時刻の空で表示（`hour` も可） |
| `super` | `?super=all`、`?super=lynx,math`、`?super=none` | スーパーの姿を確認。動物名と教科名のどちらでも指定できる |
| `lions` | `?lions=walk`（`run` / `sit` / `sleep` / `idle`） | ライオン全員のポーズを固定 |
| `lionspeed` | `?lionspeed=10` | ライオンの動きを速くする |
| `emulator` | `?emulator=1` | localhost のとき、Firebase エミュレーターに接続 |

組み合わせて使えます（例: `study.html?month=1&time=21&super=all`）。

### ファイル

| ファイル | 内容 |
|---|---|
| `study.html` | ページ本体（HTML・CSS・季節／空／ビューアー／学年のスクリプト） |
| `assets/study/progress.js` | Google ログインと、がんばり ノートのグラフ |
| `assets/study/lions.js` | ライオンの家族の絵と行動 |
| `assets/study/costumes.js` | 季節の衣装 |
| `assets/study/super.js` | スーパー判定と金色の姿 |
| `study.webmanifest`、`study-sw.js` | PWA（スコープは `/study.html`） |

## PWA

| | ポータル | THE LEARNING ZOO |
|---|---|---|
| マニフェスト | `portal.webmanifest`（id・scope: `/`） | `study.webmanifest`（id・scope: `/study.html`） |
| サービスワーカー | `sw.js` | `study-sw.js` |
| アイコン | `assets/icons/` | `assets/study/icon-*.png` |

- 2つのサービスワーカーは、どちらもページをネットワーク優先で読み、オフラインのときは保存したコピーを使います。
- `sw.js` は、`assets/images/` のサムネイルも24時間キャッシュします。

## Firebase の設定（config.js）

study.html の Google ログインには、学習アプリと同じ Firebase プロジェクトの設定が必要です。

- **本番**: GitHub Actions（`.github/workflows/deploy.yml`）が、リポジトリ変数から `config.js` を生成します。必要な変数は `FIREBASE_API_KEY` / `FIREBASE_AUTH_DOMAIN` / `FIREBASE_PROJECT_ID` / `FIREBASE_APP_ID` の4つで、4つすべて登録されているときだけ生成されます。
- **ローカル**: `config.example.js` を `config.js` にコピーして値を入れます。`config.js` は `.gitignore` 済みです。
- **設定がない場合**: study.html はログインなしで動き、がんばり ノートは表示されません。

## sitemap.xml の更新

`update_sitemap.py` は、`sitemap.xml` に登録された各 URL の `Last-Modified` ヘッダーを見て、`<lastmod>` を更新します（日付は日本時間）。

```sh
python3 update_sitemap.py --dry-run               # 変更内容だけ確認
python3 update_sitemap.py                         # 書き込む
python3 update_sitemap.py --update-top-to-latest  # トップ（/）を全アプリ中の最新日付にそろえる
```

その他のオプション: `--timeout 秒`、`--workers 並列数`、`--verbose`

## ローカルで動かす

ビルドは不要です。サービスワーカーや `sitemap.xml` の読み込みがあるため、`file://` ではなく HTTP サーバー経由で開きます。

```sh
python3 -m http.server 8000
# http://localhost:8000/ と http://localhost:8000/study.html を開く
```

## デプロイ

`main` ブランチに push すると、GitHub Actions がリポジトリ全体を GitHub Pages に公開します。
公開前に、`config.js` の生成が行われます（上記）。
