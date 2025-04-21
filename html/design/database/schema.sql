-- 役者テーブル
CREATE TABLE Actors (
    actor_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '役者ID',
    last_name VARCHAR(100) NOT NULL COMMENT '姓',
    first_name VARCHAR(100) NOT NULL COMMENT '名',
    nickname VARCHAR(255) COMMENT 'あだ名',
    birth_date DATE COMMENT '生年月日',
    origin VARCHAR(255) COMMENT '出身',
    other_media_appearances TEXT COMMENT 'その他メディア',
    version INT NOT NULL DEFAULT 0 COMMENT '更新回数 (楽観ロック用)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT '論理削除日時'
) COMMENT '役者情報';

-- 劇団テーブル
CREATE TABLE Troupes (
    troupe_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '劇団ID',
    name VARCHAR(255) NOT NULL COMMENT '劇団名',
    leader_actor_id INT COMMENT '座長 (役者ID)',
    foundation_date DATE COMMENT '劇団立ち上げ日',
    dissolution_date DATE COMMENT '劇団終了日',
    version INT NOT NULL DEFAULT 0 COMMENT '更新回数 (楽観ロック用)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT '論理削除日時',
    FOREIGN KEY (leader_actor_id) REFERENCES Actors(actor_id) ON DELETE SET NULL ON UPDATE CASCADE
) COMMENT '劇団情報';

-- 舞台/劇場テーブル
CREATE TABLE Theaters (
    theater_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '舞台ID',
    name VARCHAR(255) NOT NULL COMMENT '舞台名',
    address VARCHAR(255) COMMENT '住所',
    version INT NOT NULL DEFAULT 0 COMMENT '更新回数 (楽観ロック用)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT '論理削除日時'
) COMMENT '舞台・劇場情報';

-- 舞台作品テーブル
CREATE TABLE Performances (
    performance_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '舞台作品ID',
    title VARCHAR(255) NOT NULL COMMENT '作品名',
    theater_id INT COMMENT '舞台ID',
    start_date DATE NOT NULL COMMENT '作品開始日',
    end_date DATE NOT NULL COMMENT '作品終了日',
    version INT NOT NULL DEFAULT 0 COMMENT '更新回数 (楽観ロック用)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT '論理削除日時',
    FOREIGN KEY (theater_id) REFERENCES Theaters(theater_id) ON DELETE SET NULL ON UPDATE CASCADE
) COMMENT '舞台作品情報';

-- 出演チームテーブル
CREATE TABLE Teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'チームID',
    name VARCHAR(255) NOT NULL COMMENT 'チーム名',
    performance_id INT NOT NULL COMMENT '舞台作品ID',
    version INT NOT NULL DEFAULT 0 COMMENT '更新回数 (楽観ロック用)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT '論理削除日時',
    FOREIGN KEY (performance_id) REFERENCES Performances(performance_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE KEY unique_team_in_performance (performance_id, name, deleted_at) -- 論理削除を考慮したユニーク制約
) COMMENT '出演チーム情報';

