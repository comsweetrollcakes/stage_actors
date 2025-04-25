-- 管理者ユーザーの追加
-- パスワード 'naoki' をbcryptでハッシュ化した値を使用
INSERT INTO Users (
    email,
    password_hash,
    role,
    created_at,
    updated_at
) VALUES (
    'admin@actors.com',
    '$2b$10$zXwqNJaBQN9rA.ZYFbcj0.KZT0LbebF0X6MHakFGGMEGKSeQVXwQO', -- 'naoki'のハッシュ
    'admin',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);