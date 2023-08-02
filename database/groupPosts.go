package database

import (
	"database/sql"
	//"fmt"

	"time"

	"github.com/google/uuid"
)

// GroupPost represents a group post in the social network.
type GroupPost struct {
	GroupPostID string
	GroupID     string
	UserName    string
	Content     string
	Image       string
	CreateAt    time.Time
}

// GroupPostResponse represents a response object for a GroupPost in JSON format.
type GroupPostResponse struct {
	GroupPostID string    `json:"groupPostID"`
	GroupID     string    `json:"groupID"`
	UserName    string    `json:"userName"`
	Content     string    `json:"content"`
	Image       string    `json:"image"`
	CreateAt    time.Time `json:"createAt"`
}

// AddGroupPost adds a new group post to the database.
func AddGroupPost(groupPost *GroupPostResponse) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	query := `
		INSERT INTO groupPosts (GroupPostID, GroupID, UserName, Content, Image, CreateAt)
			VALUES (?, ?, ?, ?, ?, ?);`

	// Generate UUID for groupPostID
	groupPostID := uuid.New().String()
	_, err = db.Exec(query, groupPostID, groupPost.GroupID, groupPost.UserName, groupPost.Content, groupPost.Image, groupPost.CreateAt)
	if err != nil {
		return err
	}
	return nil
}

func GetGroupPostsByGroupID(groupID string) ([]GroupPostResponse, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `
		SELECT GroupPostID, GroupID, UserName, Content, Image, CreateAt
			FROM GroupPosts
			WHERE GroupID = ?;`

	rows, err := db.Query(query, groupID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var groupPosts []GroupPostResponse
	for rows.Next() {
		var groupPost GroupPostResponse
		err := rows.Scan(&groupPost.GroupPostID, &groupPost.GroupID, &groupPost.UserName, &groupPost.Content, &groupPost.Image, &groupPost.CreateAt)
		if err != nil {
			return nil, err
		}
		groupPosts = append(groupPosts, groupPost)
	}

	return groupPosts, nil
}

func GetUserGroupsPosts(username string) ([]GroupPost, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `
		SELECT GroupPosts.GroupPostID, GroupPosts.GroupID, GroupPosts.UserName, GroupPosts.Content, GroupPosts.Image, GroupPosts.CreateAt
		FROM GroupPosts
		INNER JOIN Groups ON GroupPosts.GroupID = Groups.GroupID
		WHERE Groups.Admin = ? OR Groups.MemberUsernames LIKE '%' || ? || '%'
	`
	rows, err := db.Query(query, username, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var groupPosts []GroupPost
	for rows.Next() {
		var groupPost GroupPost
		err := rows.Scan(
			&groupPost.GroupPostID,
			&groupPost.GroupID,
			&groupPost.UserName,
			&groupPost.Content,
			&groupPost.Image,
			&groupPost.CreateAt,
		)
		if err != nil {
			return nil, err
		}
		groupPosts = append(groupPosts, groupPost)
	}

	return groupPosts, nil
}
