import { createRoute } from 'honox/factory'

/**
 * 管理者ログインページのルートハンドラー
 * @description
 * 管理者ログインページを表示するルートハンドラー。
 * public/admin/index.htmlにリダイレクトする。
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
  return c.redirect('/admin/index.html')
})