-- 役者・劇団所属関係 (中間テーブル)
CREATE TABLE Actor_Troupe_Membership (
    actor_id INT NOT NULL COMMENT '役者ID',
    troupe_id INT NOT NULL COMMENT '劇団ID',
    join_date DATE COMMENT '所属開始日',
    leave_date DATE COMMENT '所属終了日', -- NULLの場合は現在所属中
    version INT NOT NULL DEFAULT 0 COMMENT '更新回数 (楽観ロック用)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT '論理削除日時',
    PRIMARY KEY (actor_id, troupe_id), -- 複合主キーはそのまま or 別途IDを設けるか検討
    FOREIGN KEY (actor_id) REFERENCES Actors(actor_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (troupe_id) REFERENCES Troupes(troupe_id) ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT '役者と劇団の所属関係';

-- 舞台作品出演者 (中間テーブル)
CREATE TABLE Performance_Cast (
    performance_id INT NOT NULL COMMENT '舞台作品ID',
    actor_id INT NOT NULL COMMENT '役者ID',
    role_name VARCHAR(255) COMMENT '役名',
    team_id INT COMMENT 'チームID', -- チーム分けがある場合
    version INT NOT NULL DEFAULT 0 COMMENT '更新回数 (楽観ロック用)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT '論理削除日時',
    PRIMARY KEY (performance_id, actor_id), -- 複合主キーはそのまま or 別途IDを設けるか検討
    FOREIGN KEY (performance_id) REFERENCES Performances(performance_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES Actors(actor_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id) ON DELETE SET NULL ON UPDATE CASCADE
) COMMENT '舞台作品の出演者情報';

-- 役者受賞履歴テーブル
CREATE TABLE Actor_Awards (
    award_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '受賞ID',
    actor_id INT NOT NULL COMMENT '役者ID',
    performance_id INT COMMENT '受賞作品 (舞台作品ID)',
    award_name VARCHAR(255) NOT NULL COMMENT '賞名',
    award_year INT COMMENT '受賞年',
    version INT NOT NULL DEFAULT 0 COMMENT '更新回数 (楽観ロック用)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日時',
    deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT '論理削除日時',
    FOREIGN KEY (actor_id) REFERENCES Actors(actor_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (performance_id) REFERENCES Performances(performance_id) ON DELETE SET NULL ON UPDATE CASCADE
) COMMENT '役者の受賞履歴';

-- 劇団情報変更履歴テーブル
CREATE TABLE Troupe_History (
    history_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '履歴ID',
    troupe_id INT NOT NULL COMMENT '劇団ID',
    change_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '変更日時',
    leader_actor_id INT COMMENT '変更後座長 (役者ID)',
    foundation_date DATE COMMENT '変更後立ち上げ日',
    dissolution_date DATE COMMENT '変更後終了日',
    change_description TEXT COMMENT '変更内容詳細',
    changed_by VARCHAR(255) COMMENT '変更者',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '履歴作成日時',
    -- version INT NOT NULL DEFAULT 0 COMMENT '更新回数 (楽観ロック用)', -- 履歴テーブルには通常不要
    -- deleted_at TIMESTAMP NULL DEFAULT NULL COMMENT '論理削除日時', -- 履歴テーブルには通常不要
    FOREIGN KEY (troupe_id) REFERENCES Troupes(troupe_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (leader_actor_id) REFERENCES Actors(actor_id) ON DELETE SET NULL ON UPDATE CASCADE
) COMMENT '劇団情報の変更履歴';

-- パフォーマンス向上のためのインデックス追加例 (更新)
CREATE INDEX idx_actors_name ON Actors(last_name, first_name); -- 姓・名での検索を考慮
CREATE INDEX idx_troupes_name ON Troupes(name);
CREATE INDEX idx_performances_title ON Performances(title);
CREATE INDEX idx_performances_dates ON Performances(start_date, end_date);
CREATE INDEX idx_actor_troupe_membership_troupe ON Actor_Troupe_Membership(troupe_id);
CREATE INDEX idx_performance_cast_actor ON Performance_Cast(actor_id);
CREATE INDEX idx_actor_awards_actor ON Actor_Awards(actor_id);
CREATE INDEX idx_troupe_history_troupe ON Troupe_History(troupe_id);
CREATE INDEX idx_troupe_history_timestamp ON Troupe_History(change_timestamp);

-- 論理削除を考慮したクエリのためのインデックス例 (必要に応じて追加)
-- 例: Actorsテーブルで削除されていないレコードを効率的に検索
-- CREATE INDEX idx_actors_deleted_at ON Actors(deleted_at);
-- 例: Actor_Troupe_Membershipで現在所属中の役者を効率的に検索
-- CREATE INDEX idx_actor_troupe_membership_current ON Actor_Troupe_Membership(actor_id, leave_date, deleted_at);
