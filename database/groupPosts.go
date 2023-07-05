package database

import (
	"database/sql"
	"fmt"
	u "socialnetwork/utils"
	"time"

	"github.com/google/uuid"
)

// GroupPost represents a group post in the social network.
type GroupPost struct {
	CommentID string
	PostID    string
	UserName  string
	Content   string
	CreateAt  time.Time
}

// GroupPostResponse represents a response object for a GroupPost in JSON format.
type GroupPostResponse struct {
	CommentID       string    `json:"commentID"`
	PostID          string    `json:"postID"`
	UserName        string    `json:"userName"`
	Content         string    `json:"content"`
	CreateAt        time.Time `json:"createAt"`
	AuthorFirstName string    `json:"authorFirstName"`
	AuthorLastName  string    `json:"authorLastName"`
}

// CreateGroupPostsTable creates the GroupPosts table in the database if it does not exist.
func CreateGroupPostsTable(db *sql.DB) {
	groupPostsTable := `
	CREATE TABLE IF NOT EXISTS groupPosts (
		GroupID CHAR(36) NOT NULL,
		UserName CHAR(36) NOT NULL,
		Content TEXT NOT NULL,
		CreateAt TIMESTAMP NOT NULL,
		PRIMARY KEY (GroupID)
	);`

	query, err := db.Prepare(groupPostsTable)
	u.CheckErr(err)
	query.Exec()
}

// AddGroupPost adds a new group post to the database.
func AddGroupPost(groupPost *GroupPostResponse) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	query := `
		INSERT INTO groupPosts (GroupID, UserName, Content, CreateAt)
			VALUES (?, ?, ?, ?);`

	// Generate UUID for groupPostID
	groupPostID := uuid.New().String()
	_, err = db.Exec(query, groupPostID, groupPost.UserName, groupPost.Content, groupPost.CreateAt)
	if err != nil {
		return err
	}

	fmt.Println("GroupPost added successfully")
	return nil
}
