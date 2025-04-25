import { createRoute } from 'honox/factory'

/**
 * メニュー画面を表示するルート
 */
export const GET = createRoute(async (c) => {
  // TODO: 実際の環境では、ここでセッション確認などの認証チェックを行う
  return c.render(
    <div>
      <iframe src="/menu/index.html" style="width: 100%; height: 100vh; border: none;"></iframe>
    </div>
  )
})