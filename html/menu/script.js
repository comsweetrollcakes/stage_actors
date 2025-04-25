/**
 * DOMの読み込みが完了した時に実行される初期化関数
 * ハンバーガーメニューとサイドバーの制御を設定する
 */
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;

    if (hamburger && sidebar) {
        /**
         * ハンバーガーメニューのクリックイベントハンドラー
         * サイドバーの開閉とハンバーガーメニューのアニメーションを制御する
         */
        hamburger.addEventListener('click', function () {
            sidebar.classList.toggle('open');
            hamburger.classList.toggle('active'); // ハンバーガーアイコンのアニメーション用
            body.classList.toggle('sidebar-open'); // bodyにクラスを付与してオーバーレイ制御など

            // サイドバーの外側をクリックしたら閉じる (オプション)
            if (body.classList.contains('sidebar-open')) {
                body.addEventListener('click', closeSidebarOnClickOutside, true);
            } else {
                body.removeEventListener('click', closeSidebarOnClickOutside, true);
            }
        });
    }

    /**
     * サイドバーの外側をクリックした時にサイドバーを閉じる関数
     * @param {Event} event - クリックイベントオブジェクト
     */
    function closeSidebarOnClickOutside(event) {
        // クリックされた要素がサイドバー自身またはハンバーガーボタンでなければ閉じる
        if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
            sidebar.classList.remove('open');
            hamburger.classList.remove('active');
            body.classList.remove('sidebar-open');
            body.removeEventListener('click', closeSidebarOnClickOutside, true);
        }
    }
});