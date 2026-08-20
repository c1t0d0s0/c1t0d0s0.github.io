/* ==========================================================================
   c1t0d0s0 Portal - Interactive Application Scripts & i18n
   ========================================================================== */

/* --- Translation Data --- */
const I18N_DATA = {
  ja: {
    metaDesc: 'c1t0d0s0が制作・公開しているWebアプリケーションおよびWebツールのポータルサイトです。面積迷路、マンホールカード、NoxMind、世界遺産マスター、LexDrop、Unit Converter、元素ラボ、ライフゲーム、モールスマスターなどにアクセスできます。',
    themeToggleAria: 'テーマ切替',
    langToggleAria: '英語に切り替え',
    langToggleText: 'EN',
    searchPlaceholder: 'プロジェクトを検索...',
    searchAria: 'プロジェクトを検索',
    categories: {
      all: 'すべて',
      puzzle: 'パズル・ゲーム',
      collection: 'コレクション',
      tool: '思考ツール',
      education: 'クイズ・学習'
    },
    cardAction: 'サイトを開く',
    noResults: '該当するプロジェクトが見つかりませんでした。',
    backToTopAria: 'ページ先頭へ戻る',
    cards: {
      'area-mazes': {
        title: '面積迷路',
        desc: 'ひらめきと論理的思考力を鍛えるロジックパズル。複雑な計算を使わずに、長方形の面積と辺の比率から未知の長さを解き明かします。'
      },
      'manhole': {
        title: 'マンホールカード',
        desc: '全国各地の鮮やかなデザインマンホールカードを集めて楽しむビューア＆マップ。地域の歴史や文化が詰まったご当地デザインを探訪できます。'
      },
      'noxmind': {
        title: 'NoxMind',
        desc: '思考を自由に広げ、複雑なアイデアを明快に整理するグラフィカル思考キャンバス。ノードを自由につなぎ合わせて発想を爆発させます。'
      },
      'world-heritage-quiz': {
        title: '世界遺産マスター',
        desc: '世界中の素晴らしい文化遺産や壮大な自然遺産をめぐる知識クイズ＆ガイド。美しいグラフィックとともに世界遺産の魅力を学べます。'
      },
      'lexidrop': {
        title: 'LexDrop',
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
      }
    }
  },
  en: {
    metaDesc: 'Portal site for web applications and digital tools created by c1t0d0s0. Explore Area Mazes, Manhole Cards, NoxMind, World Heritage Master, LexDrop, Unit Converter, Element Lab, Conway\'s Game of Life, Morse Master, and more.',
    themeToggleAria: 'Toggle theme',
    langToggleAria: 'Switch to Japanese',
    langToggleText: 'JA',
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
      'area-mazes': {
        title: 'Area Mazes',
        desc: 'A logic puzzle that trains intuition and reasoning. Unravel unknown lengths and areas using rectangle proportions and basic arithmetic—no fractions needed!'
      },
      'manhole': {
        title: 'Manhole Cards',
        desc: 'An interactive collection viewer and map of Japan\'s artistic manhole cards. Explore vibrant regional designs rich in local culture and history.'
      },
      'noxmind': {
        title: 'NoxMind',
        desc: 'A graphical thinking canvas to brainstorm freely and structure complex ideas. Connect concept nodes seamlessly to unlock creative inspiration.'
      },
      'world-heritage-quiz': {
        title: 'World Heritage Master',
        desc: 'A knowledge quiz and interactive guide exploring magnificent UNESCO cultural and natural heritage sites across the globe.'
      },
      'lexidrop': {
        title: 'LexDrop',
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
      }
    }
  }
};

let currentLanguage = 'ja';

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initThemeToggle();
  initFiltering();
  initTiltEffect();
  initBackToTop();
});

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

  // 3. Update Search Input
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
    if (actionTextEl) actionTextEl.textContent = data.cardAction;
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

/* --- 2. Theme Toggle (Dark / Light) --- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial theme
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (!systemPrefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

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
      const category = card.dataset.category || '';
      const titleJa = (card.dataset.titleJa || '').toLowerCase();
      const titleEn = (card.dataset.titleEn || '').toLowerCase();
      const descJa = (card.dataset.descJa || '').toLowerCase();
      const descEn = (card.dataset.descEn || '').toLowerCase();

      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = !searchQuery || 
                            titleJa.includes(searchQuery) || 
                            titleEn.includes(searchQuery) || 
                            descJa.includes(searchQuery) || 
                            descEn.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
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

/* --- 4. Subtle 3D Card Tilt Effect --- */
function initTiltEffect() {
  const cards = document.querySelectorAll('.app-card');

  // Disable on mobile / touch devices for performance
  if (window.matchMedia('(pointer: coarse)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4; // max 4deg
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --- 5. Back to Top Button --- */
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
