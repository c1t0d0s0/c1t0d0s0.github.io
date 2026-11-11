// study.html の Google ログインと「がんばり ノート」で使う Firebase の設定 (学習アプリと同じプロジェクト)。
// このファイルを config.js という名前でコピーして値を入れる。config.js は git に入れない (.gitignore)。
// 本番では GitHub Actions (deploy.yml) が、リポジトリ変数 FIREBASE_* から config.js を作る。
// config.js がなければ、study.html はログインなしで今までどおり動く。

const FIREBASE_API_KEY = '';
const FIREBASE_AUTH_DOMAIN = '';
const FIREBASE_PROJECT_ID = '';
const FIREBASE_APP_ID = '';
