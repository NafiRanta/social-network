package database

import (
	"database/sql"

	// "log"
	u "socialnetwork/utils"
	"time"

	"github.com/google/uuid"
)

// Comment represents a comment in the social network.
type Comment struct {
	CommentID string
	PostID    string
	UserName  string
	Content   string
	Image     string
	CreateAt  time.Time
}

// CommentResponse represents a response object for a comment in JSON format.
type CommentResponse struct {
	CommentID       string    `json:"commentID"`
	PostID          string    `json:"postID"`
	UserName        string    `json:"userName"`
	Content         string    `json:"content"`
	Image           string    `json:"image"`
	CreateAt        time.Time `json:"createAt"`
	AuthorFirstName string    `json:"authorFirstName"`
	AuthorLastName  string    `json:"authorLastName"`
}

// CreateCommentsTable creates the Comments table in the database if it does not exist.
// func CreateCommentsTable(db *sql.DB) {
// 	commentsTable := `
// 	CREATE TABLE IF NOT EXISTS Comments (
// 		CommentID CHAR(36) NOT NULL,
// 		PostID CHAR(36) NOT NULL,
// 		UserName CHAR(36) NOT NULL,
// 		Content TEXT NOT NULL,
// 		Image BLOB NULL,
// 		CreateAt TIMESTAMP NOT NULL,
// 		PRIMARY KEY (CommentID)
// 	);`

// 	query, err := db.Prepare(commentsTable)
// 	u.CheckErr(err)
// 	query.Exec()
// }

// AddComment adds a new comment to the database.
func AddComment(comment *CommentResponse) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()
	query := `
		INSERT INTO Comments (CommentID, PostID, UserName, Content, Image, CreateAt)
			VALUES (?, ?, ?, ?, ?, ?)`

	// Generate UUID for commentID
	comment.CommentID = uuid.New().String()
	stmt, err := db.Prepare(query)
	u.CheckErr(err)
	_, err = stmt.Exec(
		comment.CommentID,
		comment.PostID,
		comment.UserName,
		comment.Content,
		comment.Image,
		comment.CreateAt,
	)
	u.CheckErr(err)
	return nil
}

// GetCommentsByPostID retrieves all comments associated with a specific postID.
func GetCommentsByPostID(postID string) ([]CommentResponse, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `
		SELECT CommentID, PostID, UserName, Content, Image, CreateAt
		FROM Comments
		WHERE PostID = ?
	`
	rows, err := db.Query(query, postID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []CommentResponse
	for rows.Next() {
		var comment CommentResponse
		err := rows.Scan(
			&comment.CommentID,
			&comment.PostID,
			&comment.UserName,
			&comment.Content,
			&comment.Image,
			&comment.CreateAt,
		)
		if err != nil {
			return nil, err
		}

		author, err := GetUserByUsername(comment.UserName)
		if err != nil {
			//fmt.Println("Error fetching user information for comment author.")
			return nil, err
		}

		comment.AuthorFirstName = author.FirstName
		comment.AuthorLastName = author.LastName
		comments = append(comments, comment)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return comments, nil
}
