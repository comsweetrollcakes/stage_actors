/**
 * サーバーサイドのエントリーポイント
 * @description HonoXのサーバーアプリケーションを作成し、ルート定義を表示する
 * @returns {Hono} 設定済みのHonoアプリケーションインスタンス
 * @example
 * ```ts
 * // デフォルトエクスポートとしてアプリケーションインスタンスを公開
 * import app from './server'
 * ```
 */
import { showRoutes } from 'hono/dev'
import { createApp } from 'honox/server'

const app = createApp()

showRoutes(app)

export default app
