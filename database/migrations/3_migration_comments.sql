-- +migrate Up
CREATE TABLE IF NOT EXISTS Comments (
    CommentID CHAR(36) NOT NULL,
    PostID CHAR(36) NOT NULL,
    UserName CHAR(36) NOT NULL,
    Content TEXT NOT NULL,
    CreateAt TIMESTAMP NOT NULL,
    PRIMARY KEY (CommentID)
);
-- +migrate Down
DROP TABLE IF EXISTS Comments;