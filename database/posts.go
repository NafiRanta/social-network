package database

import (
	"database/sql"
	u "socialnetwork/utils"
	"time"
)

type Post struct {
	PostID          string
	AuthorID        string
	Privacy         string
	IncludedFriends string
	Content         string
	Image           []byte
	CreateAt        time.Time
	CommentCount    int
	LikeCount       int
}

func CreatePostsTable(db *sql.DB) {
	postsTable := `
	CREATE TABLE IF NOT EXISTS Posts (
		PostID CHAR(36) NOT NULL,
		AuthorID CHAR(36) NOT NULL,
		Privacy TEXT NOT NULL,
		IncludedFriends TEXT NULL,
		Content TEXT NOT NULL,
		Image BLOB NULL,
		CreateAt TIMESTAMP NOT NULL,
		CommentCount INT NOT NULL,
		LikeCount INT NOT NULL,
		PRIMARY KEY (PostID),
		UNIQUE (AuthorID)
	);`

	query, err := db.Prepare(postsTable)
	u.CheckErr(err)
	query.Exec()
}
