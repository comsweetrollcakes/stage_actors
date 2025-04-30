import { createRoute } from 'honox/factory'

/**
 * 管理者ログインページのルートハンドラー
 * @description
 * 管理者ログインページを表示するルートハンドラー。
 * クエリパラメータがある場合はログインページにリダイレクトする。
 * それ以外の場合はメニュー画面を表示する。
 * 
 * @param {Context} c - Honoのコンテキストオブジェクト
 * @returns {Response} リダイレクトレスポンス
 */
export default createRoute((c) => {
  const url = new URL(c.req.url);
  
  // クエリパラメータがある場合（ログインフォームからのGET）
  if (url.search) {
    console.log('ログインフォームからのGETリクエストを検出。ログインページにリダイレクト');
    return c.redirect('/login');
  }

  // index.htmlへのアクセスの場合もログインページにリダイレクト
  if (url.pathname.includes('index.html')) {
    console.log('index.htmlへのアクセスを検出。ログインページにリダイレクト');
    return c.redirect('/login');
  }

  // 通常のアクセスの場合はメニュー画面にリダイレクト
  return c.redirect('/admin/menu');
})