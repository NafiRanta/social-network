package database

import (
	"database/sql"
	//"fmt"
	u "socialnetwork/utils"
	"time"

	"github.com/google/uuid"
)

type GroupComment struct {
	GroupCommentID string
	GroupID        string
	UserName       string
	Comment        string
	CreateAt       time.Time
}

type GroupCommentResponse struct {
	GroupCommentID  string    `json:"groupCommentID"`
	GroupID         string    `json:"groupID"`
	UserName        string    `json:"userName"`
	Comment         string    `json:"comment"`
	CreateAt        time.Time `json:"createAt"`
	AuthorFirstName string    `json:"authorFirstName"`
	AuthorLastName  string    `json:"authorLastName"`
}

func CreateGroupCommentsTable(db *sql.DB) {
	groupCommentsTable := `
	CREATE TABLE IF NOT EXISTS GroupComments (
		GroupCommentID CHAR(36) NOT NULL,
		GroupPostID CHAR(36) NOT NULL,
		GroupID CHAR(36) NOT NULL,
		UserName CHAR(36) NOT NULL,
		Comment TEXT NOT NULL,
		CreateAt TIMESTAMP NOT NULL,
		PRIMARY KEY (GroupCommentID)
	);`

	query, err := db.Prepare(groupCommentsTable)
	u.CheckErr(err)
	query.Exec()
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
		INSERT INTO GroupComments (GroupCommentID, GroupID, UserName, Comment, CreateAt)
			VALUES (?, ?, ?, ?, ?);`

	_, err = db.Exec(query, groupComment.GroupCommentID, groupComment.GroupID, groupComment.UserName, groupComment.Comment, groupComment.CreateAt)
	if err != nil {
		//fmt.Println("error from addGroupComment:", err)
		return err
	}

	return nil

}

func GetGroupCommentsByGroupPostID(groupID string) ([]GroupCommentResponse, error) {

	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `
		SELECT * FROM GroupComments WHERE GroupID=?;`

	rows, err := db.Query(query, groupID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var allGroupComments []GroupCommentResponse
	for rows.Next() {
		var groupComment GroupCommentResponse
		err := rows.Scan(&groupComment.GroupCommentID, &groupComment.GroupID, &groupComment.UserName, &groupComment.Comment, &groupComment.CreateAt)
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
		err := rows.Scan(&groupComment.GroupCommentID, &groupComment.GroupID, &groupComment.UserName, &groupComment.Comment, &groupComment.CreateAt)
		if err != nil {
			return nil, err
		}
		allGroupComments = append(allGroupComments, groupComment)
	}
	return allGroupComments, nil
}
