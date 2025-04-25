import { createRoute } from 'honox/factory'

/**
 * インデックスページのルートハンドラー
 * @description
 * トップページの表示およびログイン処理を行うルートハンドラー。
 * 
 * @param {Context} c - Honoのコンテキストオブジェクト
 * @returns {Promise<Response>} レンダリングされたHTMLレスポンス
 */
export default createRoute((c) => {
  return c.render(
    <div>
      <h1>舞台・役者マスタ管理システム</h1>
      <p>メイン画面から機能を選択してください：</p>
      <div>
        <a href="/login" className="button">ログイン</a>
      </div>
    </div>
  )
})

/**
 * ログイン処理を行うPOSTルートハンドラー
 */
export const POST = createRoute(async (c) => {
  try {
    const { email, password } = await c.req.json()

    // TODO: 実際の環境では、ここでデータベースを使用した認証を行う
    if (email && password) {
      // 認証成功時
      return c.json({
        success: true,
        redirectTo: '/menu'
      })
    }

    // 認証失敗時
    return c.json({
      success: false,
      message: 'メールアドレスとパスワードを入力してください。'
    }, 400)

  } catch (error) {
    console.error('ログインエラー:', error);
    return c.json({
      success: false,
      message: 'ログイン処理中にエラーが発生しました。'
    }, 500)
  }
})
