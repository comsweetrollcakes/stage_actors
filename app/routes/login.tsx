import { createRoute } from 'honox/factory'

/**
 * ログインページのルートハンドラー
 * @description
 * ログイン画面を表示するルートハンドラー。
 * 
 * @param {Context} c - Honoのコンテキストオブジェクト
 * @returns {Promise<Response>} レンダリングされたHTMLレスポンス
 */
export default createRoute((c) => {
  return c.render(
    <div>
      <iframe src="/login/index.html" style="width: 100%; height: 100vh; border: none;"></iframe>
    </div>
  )
})