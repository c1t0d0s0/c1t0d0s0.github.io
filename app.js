/* ==========================================================================
   c1t0d0s0 Portal - Interactive Application Scripts & i18n
   ========================================================================== */

/* --- Translation Data --- */
const I18N_DATA = {
  ja: {
    metaDesc: 'c1t0d0s0が制作・公開しているWebアプリケーションおよびWebツールのポータルサイトです。マンホールカード、NoxMind、世界遺産マスター、LexiDrop、Unit Converter、元素ラボ、ライフゲーム、モールスマスター、Votica、クラシック・ソロゲームズ、Planet Merge、NativeEar、釣行ナビ、QRコード生成、歴代指導者アーカイブ、カレンダー、Sumris、Bubblin\'、ISS Tracker、ABC譜面スタジオ、ジローバックスなどにアクセスできます。',
    themeToggleAria: 'テーマ切替',
    langToggleAria: '英語に切り替え',
    langToggleText: 'EN',
    /* U+00A0 は改行させない半角スペース、U+200B は許可する改行位置 */
    heroLead: 'c1t0d0s0\u00A0が制作・公開している\u200BWeb\u00A0アプリのポータルです。',
    searchPlaceholder: 'プロジェクトを検索...',
    searchAria: 'プロジェクトを検索',
    categories: {
      all: 'すべて',
      puzzle: 'ゲーム',
      collection: 'コレクション',
      tool: 'ツール',
      education: 'クイズ・学習'
    },
    cardAction: 'サイトを開く',
    noResults: '該当するプロジェクトが見つかりませんでした。',
    backToTopAria: 'ページ先頭へ戻る',
    cards: {
      'manhole': {
        title: 'マンホールカード',
        desc: '全国各地の鮮やかなデザインマンホールカードを集めて楽しむビューア＆マップ。地域の歴史や文化が詰まったご当地デザインを探訪できます。'
      },
      'noxmind': {
        title: 'NoxMind',
        desc: '思考を自由に広げ、複雑なアイデアを明快に整理するマインドマップ＆グラフィカル思考キャンバス。ノードを自由につなぎ合わせて発想を爆発させます。'
      },
      'world-heritage-quiz': {
        title: '世界遺産マスター',
        desc: '世界中の素晴らしい文化遺産や壮大な自然遺産をめぐる知識クイズ＆ガイド。多彩なクイズを通して世界遺産の歴史や魅力を楽しく学べます。'
      },
      'lexidrop': {
        title: 'LexiDrop',
        desc: '落下してくる英単語をキーボードでタイピングして爽快消去。ネイティブ音声の発音と日本語訳が表示され、楽しみながら英単語を学べるタイピングゲーム。'
      },
      'unit-converter': {
        title: 'Unit Converter',
        desc: 'アメリカと日本の単位体系（インチ↔センチ、ポンド↔キロ、華氏↔摂氏など）を相互にスムーズ変換。海外旅行や買い物、仕事で役立つ単位ツール。'
      },
      'element-lab': {
        title: '元素ラボ',
        desc: '全118元素の周期表とリアルタイム物理・化学反応サンドボックス。原子や化合物を自由に配置し、加熱・冷却・状態変化や多彩な化学反応を楽しく学べます。'
      },
      'conway-life': {
        title: 'ライフゲーム',
        desc: '生き残りと死滅のシンプルなルールから生まれる驚異の生命シミュレーション。グライダーやパルサーなど多彩なプリセットや自由なセル描画を楽しめます。'
      },
      'morse-master': {
        title: 'モールスマスター',
        desc: '音・光・タップで直感的にマスターできるモールス信号学習アプリ。聞き取りクイズ、パドル・電鍵による送信練習、和文・欧文の相互翻訳機を搭載。'
      },
      'votica': {
        title: 'Votica',
        desc: '多人数での決選投票・同率1位自動再投票に対応した、手軽で安全なGoogle認証投票Webサービス。'
      },
      'classic-solo-games': {
        title: 'クラシック・ソロゲームズ',
        desc: 'ソリティア（クロンダイク）、マインスイーパー、上海（麻雀ソリティア）など、一人遊びの名作クラシックゲームを快適な操作感と美しい演出で楽しめるゲームハブ。'
      },
      'planet-game': {
        title: 'Planet Merge',
        desc: '同じ惑星同士をぶつけて合体・進化！月や地球から太陽を目指してスコアを伸ばす爽快な物理演算落ち物パズルゲーム。'
      },
      'native-ear': {
        title: 'NativeEar',
        desc: 'TOEICリスニングスコアアップを目指すディクテーション＆シャドーイング特訓アプリ。7段階レベル別ネイティブ音声とリアルタイムDiff判定で耳と発音を鍛えます。'
      },
      'fishing-info': {
        title: '釣行ナビ',
        desc: '全国の釣り場の潮汐（タイドグラフ）・波高・風速・海水温などの海洋気象データと釣行指数、魚種図鑑、釣果ログを完備した釣り人向け総合ダッシュボード。'
      },
      'qr-generator': {
        title: 'QRコード生成',
        desc: 'URL、テキスト、Wi-Fi接続、メール、電話番号、連絡先（vCard）など多彩な形式のQRコードを瞬時に作成。ラベル付与やカラー設定、画像保存・コピーに対応。'
      },
      'leaders-archive': {
        title: '歴代指導者アーカイブ',
        desc: '日本の歴代首相、米歴代大統領、徳川十五代将軍の歩みを網羅した歴史アーカイブ。詳細な人物プロフィール、実績、歴史年表、理解度クイズを搭載。'
      },
      'calendar': {
        title: 'カレンダー',
        desc: '日本・アメリカ・イギリスの祝日に対応した年間カレンダー。西暦・和暦・干支の表示や祝日一覧、国別の年間スケジュールを1画面で直感的に確認できます。'
      },
      'sumris': {
        title: 'Sumris',
        desc: '暗算の爽快感と落ち物パズルのスリルが融合した新感覚の数字パズルゲーム。落下する数字ブロックを積み上げ、縦・横の合計を「10の倍数」にして爽快コンボ消去！'
      },
      'bubblin': {
        title: "Bubblin'",
        desc: '狙いを定めてバブルを発射！同色バブルを3つ以上繋げて爽快に弾け飛ばすアーケード風バブルシューティングパズルゲーム。'
      },
      'iss-tracker': {
        title: 'ISS Tracker',
        desc: '国際宇宙ステーション（ISS）の現在位置を地図上にリアルタイム表示。緯度・経度・高度・速度のテレメトリーに加え、任意の日時の軌道をシミュレーションできます。'
      },
      'music-abc': {
        title: 'ABC譜面スタジオ',
        desc: 'ABC記譜法の楽譜を表示・編集・リアルタイム再生・MIDIダウンロードできるWebエディタ。唱歌や国歌などの名曲ライブラリを収録。'
      },
      'jirobucks': {
        title: 'ジローバックス',
        desc: 'ラーメン二郎のコールとスターバックスのカスタム呪文を直感的に作成！店員に見せるモードや音声読み上げで注文も安心。'
      }
    }
  },
  en: {
    metaDesc: 'Portal site for web applications and digital tools created by c1t0d0s0. Explore Manhole Cards, NoxMind, World Heritage Master, LexiDrop, Unit Converter, Element Lab, Conway\'s Game of Life, Morse Master, Votica, Classic Solo Games, Planet Merge, NativeEar, Fishing Info, QR Code Generator, National Leaders Archive, Calendar, Sumris, Bubblin\', ISS Tracker, ABC Score Studio, Jirobucks, and more.',
    themeToggleAria: 'Toggle theme',
    langToggleAria: 'Switch to Japanese',
    langToggleText: 'JA',
    heroLead: 'A portal for the web applications and tools created by c1t0d0s0.',
    searchPlaceholder: 'Search projects...',
    searchAria: 'Search projects',
    categories: {
      all: 'All',
      puzzle: 'Puzzles & Games',
      collection: 'Collections',
      tool: 'Productivity',
      education: 'Quiz & Learning'
    },
    cardAction: 'Open App',
    noResults: 'No matching projects found.',
    backToTopAria: 'Back to top',
    cards: {
      'manhole': {
        title: 'Manhole Cards',
        desc: 'An interactive collection viewer and map of Japan\'s artistic manhole cards. Explore vibrant regional designs rich in local culture and history.'
      },
      'noxmind': {
        title: 'NoxMind',
        desc: 'A mind map and graphical thinking canvas to brainstorm freely and structure complex ideas. Connect concept nodes seamlessly to unlock creative inspiration.'
      },
      'world-heritage-quiz': {
        title: 'World Heritage Master',
        desc: 'A knowledge quiz and interactive guide exploring magnificent UNESCO cultural and natural heritage sites across the globe.'
      },
      'lexidrop': {
        title: 'LexiDrop',
        desc: 'An exhilarating typing game where you blast falling word blocks! Features native English audio pronunciations and translations for intuitive learning.'
      },
      'unit-converter': {
        title: 'Unit Converter',
        desc: 'A swift bidirectional converter between US customary and Japanese metric units (length, weight, volume, area, temperature) for travel, shopping, and work.'
      },
      'element-lab': {
        title: 'Element Lab',
        desc: 'An interactive periodic table of all 118 elements with a real-time chemistry sandbox. Experiment with heating, cooling, phase transitions, and chemical reactions.'
      },
      'conway-life': {
        title: 'Conway\'s Game of Life',
        desc: 'A captivating cellular automaton simulation where mesmerizing life patterns emerge from simple rules. Includes gliders, pulsars, and custom cell drawing.'
      },
      'morse-master': {
        title: 'Morse Master',
        desc: 'Master Morse code intuitively through sound, light, and interactive tap keyers. Features listening quizzes, telegraph keying practice, and real-time translators.'
      },
      'votica': {
        title: 'Votica',
        desc: 'A lightweight and secure Google-authenticated voting platform supporting multi-candidate runoff voting and automatic revotes for ties.'
      },
      'classic-solo-games': {
        title: 'Classic Solo Games',
        desc: 'A collection of legendary single-player classics including Klondike Solitaire, Minesweeper, and Shanghai (Mahjong Solitaire) with sleek controls and rich stats.'
      },
      'planet-game': {
        title: 'Planet Merge',
        desc: 'Drop and merge identical planets to evolve them into bigger celestial bodies! Reach the Sun and trigger black holes in this cosmic physics puzzle.'
      },
      'native-ear': {
        title: 'NativeEar',
        desc: 'A powerful dictation and shadowing app for TOEIC listening score improvement. Features 7 proficiency levels, native speech synthesis, and real-time word-by-word diff analysis.'
      },
      'fishing-info': {
        title: 'Fishing Info',
        desc: 'A comprehensive marine fishing dashboard offering real-time tide charts, wave heights, wind speeds, sea surface temperatures, fishing index, and catch logs.'
      },
      'qr-generator': {
        title: 'QR Code Generator',
        desc: 'Instantly generate custom QR codes for URLs, text, Wi-Fi networks, emails, phone numbers, and vCard contacts with label customizer and instant image download/copy.'
      },
      'leaders-archive': {
        title: 'National Leaders Archive',
        desc: 'An interactive historical archive and encyclopedia of Japanese Prime Ministers, US Presidents, and Tokugawa Shoguns. Explore detailed profiles, timelines, achievements, and quizzes.'
      },
      'calendar': {
        title: 'Calendar',
        desc: 'An interactive yearly calendar supporting public holidays for Japan, the US, and the UK. View 12-month layouts, Japanese era names, and holiday schedules at a glance.'
      },
      'sumris': {
        title: 'Sumris',
        desc: 'A fast-paced falling-block puzzle game blending spatial strategy with quick mental arithmetic. Stack falling numbered blocks to sum contiguous lines to multiples of 10 for explosive combo clears!'
      },
      'bubblin': {
        title: "Bubblin'",
        desc: 'A classic arcade-style bubble shooter puzzle game. Aim and launch bubbles to match 3 or more of the same color for satisfying chain reactions!'
      },
      'iss-tracker': {
        title: 'ISS Tracker',
        desc: 'Track the International Space Station live on a world map. View real-time latitude, longitude, altitude, and velocity telemetry, and simulate its orbit at any date and time.'
      },
      'music-abc': {
        title: 'ABC Score Studio',
        desc: 'A web application for rendering, editing, synthesizing, and downloading ABC notation sheet music. Features real-time audio playback and a classic song library.'
      },
      'jirobucks': {
        title: 'Jirobucks',
        desc: 'An intuitive order customizer for Ramen Jiro and Starbucks. Generate ordering calls and custom drink spells with simple taps, text-to-speech, and staff show mode.'
      }
    }
  }
};

