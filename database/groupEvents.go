package database

import (
	"database/sql"
	u "socialnetwork/utils"
	"time"
)

type GroupEvent struct {
	GroupEventID     string
	GroupID          string
	UserName         string
	EventName        string
	EventDescription string
	EventDate        string
	InvitedUsers     string
	GoingUsers       string
	CreateAt         time.Time
}

type GroupEventResponse struct {
	GroupEventID     string    `json:"groupEventID"`
	GroupID          string    `json:"groupID"`
	UserName         string    `json:"userName"`
	EventName        string    `json:"eventName"`
	EventDescription string    `json:"eventDescription"`
	EventDate        string    `json:"eventDate"`
	EventTime        string    `json:"eventTime"`
	InvitedUsers     []string  `json:"invitedUsers"`
	GoingUsers       []string  `json:"goingUsers"`
	CreateAt         time.Time `json:"createAt"`
}

func CreateGroupEventsTable(db *sql.DB) {
	groupEventsTable := `
	CREATE TABLE IF NOT EXISTS GroupEvents (
		GroupEventID CHAR(36) NOT NULL,
		GroupID CHAR(36) NOT NULL,
		UserName CHAR(36) NOT NULL,
		EventName TEXT NOT NULL,
		EventDescription TEXT NOT NULL,
		EventDate TEXT NOT NULL,
		InvitedUsers TEXT NOT NULL,
		GoingUsers TEXT NOT NULL,
		CreateAt TIMESTAMP NOT NULL,
		PRIMARY KEY (GroupEventID)
	);`

	query, err := db.Prepare(groupEventsTable)
	u.CheckErr(err)
	query.Exec()
}

func AddGroupEvent(groupEvent *GroupEventResponse) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	query := `
		INSERT INTO groupEvents (GroupEventID, GroupID, UserName, EventName, EventDescription, EventDate, InvitedUsers, GoingUsers, CreateAt)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`

	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(groupEvent.GroupEventID, groupEvent.GroupID, groupEvent.UserName, groupEvent.EventName, groupEvent.EventDescription, groupEvent.EventDate, groupEvent.InvitedUsers, groupEvent.GoingUsers, groupEvent.CreateAt)
	if err != nil {
		return err
	}

	return nil
}
