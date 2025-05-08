/**
 * DOMの読み込みが完了した時に実行される初期化関数
 */
document.addEventListener('DOMContentLoaded', () => {
    // ナビゲーションとコンテンツセクションの要素を取得
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const sidebar = document.querySelector('.sidebar');
    const hamburger = document.getElementById('hamburger-menu');
    const body = document.body;

    /**
     * 指定されたセクションをアクティブにする
     * @param {string} targetId - アクティブにするセクションのID
     */
    function setActiveSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection || !targetSection.classList.contains('content-section')) {
            console.warn(`Section with id ${targetId} not found or invalid.`);
            targetId = '#dashboard-section'; // フォールバック
        }

        // セクションの表示/非表示を切り替え
        contentSections.forEach(section => {
            section.style.display = (('#' + section.id) === targetId) ? 'block' : 'none';
        });

        // ナビゲーションリンクのアクティブ状態を更新
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === targetId);
        });

        // モバイル表示でメニューを閉じる
        if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            hamburger.classList.remove('active');
            body.classList.remove('sidebar-open');
        }
    }

    // ナビゲーションリンクのクリックイベントを設定
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            setActiveSection(targetId);
        });
    });

    // ハンバーガーメニューの制御
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', (event) => {
            event.stopPropagation();
            sidebar.classList.toggle('open');
            hamburger.classList.toggle('active');
            body.classList.toggle('sidebar-open');
        });

        // オーバーレイまたはメインコンテンツ部分クリックで閉じる
        document.addEventListener('click', (event) => {
            if (body.classList.contains('sidebar-open') && 
                !sidebar.contains(event.target) && 
                !hamburger.contains(event.target)) {
                sidebar.classList.remove('open');
                hamburger.classList.remove('active');
                body.classList.remove('sidebar-open');
            }
        });
    }

    // 初期セクションの設定
    const currentHash = window.location.hash || '#dashboard-section';
    setActiveSection(currentHash);

    /**
     * 役者管理セクションのイベントハンドラー設定
     */
    const actorManagementSection = document.getElementById('actor-management-section');
    if (actorManagementSection) {
        actorManagementSection.addEventListener('click', (event) => {
            // 削除ボタンの処理
            const deleteButton = event.target.closest('.delete-button-modern');
            if (deleteButton) {
                const actorId = deleteButton.dataset.actorId;
                const actorName = deleteButton.closest('.actor-item')?.querySelector('.actor-name a')?.textContent || `ID: ${actorId}`;
                if (confirm(`${actorName} を削除しますか？（ダミー）`)) {
                    console.log(`Deleting actor ${actorId}`);
                    deleteButton.closest('.actor-item')?.remove();
                }
            }

            // 検索ボタンの処理
            const searchButton = event.target.closest('.search-filter button');
            if (searchButton) {
                const searchInput = actorManagementSection.querySelector('#actor-search');
                const query = searchInput ? searchInput.value : '';
                alert(`「${query}」で検索します（ダミー）`);
            }
        });
    }

    /**
     * ログアウトボタンのイベントハンドラー設定
     */
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', async (event) => {
            event.preventDefault();
            
            try {
                // サーバーにログアウトリクエストを送信
                const response = await fetch('/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    // ログアウト成功時、ログイン画面にリダイレクト
                    window.location.href = '/login';
                } else {
                    console.error('ログアウトに失敗しました');
                    alert('ログアウトに失敗しました。もう一度お試しください。');
                }
            } catch (error) {
                console.error('ログアウトエラー:', error);
                alert('ログアウト処理中にエラーが発生しました。もう一度お試しください。');
            }
        });
    }
});