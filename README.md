# TechShare

## アプリの概要

TechShareは、技術ナレッジを共有するためのWebアプリケーションです。

記事の一覧表示、詳細表示、投稿、編集、削除、検索機能を実装しています。

また、ログイン状態に応じて投稿や編集が行えるようにし、Context APIを利用して認証状態を管理しています。

---

## デモURL

### フロントエンド

https://tech-share-app-tawny.vercel.app

### バックエンドAPI

https://tech-share-app-jrp7.onrender.com

※ Render無料プランを利用しているため、初回アクセス時は起動まで数十秒かかる場合があります。

---

## 技術スタックと選んだ理由

| 技術 | 選定理由 |
|--------|--------|
| React | コンポーネント単位で画面を管理でき、SPA開発を学習するため |
| Vite | 開発サーバーの起動が高速で、Reactとの相性が良いため |
| Tailwind CSS | CSSを効率的に記述でき、画面デザインの学習にも適しているため |
| React Router | SPAでページ遷移を実現するため |
| Context API | ログイン状態をアプリ全体で共有するため |
| JSON Server | フロントエンド学習に集中しながらAPI通信を学習するため |
| Vercel | Reactアプリを簡単に公開できるため |
| Render | JSON Serverを公開し、フロントエンドとAPIを連携させるため |

---

## 工夫したポイント

- Atomic Designを意識してコンポーネントを分割した
- Context APIを利用してログイン状態を一元管理した
- useSearchカスタムフックとuseMemoを利用し、検索機能を実装した
- Markdown形式の記事を表示できるようにした
- 環境変数（VITE_API_URL）を利用してローカル環境と本番環境を切り替えられるようにした

---

## 難しかった点

- React Routerによるルーティングの理解
- Context APIによる認証状態管理
- Editor画面で新規作成と編集を共通化する実装
- RenderとVercelを利用したデプロイ作業
- Vercel公開後に発生した404エラーへの対応（vercel.jsonの設定）

---

## 開発を通じて学んだこと

Reactによるコンポーネント開発だけでなく、GitHubを利用したソースコード管理や、Vercel・Renderを利用したデプロイについて学ぶことができました。

また、環境変数の設定や、公開環境特有の問題（404エラーやRender無料プランのスリープ問題）を解決する経験を通して、ローカル開発と本番環境の違いを理解することができました。

今回の開発を通して、アプリを作るだけでなく、実際に公開して利用できる状態にするまでの一連の流れを学ぶことができました。

---

## 今後追加したい機能

- ユーザー認証機能
- コメント機能
- タグ機能
- お気に入り機能
- 記事の並び替え機能

---

## ローカルでの起動手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/horieyukiko-0428/tech-share-app.git
```

### 2. パッケージをインストール

```bash
npm install
```

### 3. JSON Serverを起動

```bash
npm run server
```

### 4. 開発サーバーを起動

```bash
npm run dev
```

### 5. ブラウザでアクセス

```text
http://localhost:5173
```

### 補足

私の開発環境（Windows）では、実行環境の都合により以下のコマンドを利用して動作確認を行いました。

```bash
npm.cmd run server
npm.cmd run dev
```

環境によっては通常の `npm run` コマンドで問題なく実行できます。
