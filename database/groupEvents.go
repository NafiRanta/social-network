package database

import (
	"database/sql"
	"encoding/json"

	"fmt"
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
	fmt.Println(invitedJSON, goingJSON)
	// when create event, th
	_, err = db.Exec(query, groupEventID, groupEvent.GroupID, groupEvent.UserName, groupEvent.EventName, groupEvent.EventDescription, groupEvent.EventDate, groupEvent.EventTime, "", "", groupEvent.CreateAt)
	if err != nil {
		return err
	}

	//fmt.Println("Added group event to database.")
	return nil
}

func GetGroupEvents(groupID string) ([]GroupEvent, error) {
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

func GetGroupEventByID(groupEventID string) (GroupEvent, error) {
	// Connect to the database
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return GroupEvent{}, err
	}
	defer db.Close()

	// Prepare the SQL query to fetch the group event by its GroupEventID
	stmt, err := db.Prepare("SELECT * FROM GroupEvents WHERE GroupEventID = ?")
	if err != nil {
		return GroupEvent{}, err
	}
	defer stmt.Close()

	// Execute the query and scan the result into the provided groupEvent struct
	var result GroupEvent
	err = stmt.QueryRow(groupEventID).Scan(
		&result.GroupEventID,
		&result.GroupID,
		&result.UserName,
		&result.EventName,
		&result.EventDescription,
		&result.EventDate,
		&result.EventTime,
		&result.NotGoingUsers,
		&result.GoingUsers,
		&result.CreateAt,
	)
	if err != nil {
		return GroupEvent{}, err
	}

	return result, nil
}

func AddGoingUsers(groupEvent *GroupEvent, username string) error {
	// Check if GoingUsers is an empty string, if empty then add username, if not add "," then the username
	if groupEvent.GoingUsers == "" {
		groupEvent.GoingUsers = username
	} else {
		groupEvent.GoingUsers += "," + username
	}

	// Connect to the database
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	// Prepare the SQL query to update the GoingUsers field in the database
	stmt, err := db.Prepare("UPDATE GroupEvents SET GoingUsers = ? WHERE GroupEventID = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	// Execute the query to update the GoingUsers field in the database
	_, err = stmt.Exec(groupEvent.GoingUsers, groupEvent.GroupEventID)
	if err != nil {
		return err
	}

	return nil
}

func AddNotGoingUsers(groupEvent *GroupEvent, username string) error {
	// Check if notGoingUsers is an empty string, if empty then add username, if not add "," then the username
	if groupEvent.NotGoingUsers == "" {
		groupEvent.NotGoingUsers = username
	} else {
		groupEvent.NotGoingUsers += "," + username
	}

	// Connect to the database
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	// Prepare the SQL query to update the NotGoingUsers field in the database
	stmt, err := db.Prepare("UPDATE GroupEvents SET notGoingUsers = ? WHERE GroupEventID = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	// Execute the query to update the NotGoingUsers field in the database
	_, err = stmt.Exec(groupEvent.NotGoingUsers, groupEvent.GroupEventID)
	if err != nil {
		return err
	}

	return nil
}
