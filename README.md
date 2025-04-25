# Stage Actors プロジェクト

## 開発環境のセットアップ

### 必要な依存関係のインストール
```bash
npm install
```

## 利用可能なコマンド

### ローカル開発サーバーの起動
```bash
npm run dev
```
Viteの開発サーバーが起動し、ホットリロードが有効になります。

### プロジェクトのビルド
```bash
npm run build
```
このコマンドは以下の処理を実行します：
1. クライアントサイドのビルド
2. サーバーサイドのビルド

### プレビュー環境での実行
```bash
npm run preview
```
Wranglerを使用してローカルで本番環境に近い形でアプリケーションを実行します。

### デプロイ
```bash
npm run deploy
```
このコマンドは以下の処理を実行します：
1. プロジェクトのビルド
2. Cloudflare Workersへのデプロイ

## 技術スタック

- HonoX - Webフレームワーク
- Vite - ビルドツール
- Cloudflare Workers - サーバーレス実行環境
- TypeScript - プログラミング言語