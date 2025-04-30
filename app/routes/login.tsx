import { createRoute } from 'honox/factory'

/**
 * ログインページのルートハンドラー
 * @description
 * ログイン画面を表示し、ログイン処理を行うルートハンドラー。
 * 
 * @param {Context} c - Honoのコンテキストオブジェクト
 * @returns {Promise<Response>} レンダリングされたHTMLレスポンス
 */
export const POST = createRoute(async (c) => {
  try {
    const { email, password } = await c.req.json()
    console.log('ログイン試行:', email)

    // データベースからユーザーを検索
    const { results } = await c.env.stage_actors.prepare(
      'SELECT user_id, email, password_hash FROM Users WHERE email = ? AND deleted_at IS NULL'
    ).bind(email).all()

    const user = results[0]

    if (!user) {
      console.log('ユーザーが見つかりません:', email)
      return c.json({ 
        success: false, 
        message: 'メールアドレスまたはパスワードが間違っています' 
      }, 401)
    }

    // パスワードの検証
    const hash = await hashPassword(password)
    const isValid = hash === user.password_hash

    if (!isValid) {
      console.log('パスワードが一致しません:', email)
      return c.json({ 
        success: false, 
        message: 'メールアドレスまたはパスワードが間違っています' 
      }, 401)
    }

    try {
      // 最終ログイン日時を更新
      const updateResult = await c.env.stage_actors.prepare(
        'UPDATE Users SET last_login_at = datetime("now") WHERE user_id = ?'
      ).bind(user.user_id).run()

      if (!updateResult.success) {
        throw new Error('最終ログイン日時の更新に失敗しました')
      }

      console.log('ログイン成功:', email)
      return c.json({ 
        success: true,
        redirectTo: '/admin/menu'  // メニュー画面へのリダイレクトに修正
      })
    } catch (updateError) {
      console.error('最終ログイン日時の更新エラー:', updateError)
      return c.json({ 
        success: false, 
        message: 'ログイン処理中にエラーが発生しました' 
      }, 500)
    }
  } catch (error) {
    console.error('ログインエラー:', error)
    return c.json({ 
      success: false, 
      message: 'ログイン処理中にエラーが発生しました'
    }, 500)
  }
})

/**
 * ログインページを表示するルート
 */
export default createRoute((c) => {
  return c.render(
    <div>
      <iframe src="/login/index.html" style="width: 100%; height: 100vh; border: none;"></iframe>
    </div>
  )
})

/**
 * パスワードをSHA-256でハッシュ化する関数
 * @param {string} password - ハッシュ化するパスワード
 * @returns {Promise<string>} ハッシュ化されたパスワード（Base64エンコード）
 */
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  // Uint8Array に変換
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  // Base64エンコーディング
  const base64Hash = btoa(String.fromCharCode(...hashArray))
  return base64Hash
}