let currentLanguage = 'ja';

/* Apply the stored theme before first paint to avoid a flash of the wrong theme */
applyStoredTheme();

document.addEventListener('DOMContentLoaded', () => {
  sortCardsBySitemap();
  initLanguage();
  initThemeToggle();
  initFiltering();
  initBackToTop();
});

/* --- 0. Sort Cards by sitemap.xml update date (lastmod descending) --- */
function parseSitemapLastmod(xmlText) {
  const map = {};

  function register(loc, lastmod) {
    if (!loc || !lastmod) return;
    const cleanLoc = loc.trim();
    const cleanMod = lastmod.trim();
    map[cleanLoc] = cleanMod;
    map[cleanLoc.replace(/\/+$/, '')] = cleanMod;
    const noProto = cleanLoc.replace(/^https?:\/\//i, '').replace(/\/+$/, '');
    if (noProto) {
      map[noProto] = cleanMod;
    }
  }

  // 1. Try DOMParser (standard XML parsing in browser)
  try {
    const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
    const urlElements = doc.getElementsByTagName('url');
    for (let i = 0; i < urlElements.length; i++) {
      const u = urlElements[i];
      const locEl = u.getElementsByTagName('loc')[0];
      const modEl = u.getElementsByTagName('lastmod')[0];
      if (locEl && modEl) {
        register(locEl.textContent, modEl.textContent);
      }
    }
  } catch (e) {
    // Parser error fallback
  }

  // 2. Fallback to Regex if DOMParser didn't extract entries
  if (Object.keys(map).length === 0) {
    const urlBlocks = xmlText.match(/<url>[\s\S]*?<\/url>/gi) || [];
    urlBlocks.forEach(block => {
      const locMatch = block.match(/<loc>\s*([^<\s]+)\s*<\/loc>/i);
      const modMatch = block.match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/i);
      if (locMatch && modMatch) {
        register(locMatch[1], modMatch[1]);
      }
    });
  }

  return map;
}

