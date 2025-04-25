import type { NotFoundHandler } from 'hono'

/**
 * 404 Not Found エラーハンドラー
 * @description
 * リクエストされたリソースが見つからない場合に実行される特殊なハンドラー。
 * HTTPステータスコード404を設定し、エラーメッセージを表示する。
 * 
 * @param {Context} c - Honoのコンテキストオブジェクト
 * @returns {Response} 404ステータスコードとエラーメッセージを含むレスポンス
 * 
 * @example
 * ```ts
 * // このハンドラーは存在しないルートにアクセスした際に自動的に呼び出される
 * GET /non-existent-path → 404 Not Found
 * ```
 */
const handler: NotFoundHandler = (c) => {
  c.status(404)
  return c.render('404 Not Found')
}

export default handler
