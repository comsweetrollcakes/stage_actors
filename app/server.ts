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
import { serveStatic } from '@hono/node-server/serve-static'

const app = createApp()

// 静的ファイルの提供設定を追加
app.use('/admin/*', serveStatic({ root: './public' }))
app.use('/*', serveStatic({ root: './public' }))

showRoutes(app)

export default app
