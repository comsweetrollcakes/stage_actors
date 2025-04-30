import { createRoute } from 'honox/factory'

/**
 * メニュー画面を表示するルート
 * @description
 * メニュー画面を表示するルートハンドラー。
 * ログインしていない場合は、ログインページにリダイレクトする。
 * 
 * @param {Context} c - Honoのコンテキストオブジェクト
 * @returns {Promise<Response>} レンダリングされたHTMLレスポンス
 */
export default createRoute(async (c) => {
  try {
    console.log('メニュー画面アクセス試行')
    
    // データベースからユーザーのセッション情報を確認
    const { results } = await c.env.stage_actors.prepare(
      `SELECT last_login_at FROM Users 
       WHERE deleted_at IS NULL 
       AND last_login_at > datetime('now', '-1 day')
       AND last_login_at IS NOT NULL`
    ).all()

    // 最近のログインがない場合は、ログインページにリダイレクト
    if (!results || results.length === 0) {
      console.log('有効なセッションが見つかりません')
      return c.redirect('/login')
    }

    console.log('メニュー画面アクセス成功')
    // ログイン済みの場合は、メニュー画面を表示
    return c.render(
      <div>
        <iframe src="/admin/menu/index.html" style="width: 100%; height: 100vh; border: none;"></iframe>
      </div>
    )
  } catch (error) {
    console.error('メニュー画面アクセスエラー:', error)
    return c.redirect('/login')
  }
})