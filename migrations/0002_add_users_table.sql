-- ユーザーテーブル
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ユーザーID',
    email VARCHAR(255) NOT NULL UNIQUE COMMENT 'メールアドレス',
    password_hash VARCHAR(255) NOT NULL COMMENT 'ハッシュ化されたパスワード',
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user' COMMENT 'ユーザー権限',
    last_login_at TIMESTAMP NULL COMMENT '最終ログイン日時',
    version INT NOT NULL DEFAULT 0 COMMENT '更新回数 (楽観ロック用)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT '論理削除日時'
) COMMENT 'ユーザー認証情報';

-- インデックスの追加
CREATE INDEX idx_users_email ON Users(email);