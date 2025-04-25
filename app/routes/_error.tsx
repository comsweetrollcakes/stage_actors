import type { ErrorHandler } from 'hono'

/**
 * グローバルエラーハンドラー
 * @description
 * アプリケーション全体のエラーを処理する特殊なハンドラー。
 * カスタムレスポンスを持つエラーの場合はそのレスポンスを返し、
 * それ以外の場合は500 Internal Server Errorを返す。
 * 
 * @param {Error} e - 発生したエラーオブジェクト
 * @param {Context} c - Honoのコンテキストオブジェクト
 * 
 * @returns {Response} エラー内容に応じたレスポンス
 *   - カスタムレスポンスを持つエラーの場合: そのレスポンス
 *   - その他のエラーの場合: 500ステータスコードとエラーメッセージ
 * 
 * @example
 * ```ts
 * // カスタムレスポンスを持つエラーの場合
 * throw new CustomError('カスタムエラー');
 * 
 * // 通常のエラーの場合
 * throw new Error('予期せぬエラー');
 * // → 500 Internal Server Error
 * ```
 */
const handler: ErrorHandler = (e, c) => {
  if ('getResponse' in e) {
    return e.getResponse()
  }
  console.error(e.message)
  c.status(500)
  return c.render('Internal Server Error')
}

export default handler
