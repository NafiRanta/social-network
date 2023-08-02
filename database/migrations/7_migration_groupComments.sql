-- +migrate Up

CREATE TABLE IF NOT EXISTS GroupComments (
    GroupCommentID CHAR(36) NOT NULL,
    GroupPostID CHAR(36) NOT NULL,
    UserName CHAR(36) NOT NULL,
    Content TEXT NOT NULL,
	Image BLOB NULL,
    CreateAt TIMESTAMP NOT NULL,

    PRIMARY KEY (GroupCommentID)
);

-- +migrate Down
DROP TABLE IF EXISTS GroupComments;
