package database

import (
	"database/sql"
	"encoding/json"
	"fmt"
	u "socialnetwork/utils"
	"time"

	"github.com/google/uuid"
)

type Group struct {
	GroupID                string
	GroupName              string
	GroupDescription       string
	Admin                  string
	AdminInvitedUsernames  string
	MemberInvitedUsernames string
	RequestUsernames       string
	MemberUsernames        string
	PostIDs                string
	EventIDs               string
	CreateAt               time.Time
}

type GroupResponse struct {
	GroupID                string    `json:"groupID"`
	GroupName              string    `json:"groupName"`
	GroupDescription       string    `json:"groupDescription"`
	Admin                  string    `json:"adminID"`
	AdminInvitedUsernames  []string  `json:"adminInvitedUsernames"`
	MemberInvitedUsernames []string  `json:"memberInvitedUsernames"`
	RequestUsernames       []string  `json:"requestUsernames"`
	MemberUsernames        []string  `json:"memberUsernames"`
	PostIDs                []string  `json:"postIDs"`
	EventIDs               []string  `json:"eventIDs"`
	CreateAt               time.Time `json:"createAt"`
}

func CreateGroupsTable(db *sql.DB) {
	groupsTable := `
	CREATE TABLE IF NOT EXISTS Groups (
		GroupID CHAR(36) NOT NULL,
		GroupName TEXT NOT NULL,
		GroupDescription TEXT NOT NULL,
		Admin TEXT NOT NULL,
		AdminInvitedUsernames TEXT,
		MemberInvitedUsernames TEXT,
		RequestUsernames TEXT,
		MemberUsernames TEXT,
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
	INSERT INTO Groups (GroupID, GroupName, GroupDescription, Admin, AdminInvitedUsernames, MemberInvitedUsernames, RequestUsernames, MemberUsernames, PostIDs, EventIDs, CreateAt)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	group.GroupID = uuid.New().String()
	adminInvitedJSON, err := json.Marshal(group.AdminInvitedUsernames)
	if err != nil {
		return err
	}
	memberInvitedJSON, err := json.Marshal(group.MemberInvitedUsernames)
	if err != nil {
		return err
	}
	requestJSON, err := json.Marshal(group.RequestUsernames)
	if err != nil {
		return err
	}

	membersJSON, err := json.Marshal(group.MemberUsernames)
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
		string(adminInvitedJSON),
		string(memberInvitedJSON),
		string(requestJSON),
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

func GetGroupsByAdminUsername(username string) ([]Group, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	query := `SELECT * FROM Groups WHERE Admin = ?`
	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var groups []Group
	for rows.Next() {
		var group Group
		err := rows.Scan(
			&group.GroupID,
			&group.GroupName,
			&group.GroupDescription,
			&group.Admin,
			&group.AdminInvitedUsernames,
			&group.MemberInvitedUsernames,
			&group.RequestUsernames,
			&group.MemberUsernames,
			&group.PostIDs,
			&group.EventIDs,
			&group.CreateAt,
		)
		if err != nil {
			return nil, err
		}
		groups = append(groups, group)
	}

	return groups, nil
}

func GetGroupsByMembersUsername(username string) ([]Group, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `SELECT * FROM Groups WHERE MemberUsernames LIKE '%' || ? || '%'`
	rows, err := db.Query(query, username)
	if err != nil {
		fmt.Println("query error", err)
		return nil, err
	}
	defer rows.Close()
	var groups []Group
	for rows.Next() {
		var group Group
		err := rows.Scan(
			&group.GroupID,
			&group.GroupName,
			&group.GroupDescription,
			&group.Admin,
			&group.AdminInvitedUsernames,
			&group.MemberInvitedUsernames,
			&group.RequestUsernames,
			&group.MemberUsernames,
			&group.PostIDs,
			&group.EventIDs,
			&group.CreateAt,
		)
		if err != nil {
			return nil, err
		}
		groups = append(groups, group)
	}
	return groups, nil
}

func GetAllGroups() ([]Group, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	query := `SELECT * FROM Groups`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var groups []Group
	for rows.Next() {
		var group Group
		err := rows.Scan(
			&group.GroupID,
			&group.GroupName,
			&group.GroupDescription,
			&group.Admin,
			&group.AdminInvitedUsernames,
			&group.MemberInvitedUsernames,
			&group.RequestUsernames,
			&group.MemberUsernames,
			&group.PostIDs,
			&group.EventIDs,
			&group.CreateAt,
		)
		if err != nil {
			return nil, err
		}
		groups = append(groups, group)
	}
	return groups, nil
}

func GetGroupByID(groupID string) ([]GroupResponse, error) {
	fmt.Println("groupID", groupID)
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	query := `SELECT * FROM Groups WHERE GroupID = ?`
	rows, err := db.Query(query, groupID)
	if err != nil {
		fmt.Println("query error", err)
		return nil, err
	}
	defer rows.Close()
	var groups []GroupResponse
	for rows.Next() {
		var group GroupResponse
		var memberUsernames string
		var adminInvitedUsernames string
		var memberInvitedUsernames string
		var requestUsernames string
		var postIDs string
		var eventIDs string
		err := rows.Scan(
			&group.GroupID,
			&group.GroupName,
			&group.GroupDescription,
			&group.Admin,
			&adminInvitedUsernames,
			&memberInvitedUsernames,
			&requestUsernames,
			&memberUsernames,
			&postIDs,
			&eventIDs,
			&group.CreateAt,
		)
		if err != nil {
			fmt.Println("scan error", err)
			return nil, err
		}
		// Convert the MemberUsernames string to a slice of strings
		err = json.Unmarshal([]byte(memberUsernames), &group.MemberUsernames)
		if err != nil {
			fmt.Println("unmarshal error", err)
			return nil, err
		}

		// convert the InvitedUsernames string to a slice of strings
		err = json.Unmarshal([]byte(adminInvitedUsernames), &group.AdminInvitedUsernames)
		if err != nil {
			fmt.Println("unmarshal error", err)
			return nil, err
		}
		// Convert the MemberInvitedUsernames string to a slice of strings
		err = json.Unmarshal([]byte(memberInvitedUsernames), &group.MemberInvitedUsernames)
		if err != nil {
			fmt.Println("unmarshal error", err)
			return nil, err
		}
		// Convert the RequestUsernames string to a slice of strings
		err = json.Unmarshal([]byte(requestUsernames), &group.RequestUsernames)
		if err != nil {
			fmt.Println("unmarshal error", err)
			return nil, err
		}
		// Convert the PostIDs string to a slice of strings
		err = json.Unmarshal([]byte(postIDs), &group.PostIDs)
		if err != nil {
			fmt.Println("unmarshal error", err)
			return nil, err
		}
		// Convert the EventIDs string to a slice of strings
		err = json.Unmarshal([]byte(eventIDs), &group.EventIDs)
		if err != nil {
			fmt.Println("unmarshal error", err)
			return nil, err
		}

		groups = append(groups, group)
	}
	return groups, nil
}

func AddUserToGroup(groupID string, username string) error {
	fmt.Println("groupID in addusertogroup", groupID)
	fmt.Println("username in addusertogroup", username)
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		fmt.Println("open error", err)
		return err
	}
	defer db.Close()
	// add username to the MemberUsernames slice in the Groups table
	query := `UPDATE Groups SET MemberUsernames = json_insert(MemberUsernames, '$[#]', ?) WHERE GroupID = ?`
	stmt, err := db.Prepare(query)
	if err != nil {
		fmt.Println("prepare error", err)
		return err
	}
	_, err = stmt.Exec(username, groupID)
	if err != nil {
		fmt.Println("exec error", err)
		return err
	}
	return nil
}

func GetGroupsByAdminInvitedUsername(username string) ([]Group, error) {
	fmt.Println("username in getgroupsbyadmininvitedusername", username)
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		fmt.Println("open error", err)
		return nil, err
	}
	defer db.Close()
	query := `SELECT * FROM Groups WHERE AdminInvitedUsernames LIKE '%' || ? || '%'`
	rows, err := db.Query(query, username)
	if err != nil {
		fmt.Print("query error", err)
		return nil, err
	}
	defer rows.Close()
	var groups []Group
	for rows.Next() {
		var group Group
		err := rows.Scan(
			&group.GroupID,
			&group.GroupName,
			&group.GroupDescription,
			&group.Admin,
			&group.AdminInvitedUsernames,
			&group.MemberInvitedUsernames,
			&group.RequestUsernames,
			&group.MemberUsernames,
			&group.PostIDs,
			&group.EventIDs,
			&group.CreateAt,
		)
		if err != nil {
			fmt.Println("scan error", err)
			return nil, err
		}
		groups = append(groups, group)
	}
	return groups, nil

}

func DeleteUserFromAdminInvite(groupID string, username string) error {
	fmt.Println("groupID in deleteuserfromadmininvite", groupID)
	fmt.Println("username in deleteuserfromadmininvite", username)
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		fmt.Println("open error", err)
		return err
	}
	defer db.Close()

	// Get the current JSON array
	query := "SELECT AdminInvitedUsernames FROM Groups WHERE GroupID = ?"
	stmt, err := db.Prepare(query)
	if err != nil {
		fmt.Println("prepare error", err)
		return err
	}
	row := stmt.QueryRow(groupID)

	var adminInvitedUsernames string
	err = row.Scan(&adminInvitedUsernames)
	if err != nil {
		fmt.Println("scan error", err)
		return err
	}

	// Parse the JSON array into a slice
	var usernames []string
	err = json.Unmarshal([]byte(adminInvitedUsernames), &usernames)
	if err != nil {
		fmt.Println("unmarshal error", err)
		return err
	}

	// Find and remove the specified username from the slice
	for i, u := range usernames {
		if u == username {
			usernames = append(usernames[:i], usernames[i+1:]...)
			break
		}
	}

	// Convert the slice back to a JSON array
	newAdminInvitedUsernames, err := json.Marshal(usernames)
	if err != nil {
		fmt.Println("marshal error", err)
		return err
	}

	// Update the Groups table with the new JSON array
	updateQuery := "UPDATE Groups SET AdminInvitedUsernames = ? WHERE GroupID = ?"
	updateStmt, err := db.Prepare(updateQuery)
	if err != nil {
		fmt.Println("prepare error", err)
		return err
	}
	_, err = updateStmt.Exec(string(newAdminInvitedUsernames), groupID)
	if err != nil {
		fmt.Println("exec error", err)
		return err
	}

	fmt.Println("Deleted user from admin invite")
	return nil
}
