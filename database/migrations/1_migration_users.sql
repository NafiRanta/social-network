-- +migrate Up

CREATE TABLE IF NOT EXISTS Users (
	UserID CHAR(36) NOT NULL PRIMARY KEY,
	FirstName VARCHAR(255) NOT NULL,
	LastName VARCHAR(255) NOT NULL,
	UserName VARCHAR(255),
	Email VARCHAR(255) NOT NULL UNIQUE,
	Password CHAR(36) NOT NULL,
	Privacy TEXT NOT NULL DEFAULT 'public',
	Online TINYINT(1) NOT NULL DEFAULT 0,
	DateOfBirth TEXT NOT NULL,
	Gender TEXT NOT NULL,
	Avatar BLOB,
	Nickname TEXT,
	AboutMe TEXT,
	FollowerUsernames TEXT,
	FollowingUsernames TEXT,
	FollowerUsernamesReceived TEXT,
	FollowerUsernamesSent TEXT
);


-- +migrate Down
DROP TABLE IF EXISTS Users;