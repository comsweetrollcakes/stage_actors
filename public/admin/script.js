document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('toggle-password');
    const toggleIcon = togglePasswordButton.querySelector('i');

    togglePasswordButton.addEventListener('click', function() {
        // Toggle the type attribute
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Toggle the icon
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

    // Optional: Add form submission handling here if needed
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission for this example
        console.log('ログイン試行:', {
            email: document.getElementById('email').value,
            remember: document.getElementById('remember').checked
            // パスワードはセキュリティのためコンソールに出力しない
        });
        // ここに実際のログイン処理（API呼び出しなど）を実装します
        alert('ログインボタンがクリックされました。\n（実際の送信処理は実装されていません）');
    });
});