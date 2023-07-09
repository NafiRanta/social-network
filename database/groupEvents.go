package database

import (
	"database/sql"
	"encoding/json"
	"fmt"
	u "socialnetwork/utils"
	"time"

	"github.com/google/uuid"
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
		InvitedUsers TEXT,
		GoingUsers TEXT,
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

	groupEventID := uuid.New().String()

	invitedJSON, err := json.Marshal(groupEvent.InvitedUsers)
	if err != nil {
		return err
	}

	goingJSON, err := json.Marshal(groupEvent.GoingUsers)
	if err != nil {
		return err
	}

	_, err = db.Exec(query, groupEventID, groupEvent.GroupID, groupEvent.UserName, groupEvent.EventName, groupEvent.EventDescription, groupEvent.EventDate, string(invitedJSON), string(goingJSON), groupEvent.CreateAt)
	if err != nil {
		return err
	}

	fmt.Println("Added group event to database.")
	return nil
}
