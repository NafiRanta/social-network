package database

import (
	"database/sql"
	"encoding/json"
	u "socialnetwork/utils"
	"time"

	"github.com/google/uuid"
)

type Group struct {
	GroupID          string
	GroupName        string
	GroupDescription string
	Admin            string
	InvitedFriends   string
	MemberUsernames  string
	PostIDs          string
	EventIDs         string
	CreateAt         time.Time
}

type GroupResponse struct {
	GroupID          string    `json:"groupID"`
	GroupName        string    `json:"groupName"`
	GroupDescription string    `json:"groupDescription"`
	Admin            string    `json:"adminID"`
	InvitedFriends   []string  `json:"invitedFriends"`
	Members          []string  `json:"memberUsernames"`
	PostIDs          []string  `json:"postIDs"`
	EventIDs         []string  `json:"eventIDs"`
	CreateAt         time.Time `json:"createAt"`
}

func CreateGroupsTable(db *sql.DB) {
	groupsTable := `
	CREATE TABLE IF NOT EXISTS Groups (
		GroupID CHAR(36) NOT NULL,
		GroupName TEXT NOT NULL,
		GroupDescription TEXT NOT NULL,
		Admin TEXT NOT NULL,
		InvitedFriends TEXT,
		Members TEXT,
		PostIDs TEXT,
		EventIDs TEXT,
		CreateAt TIMESTAMP NOT NULL,
		PRIMARY KEY (GroupID)
	);`

	query, err := db.Prepare(groupsTable)
	u.CheckErr(err)
	query.Exec()
}

func AddGroup(group *GroupResponse) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()
	query := `
	INSERT INTO Groups (GroupID, GroupName, GroupDescription, Admin, InvitedFriends, Members, PostIDs, EventIDs, CreateAt)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

	group.GroupID = uuid.New().String()
	invitedFriendsJSON, err := json.Marshal(group.InvitedFriends)
	if err != nil {
		return err
	}

	membersJSON, err := json.Marshal(group.Members)
	if err != nil {
		return err
	}

	postIDsJSON, err := json.Marshal(group.PostIDs)
	if err != nil {
		return err
	}

	eventIDsJSON, err := json.Marshal(group.EventIDs)
	if err != nil {
		return err
	}

	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	_, err = stmt.Exec(
		group.GroupID,
		group.GroupName,
		group.GroupDescription,
		group.Admin,
		string(invitedFriendsJSON),
		string(membersJSON),
		string(postIDsJSON),
		string(eventIDsJSON),
		group.CreateAt,
	)
	if err != nil {
		return err
	}
	return nil
}
