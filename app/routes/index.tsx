import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'

/**
 * インデックスページのルートハンドラー
 * @description
 * アプリケーションのメインページを処理するルートハンドラー。
 * クエリパラメータで指定された名前を表示し、Counterコンポーネントを含む。
 * 
 * @param {Context} c - Honoのコンテキストオブジェクト
 * @param {Object} c.req.query - リクエストのクエリパラメータ
 * @param {string} [c.req.query('name')] - 表示する名前（デフォルト: 'Hono'）
 * 
 * @returns {Promise<Response>} レンダリングされたHTMLレスポンス
 * 
 * @example
 * ```
 * // 基本的な使用
 * GET /
 * 
 * // 名前を指定して使用
 * GET /?name=User
 * ```
 */
export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <div class="py-8 text-center">
      <title>{name}</title>
      <h1 class="text-3xl font-bold">Hello, {name}!</h1>
      <Counter />
    </div>
  )
})
