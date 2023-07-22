package database

import (
	"database/sql"
	"encoding/json"

	//"fmt"
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
	EventTime        string
	NotGoingUsers    string
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
	NotGoingUsers    []string  `json:"notGoingUsers"`
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
		EventTime TEXT NOT NULL,
		notGoingUsers TEXT,
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
		INSERT INTO GroupEvents (GroupEventID, GroupID, UserName, EventName, EventDescription, EventDate, EventTime, notGoingUsers, GoingUsers, CreateAt)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

	groupEventID := uuid.New().String()

	invitedJSON, err := json.Marshal(groupEvent.NotGoingUsers)
	if err != nil {
		return err
	}

	goingJSON, err := json.Marshal(groupEvent.GoingUsers)
	if err != nil {
		return err
	}

	_, err = db.Exec(query, groupEventID, groupEvent.GroupID, groupEvent.UserName, groupEvent.EventName, groupEvent.EventDescription, groupEvent.EventDate, groupEvent.EventTime, string(invitedJSON), string(goingJSON), groupEvent.CreateAt)
	if err != nil {
		return err
	}

	//fmt.Println("Added group event to database.")
	return nil
}

func GetGroupEvent(groupID string) ([]GroupEvent, error) {
	//fmt.Println("groupID:", groupID)
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `SELECT * FROM GroupEvents WHERE GroupID = ?`

	rows, err := db.Query(query, groupID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var groupEvents []GroupEvent
	for rows.Next() {
		var groupEvent GroupEvent
		err := rows.Scan(
			&groupEvent.GroupEventID,
			&groupEvent.GroupID,
			&groupEvent.UserName,
			&groupEvent.EventName,
			&groupEvent.EventDescription,
			&groupEvent.EventDate,
			&groupEvent.EventTime,
			&groupEvent.NotGoingUsers,
			&groupEvent.GoingUsers,
			&groupEvent.CreateAt,
		)
		if err != nil {
			return nil, err
		}
		groupEvents = append(groupEvents, groupEvent)
	}

	return groupEvents, nil

}
