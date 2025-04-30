// DOMのロード完了を待つ
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('toggle-password');

    // パスワード表示切り替え
    if (togglePasswordButton) {
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

    // ログインフォームの送信処理
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            const remember = document.getElementById('remember').checked;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        remember
                    })
                });

                const data = await response.json();

                if (data.success) {
                    window.location.href = data.redirectTo;
                } else {
                    alert(data.message || 'ログインに失敗しました。');
                }
            } catch (error) {
                console.error('ログインエラー:', error);
                alert('ログイン処理中にエラーが発生しました。');
            }
        });
    }
});