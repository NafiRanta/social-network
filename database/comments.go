package database

import (
	"database/sql"
	u "socialnetwork/utils"
	"time"
)

type Comment struct {
	CommentID string
	PostID    string
	AuthorID  string
	Content   string
	CreateAt  time.Time
}

type CommentResponse struct {
	CommentID string    `json:"commentID"`
	PostID    string    `json:"postID"`
	AuthorID  string    `json:"authorID"`
	Content   string    `json:"content"`
	CreateAt  time.Time `json:"createAt"`
}

func CreateCommentsTable(db *sql.DB) {
	commentsTable := `
	CREATE TABLE IF NOT EXISTS Comments (
		CommentID CHAR(36) NOT NULL,
		PostID CHAR(36) NOT NULL,
		AuthorID CHAR(36) NOT NULL,
		Content TEXT NOT NULL,
		CreateAt TIMESTAMP NOT NULL,
		PRIMARY KEY (CommentID)
	);`

	query, err := db.Prepare(commentsTable)
	u.CheckErr(err)
	query.Exec()
}

func AddComment(comment *CommentResponse) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()
	query := `
		INSERT INTO Comments (CommentID, PostID, AuthorID, Content, CreateAt)
		VALUES (?, ?, ?, ?, ?);`
	stmt, err := db.Prepare(query)
	u.CheckErr(err)
	_, err = stmt.Exec(comment.CommentID, comment.PostID, comment.AuthorID, comment.Content, comment.CreateAt)
	u.CheckErr(err)
	return nil
}

func GetCommentsByPostID(postID string) ([]CommentResponse, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	query := `
	SELECT CommentID, PostID, AuthorID, Content, CreateAt FROM Comments
	WHERE PostID = ?;`
	stmt, err := db.Prepare(query)
	u.CheckErr(err)
	rows, err := stmt.Query(postID)
	u.CheckErr(err)
	var comments []CommentResponse
	for rows.Next() {
		var comment CommentResponse
		err := rows.Scan(&comment.CommentID, &comment.PostID, &comment.AuthorID, &comment.Content, &comment.CreateAt)
		u.CheckErr(err)
		comments = append(comments, comment)
	}
	return comments, nil
}
