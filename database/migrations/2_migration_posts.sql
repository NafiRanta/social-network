-- +migrate Up

CREATE TABLE IF NOT EXISTS Posts (
	PostID CHAR(36) NOT NULL,
	UserName CHAR(36) NOT NULL,
	Privacy TEXT NOT NULL,
	IncludedFriends TEXT NULL,
	Content TEXT NOT NULL,
	Image BLOB NULL,
	CreateAt TIMESTAMP NOT NULL,
	CommentCount INT DEFAULT 0,
	LikeCount INT DEFAULT 0,
	PRIMARY KEY (PostID)
);

-- +migrate Down
DROP TABLE IF EXISTS Posts;