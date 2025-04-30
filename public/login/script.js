// DOMのロード完了を待つ
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('toggle-password');
    const loginButton = document.querySelector('.login-button');

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

    // ログインボタンのクリックイベント
    if (loginButton) {
        console.log('Login button found');
        loginButton.addEventListener('click', function(event) {
            console.log('Login button clicked');
            event.preventDefault();
            handleLogin();
        });
    } else {
        console.error('Login button not found');
    }

    // フォームのsubmitイベント（安全のため）
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            console.log('Form submit event triggered');
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    }

    // ログイン処理
    async function handleLogin() {
        console.log('handleLogin called');
        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;

        try {
            console.log('Sending login request');
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

            console.log('Response received:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (data.success) {
                console.log('Login successful, redirecting to:', data.redirectTo);
                window.location.href = data.redirectTo;
            } else {
                console.log('Login failed:', data.message);
                alert(data.message || 'ログインに失敗しました。');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('ログイン処理中にエラーが発生しました。');
        }
    }
});