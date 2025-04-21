CREATE TABLE Actors (
    actor_id INTEGER PRIMARY KEY AUTOINCREMENT,
    last_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    nickname TEXT,
    birth_date DATE,
    origin TEXT,
    other_media_appearances TEXT,
    version INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- ON UPDATE はトリガーで実装
    deleted_at DATETIME NULL DEFAULT NULL
);

CREATE TABLE Troupes (
    troupe_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    leader_actor_id INTEGER,
    foundation_date DATE,
    dissolution_date DATE,
    version INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- ON UPDATE はトリガーで実装
    deleted_at DATETIME NULL DEFAULT NULL,
    FOREIGN KEY (leader_actor_id) REFERENCES Actors(actor_id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Theaters (
    theater_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    version INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- ON UPDATE はトリガーで実装
    deleted_at DATETIME NULL DEFAULT NULL
);

CREATE TABLE Performances (
    performance_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    theater_id INTEGER,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    version INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- ON UPDATE はトリガーで実装
    deleted_at DATETIME NULL DEFAULT NULL,
    FOREIGN KEY (theater_id) REFERENCES Theaters(theater_id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Teams (
    team_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    performance_id INTEGER NOT NULL,
    version INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- ON UPDATE はトリガーで実装
    deleted_at DATETIME NULL DEFAULT NULL,
    FOREIGN KEY (performance_id) REFERENCES Performances(performance_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (performance_id, name, deleted_at)
);

CREATE TABLE Actor_Troupe_Membership (
    actor_id INTEGER NOT NULL,
    troupe_id INTEGER NOT NULL,
    join_date DATE,
    leave_date DATE,
    version INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- ON UPDATE はトリガーで実装
    deleted_at DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (actor_id, troupe_id),
    FOREIGN KEY (actor_id) REFERENCES Actors(actor_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (troupe_id) REFERENCES Troupes(troupe_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Performance_Cast (
    performance_id INTEGER NOT NULL,
    actor_id INTEGER NOT NULL,
    role_name TEXT,
    team_id INTEGER,
    version INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- ON UPDATE はトリガーで実装
    deleted_at DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (performance_id, actor_id),
    FOREIGN KEY (performance_id) REFERENCES Performances(performance_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES Actors(actor_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Actor_Awards (
    award_id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor_id INTEGER NOT NULL,
    performance_id INTEGER,
    award_name TEXT NOT NULL,
    award_year INTEGER,
    version INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- ON UPDATE はトリガーで実装
    deleted_at DATETIME NULL DEFAULT NULL,
    FOREIGN KEY (actor_id) REFERENCES Actors(actor_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (performance_id) REFERENCES Performances(performance_id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Troupe_History (
    history_id INTEGER PRIMARY KEY AUTOINCREMENT,
    troupe_id INTEGER NOT NULL,
    change_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    leader_actor_id INTEGER,
    foundation_date DATE,
    dissolution_date DATE,
    change_description TEXT,
    changed_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (troupe_id) REFERENCES Troupes(troupe_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (leader_actor_id) REFERENCES Actors(actor_id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX idx_actors_name ON Actors(last_name, first_name);
CREATE INDEX idx_troupes_name ON Troupes(name);
CREATE INDEX idx_performances_title ON Performances(title);
CREATE INDEX idx_performances_dates ON Performances(start_date, end_date);
CREATE INDEX idx_actor_troupe_membership_troupe ON Actor_Troupe_Membership(troupe_id);
CREATE INDEX idx_performance_cast_actor ON Performance_Cast(actor_id);
CREATE INDEX idx_actor_awards_actor ON Actor_Awards(actor_id);
CREATE INDEX idx_troupe_history_troupe ON Troupe_History(troupe_id);
CREATE INDEX idx_troupe_history_timestamp ON Troupe_History(change_timestamp);