function isWithinOneWeek(lastmodStr) {
  if (!lastmodStr) return false;
  const parts = lastmodStr.split('-');
  if (parts.length < 3) return false;
  const lastmodDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor((today.getTime() - lastmodDate.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays >= -1 && diffDays <= 7;
}

function updateCardRecentBadge(card, lastmod) {
  const isRecent = isWithinOneWeek(lastmod);
  let badge = card.querySelector('.card-update-badge');
  if (isRecent) {
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'card-update-badge';
      badge.innerHTML = '<span class="badge-dot"></span>UPDATE';
      card.prepend(badge);
    }
    if (lastmod) {
      badge.setAttribute('title', `Updated: ${lastmod}`);
    }
  } else if (badge) {
    badge.remove();
  }
}

async function sortCardsBySitemap() {
  const cardsGrid = document.getElementById('cardsGrid');
  if (!cardsGrid) return;

  try {
    const response = await fetch('sitemap.xml', { cache: 'no-cache' });
    if (!response.ok) return;

    const xmlText = await response.text();
    const dateMap = parseSitemapLastmod(xmlText);
    if (!dateMap || Object.keys(dateMap).length === 0) return;

    const noResults = document.getElementById('noResults');
    const cards = Array.from(cardsGrid.querySelectorAll('.app-card'));
    if (cards.length <= 1) return;

    const getCardDate = (card) => {
      const rawHref = (card.getAttribute('href') || '').trim();
      const resolvedHref = (card.href || '').trim();
      const rawNoSlash = rawHref.replace(/\/+$/, '');
      const rawNoProto = rawNoSlash.replace(/^https?:\/\//i, '');
      const resolvedNoSlash = resolvedHref.replace(/\/+$/, '');
      const resolvedNoProto = resolvedNoSlash.replace(/^https?:\/\//i, '');

      return dateMap[rawHref] ||
             dateMap[rawNoSlash] ||
             dateMap[rawNoProto] ||
             dateMap[resolvedHref] ||
             dateMap[resolvedNoSlash] ||
             dateMap[resolvedNoProto] ||
             '';
    };

    const cardData = cards.map((card, index) => ({
      card,
      lastmod: getCardDate(card),
      originalIndex: index
    }));

    // Stable sort by lastmod descending (newest first).
    // If dates are identical or not found, preserve original DOM order.
    cardData.sort((a, b) => {
      if (a.lastmod && b.lastmod) {
        const cmp = b.lastmod.localeCompare(a.lastmod);
        if (cmp !== 0) return cmp;
      } else if (b.lastmod && !a.lastmod) {
        return 1;
      } else if (a.lastmod && !b.lastmod) {
        return -1;
      }
      return a.originalIndex - b.originalIndex;
    });

    cardData.forEach(item => {
      updateCardRecentBadge(item.card, item.lastmod);
      if (noResults) {
        cardsGrid.insertBefore(item.card, noResults);
      } else {
        cardsGrid.appendChild(item.card);
      }
    });
  } catch (err) {
    // If fetching or parsing fails (e.g. offline, local file protocol),
    // retain the static HTML card order as fallback.
    console.warn('Could not sort cards from sitemap.xml:', err);
  }
}

/* --- 1. Internationalization (i18n) & Language Switcher --- */
function detectBrowserLanguage() {
  const storedLang = localStorage.getItem('lang');
  if (storedLang === 'ja' || storedLang === 'en') {
    return storedLang;
  }

  // Check user's preferred browser languages
  const navLanguages = navigator.languages || [navigator.language || navigator.userLanguage || ''];
  const primaryLang = (navLanguages[0] || '').toLowerCase();
  
  // If primary browser language is Japanese -> 'ja', otherwise -> 'en'
  if (primaryLang.startsWith('ja')) {
    return 'ja';
  }
  return 'en';
}

function applyLanguage(lang) {
  currentLanguage = lang;
  const data = I18N_DATA[lang] || I18N_DATA.ja;

  // 1. Update <html> lang attribute
  document.documentElement.lang = lang;

  // 2. Update Meta description
  const metaDesc = document.getElementById('metaDescription');
  if (metaDesc) {
    metaDesc.setAttribute('content', data.metaDesc);
  }

  // 3. Update Hero
  const heroLead = document.getElementById('heroLead');
  if (heroLead) {
    heroLead.textContent = data.heroLead;
  }

  // 4. Update Search Input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.placeholder = data.searchPlaceholder;
    searchInput.setAttribute('aria-label', data.searchAria);
  }

  // 5. Update Category Buttons
  const tagButtons = document.querySelectorAll('.tag-btn[data-i18n-cat]');
  tagButtons.forEach(btn => {
    const cat = btn.dataset.i18nCat;
    if (data.categories[cat]) {
      btn.textContent = data.categories[cat];
    }
  });

  // 6. Update App Cards
  const cards = document.querySelectorAll('.app-card');
  cards.forEach(card => {
    const appId = card.dataset.appId;
    const cardData = data.cards[appId];
    if (cardData) {
      const titleEl = card.querySelector('.card-title-text');
      if (titleEl) titleEl.textContent = cardData.title;

      const descEl = card.querySelector('.card-desc');
      if (descEl) descEl.textContent = cardData.desc;
    }

    const actionTextEl = card.querySelector('.card-action-text');
    if (actionTextEl) actionTextEl.textContent = (cardData && cardData.actionText) || data.cardAction;
  });

  // 7. Update No Results Text
  const noResultsText = document.getElementById('noResultsText');
  if (noResultsText) {
    noResultsText.textContent = data.noResults;
  }

  // 8. Update Language Button
  const langText = document.getElementById('langText');
  if (langText) {
    langText.textContent = data.langToggleText;
  }

  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.setAttribute('aria-label', data.langToggleAria);
    langBtn.setAttribute('title', data.langToggleAria);
  }

  // 9. Update Aria Labels for Controls
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.setAttribute('aria-label', data.themeToggleAria);
  }

  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.setAttribute('aria-label', data.backToTopAria);
  }
}

