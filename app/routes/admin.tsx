import { createRoute } from 'honox/factory'

/**
 * 管理者ログインページのルートハンドラー
 * @description
 * 管理者ログインページを表示するルートハンドラー。
 * loginページにリダイレクトする。
 * 
 * @param {Context} c - Honoのコンテキストオブジェクト
 * @returns {Response} リダイレクトレスポンス
 * 
 * @example
 * ```
 * GET /admin
 * ```
 */
export default createRoute((c) => {
  // URLにクエリパラメータがある場合は、ログインページにリダイレクト
  if (c.req.url.includes('?')) {
    return c.redirect('/login')
  }
  
  return c.redirect('/admin/menu')
})