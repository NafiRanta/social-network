-- +migrate Up

CREATE TABLE IF NOT EXISTS GroupPosts (
	GroupPostID CHAR(36) NOT NULL,
	GroupID CHAR(36) NOT NULL,
	UserName CHAR(36) NOT NULL,
	Content TEXT NOT NULL,
	Image BLOB NULL,
	CreateAt TIMESTAMP NOT NULL,
	PRIMARY KEY (GroupPostID)
);

-- +migrate Down
DROP TABLE IF EXISTS GroupPosts;