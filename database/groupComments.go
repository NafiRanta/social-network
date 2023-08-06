package database

import (
	"database/sql"

	//"fmt"

	"time"

	"github.com/google/uuid"
)

type GroupComment struct {
	GroupCommentID string
	GroupID        string
	UserName       string
	Content        string
	Image          string
	CreateAt       time.Time
}

type GroupCommentResponse struct {
	GroupCommentID string    `json:"groupCommentID"`
	GroupPostID    string    `json:"groupPostID"`
	GroupID        string    `json:"groupID"`
	UserName       string    `json:"userName"`
	Content        string    `json:"content"`
	Image          string    `json:"image"`
	CreateAt       time.Time `json:"createAt"`
}

func AddGroupComment(groupComment *GroupCommentResponse) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	groupComment.GroupCommentID = uuid.New().String()
	groupComment.CreateAt = time.Now()

	query := `
		INSERT INTO GroupComments (GroupCommentID, GroupPostID, UserName, Content, Image, CreateAt)
			VALUES (?, ?, ?, ?, ?, ?);`

	_, err = db.Exec(query, groupComment.GroupCommentID, groupComment.GroupPostID, groupComment.UserName, groupComment.Content, groupComment.Image, groupComment.CreateAt)
	if err != nil {
		return err
	}

	return nil
}

func GetGroupCommentsByGroupPostID(grouppostid string) ([]GroupCommentResponse, error) {

	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `
		SELECT * FROM GroupComments WHERE GroupPostID=?;`

	rows, err := db.Query(query, grouppostid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var allGroupComments []GroupCommentResponse
	for rows.Next() {
		var groupComment GroupCommentResponse
		err := rows.Scan(&groupComment.GroupCommentID, &groupComment.GroupPostID, &groupComment.UserName, &groupComment.Content, &groupComment.Image, &groupComment.CreateAt)
		if err != nil {
			return nil, err
		}
		allGroupComments = append(allGroupComments, groupComment)
	}
	return allGroupComments, nil
}

func GetGroupPostsComments(groupPostID string) ([]GroupCommentResponse, error) {

	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `
		SELECT * FROM GroupComments WHERE GroupPostID=?;`

	rows, err := db.Query(query, groupPostID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var allGroupComments []GroupCommentResponse
	for rows.Next() {
		var groupComment GroupCommentResponse
		err := rows.Scan(&groupComment.GroupCommentID, &groupComment.GroupPostID, &groupComment.UserName, &groupComment.Content, &groupComment.Image, &groupComment.CreateAt)
		if err != nil {
			return nil, err
		}
		allGroupComments = append(allGroupComments, groupComment)
	}
	return allGroupComments, nil
}
