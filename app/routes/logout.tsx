import { createRoute } from 'honox/factory'

/**
 * ログアウトを処理するエンドポイント
 * @description
 * ユーザーのログアウト処理を行い、セッションを無効化する
 * 
 * @param {Context} c - Honoのコンテキストオブジェクト
 * @returns {Promise<Response>} JSONレスポンス
 */
export const POST = createRoute(async (c) => {
  try {
    // 最終ログイン日時をNULLに設定してセッションを無効化
    const updateResult = await c.env.stage_actors.prepare(
      'UPDATE Users SET last_login_at = NULL WHERE last_login_at > datetime("now", "-1 day")'
    ).run()

    if (!updateResult.success) {
      throw new Error('ログアウト処理に失敗しました')
    }

    console.log('ログアウト成功')
    return c.json({ success: true })
  } catch (error) {
    console.error('ログアウトエラー:', error)
    return c.json({ 
      success: false,
      message: 'ログアウト処理中にエラーが発生しました'
    }, 500)
  }
})