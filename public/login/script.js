document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('toggle-password');
    const toggleIcon = togglePasswordButton.querySelector('i');

    // パスワード表示/非表示の切り替え
    togglePasswordButton.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

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

    // ログインフォームの送信処理
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        if (!email || !password) {
            alert('メールアドレスとパスワードを入力してください。');
            return;
        }

        window.location.href = '/menu';
    });
});