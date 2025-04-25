-- 管理者ユーザーのパスワードハッシュを更新（SHA-256でハッシュ化した'naoki'のBase64値）
UPDATE Users 
SET password_hash = 'RuqqWlxE9IPxlKyxBrmvVoEyN94nrCue1EI7rdn95os='
WHERE email = 'admin@actors.com';