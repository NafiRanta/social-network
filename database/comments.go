package database

import (
	"database/sql"
	u "socialnetwork/utils"
	"time"

	"github.com/google/uuid"
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

	// generate uuid for commentID
	comment.CommentID = uuid.New().String()
	stmt, err := db.Prepare(query)
	u.CheckErr(err)
	_, err = stmt.Exec(
		comment.CommentID,
		comment.PostID,
		comment.AuthorID,
		comment.Content,
		comment.CreateAt,
	)
	u.CheckErr(err)
	return nil
}

func GetCommentsByPostID(postID string) ([]Comment, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	query := `
		SELECT CommentID, PostID, AuthorID, Content, CreateAt 
		FROM Comments
		WHERE PostID = ?
		`
	rows, err := db.Query(query, postID)
	u.CheckErr(err)
	defer rows.Close()

	var comments []Comment
	for rows.Next() {
		var comment Comment
		err := rows.Scan(
			&comment.CommentID,
			&comment.PostID,
			&comment.AuthorID,
			&comment.Content,
			&comment.CreateAt,
		)
		u.CheckErr(err)
		comments = append(comments, comment)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return comments, nil
}