function initLanguage() {
  const initialLang = detectBrowserLanguage();
  applyLanguage(initialLang);

  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const newLang = currentLanguage === 'ja' ? 'en' : 'ja';
      localStorage.setItem('lang', newLang);
      applyLanguage(newLang);
    });
  }
}

/* --- 2. Theme Toggle (Light / Dark) --- */
function applyStoredTheme() {
  const storedTheme = localStorage.getItem('theme');
  const theme = storedTheme || 'light';

  document.documentElement.setAttribute('data-theme', theme);
}

function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');

  // Toggle handler
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

/* --- 3. Live Search & Category Filtering --- */
function initFiltering() {
  const searchInput = document.getElementById('searchInput');
  const tagButtons = document.querySelectorAll('.tag-btn');
  const cards = document.querySelectorAll('.app-card');
  const noResults = document.getElementById('noResults');

  let activeCategory = 'all';
  let searchQuery = '';

  function filterCards() {
    let visibleCount = 0;

    cards.forEach(card => {
      const categories = (card.dataset.category || '').split(/\s+/);
      const titleJa = (card.dataset.titleJa || '').toLowerCase();
      const titleEn = (card.dataset.titleEn || '').toLowerCase();
      const descJa = (card.dataset.descJa || '').toLowerCase();
      const descEn = (card.dataset.descEn || '').toLowerCase();

      const matchesCategory = activeCategory === 'all' || categories.includes(activeCategory);
      const matchesSearch = !searchQuery || 
                            titleJa.includes(searchQuery) || 
                            titleEn.includes(searchQuery) || 
                            descJa.includes(searchQuery) || 
                            descEn.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      if (visibleCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    }
  }

  // Category Tag Clicks
  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      filterCards();
    });
  });

  // Search Input Typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterCards();
    });
  }
}

/* --- 4. Back to Top Button --- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
