/**
 * DOMの読み込みが完了した時に実行される初期化関数
 * パスワード表示切り替えとフォーム送信の制御を設定する
 */
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('toggle-password');

    /**
     * パスワード表示/非表示を切り替えるボタンのクリックイベントハンドラー
     * パスワードの表示状態とアイコンの表示を切り替える
     */
    if (togglePasswordButton && passwordInput) {
        togglePasswordButton.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            const toggleIcon = togglePasswordButton.querySelector('i');
            if (type === 'password') {
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
                togglePasswordButton.setAttribute('aria-label', 'パスワードを表示');
            } else {
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
                togglePasswordButton.setAttribute('aria-label', 'パスワードを非表示');
            }
        });
    }
});