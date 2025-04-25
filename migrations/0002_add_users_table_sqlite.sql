-- ユーザーテーブル
CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
    last_login_at TIMESTAMP,
    version INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

-- インデックスの追加
CREATE INDEX idx_users_email ON Users(email);

-- 管理者ユーザーの追加
INSERT INTO Users (
    email,
    password_hash,
    role,
    created_at,
    updated_at
) VALUES (
    'admin@actors.com',
    '$2b$10$zXwqNJaBQN9rA.ZYFbcj0.KZT0LbebF0X6MHakFGGMEGKSeQVXwQO',
    'admin',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);