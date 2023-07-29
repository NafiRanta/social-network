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
	GroupID                string            `json:"groupID"`
	GroupName              string            `json:"groupName"`
	GroupDescription       string            `json:"groupDescription"`
	Admin                  string            `json:"adminID"`
	AdminInvitedUsernames  []string          `json:"adminInvitedUsernames"`
	MemberInvitedUsernames []InvitesByMember `json:"memberInvitedUsernames"` // map with invited as key and member as value
	RequestUsernames       []string          `json:"requestUsernames"`
	MemberUsernames        []string          `json:"memberUsernames"`
	PostIDs                []string          `json:"postIDs"`
	EventIDs               []string          `json:"eventIDs"`
	CreateAt               time.Time         `json:"createAt"`
}

type InvitesByMember struct {
	InvitedUsernames []string
	Member           string
}

type InvitesByMemberResponse struct {
	MemberUsername   string   `json:"memberUsername"`
	GroupID          string   `json:"groupID"`
	InvitedUsernames []string `json:"memberInvitedUsernames"`
}
type AcceptJoinRequest struct {
	GroupID  string `json:"groupID"`
	UserName string `json:"userName"`
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
		//fmt.Println("query error", err)
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

func GetGroupByID(groupID string) (Group, error) {
	//fmt.Println("groupID", groupID)
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return Group{}, err
	}
	defer db.Close()

	query := `SELECT * FROM Groups WHERE GroupID = ?`
	row := db.QueryRow(query, groupID)

	var group Group
	err = row.Scan(
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
		if err == sql.ErrNoRows {
			// If no row is found, return an error to indicate that the group with the given ID was not found
			return Group{}, fmt.Errorf("group with ID %s not found", groupID)
		}
		// For other errors, return the error
		return Group{}, err
	}

	return group, nil
}


func AddUserToGroup(groupID string, username string) error {
	//fmt.Println("username in addusertogroup", username)
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		//fmt.Println("open error", err)
		return err
	}
	DeleteUserFromAdminInvite(groupID, username)
	DeleteUserFromMemberInvite(groupID, username)
	DeleteUserFromRequestUsernames(groupID, username)
	defer db.Close()

	// Check if the username is already in the MemberUsernames slice for the given groupID
	var usernamesJSON string
	checkQuery := "SELECT MemberUsernames FROM Groups WHERE GroupID = ?"
	err = db.QueryRow(checkQuery, groupID).Scan(&usernamesJSON)
	if err != nil {
		//fmt.Println("query error", err)
		return err
	}

	var existingUsernames []string
	err = json.Unmarshal([]byte(usernamesJSON), &existingUsernames)
	if err != nil {
		//fmt.Println("unmarshal error", err)
		return err
	}

	// Check if the username is already in the existingUsernames slice
	for _, existingUsername := range existingUsernames {
		if existingUsername == username {
			//fmt.Println("Username already exists in the MemberUsernames list")
			return nil // Return early if the username is already in the list
		}
	}

	// Add the username to the MemberUsernames slice in the Groups table
	newUsernames := append(existingUsernames, username)
	newUsernamesJSON, err := json.Marshal(newUsernames)
	if err != nil {
		//fmt.Println("marshal error", err)
		return err
	}

	query := "UPDATE Groups SET MemberUsernames = ? WHERE GroupID = ?"
	stmt, err := db.Prepare(query)
	if err != nil {
		//fmt.Println("prepare error", err)
		return err
	}

	_, err = stmt.Exec(newUsernamesJSON, groupID)
	if err != nil {
		//fmt.Println("exec error", err)
		return err
	}

	return nil
}

func GetGroupsByAdminInvitedUsername(username string) ([]Group, error) {
	//fmt.Println("username in getgroupsbyadmininvitedusername", username)
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		//fmt.Println("open error", err)
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
			//fmt.Println("scan error", err)
			return nil, err
		}
		groups = append(groups, group)
	}
	return groups, nil

}

func DeleteUserFromAdminInvite(groupID string, username string) error {
	//fmt.Println("groupID in deleteuserfromadmininvite", groupID)
	//fmt.Println("username in deleteuserfromadmininvite", username)
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		//fmt.Println("open error", err)
		return err
	}
	defer db.Close()

	// Get the current JSON array
	query := "SELECT AdminInvitedUsernames FROM Groups WHERE GroupID = ?"
	stmt, err := db.Prepare(query)
	if err != nil {
		//fmt.Println("prepare error", err)
		return err
	}
	row := stmt.QueryRow(groupID)

	var adminInvitedUsernames string
	err = row.Scan(&adminInvitedUsernames)
	if err != nil {
		//fmt.Println("scan error", err)
		return err
	}

	// Parse the JSON array into a slice
	var usernames []string
	err = json.Unmarshal([]byte(adminInvitedUsernames), &usernames)
	if err != nil {
		//fmt.Println("unmarshal error", err)
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
		//fmt.Println("marshal error", err)
		return err
	}

	// Update the Groups table with the new JSON array
	updateQuery := "UPDATE Groups SET AdminInvitedUsernames = ? WHERE GroupID = ?"
	updateStmt, err := db.Prepare(updateQuery)
	if err != nil {
		//fmt.Println("prepare error", err)
		return err
	}
	_, err = updateStmt.Exec(string(newAdminInvitedUsernames), groupID)
	if err != nil {
		//fmt.Println("exec error", err)
		return err
	}

	//fmt.Println("Deleted user from admin invite")
	return nil
}

func DeleteUserFromRequestUsernames(groupID string, username string) error {
	// delete username from the RequestUsernames slice in the Groups table if it exists
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		fmt.Println("open error", err)
		return err
	}
	defer db.Close()
	// Get the current JSON array
	query := "SELECT RequestUsernames FROM Groups WHERE GroupID = ?"
	stmt, err := db.Prepare(query)
	if err != nil {
		fmt.Println("prepare error", err)
		return err
	}
	row := stmt.QueryRow(groupID)
	// if username is in the row, delete it
	var requestUsernames string
	err = row.Scan(&requestUsernames)
	if err != nil {
		fmt.Println("scan error", err)
		return err
	}
	fmt.Println("requestUsernames", requestUsernames)
	// Parse the JSON array into a slice
	var usernames []string
	err = json.Unmarshal([]byte(requestUsernames), &usernames)
	if err != nil {
		fmt.Println("unmarshal error", err)
		return err
	}
	fmt.Println("usernames", usernames)
	// Find and remove the specified username from the slice
	for i, u := range usernames {
		if u == username {
			usernames = append(usernames[:i], usernames[i+1:]...)
			break
		}
	}
	// Convert the slice back to a JSON array
	newRequestUsernames, err := json.Marshal(usernames)
	if err != nil {
		fmt.Println("marshal error", err)
		return err
	}
	// Update the Groups table with the new JSON array
	updateQuery := "UPDATE Groups SET RequestUsernames = ? WHERE GroupID = ?"
	updateStmt, err := db.Prepare(updateQuery)
	if err != nil {
		fmt.Println("prepare error", err)
		return err
	}
	_, err = updateStmt.Exec(string(newRequestUsernames), groupID)
	if err != nil {
		fmt.Println("exec error", err)
		return err
	}
	return nil
}

func DeleteUserFromMemberInvite(groupID string, username string) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	// Get the current JSON array
	query := "SELECT MemberInvitedUsernames FROM Groups WHERE GroupID = ?"
	stmt, err := db.Prepare(query)
	if err != nil {
		fmt.Println("prepare error", err)
		return err
	}

	row := stmt.QueryRow(groupID)

	var memberInvitedUsernames string
	err = row.Scan(&memberInvitedUsernames)
	if err != nil {
		fmt.Println("scan error", err)
		return err
	}

	fmt.Println("memberInvitedUsernames", memberInvitedUsernames)

	// Parse the JSON array into a slice of InvitesByMember
	var invitesByMember []map[string]interface{}
	err = json.Unmarshal([]byte(memberInvitedUsernames), &invitesByMember)
	if err != nil {
		fmt.Println("unmarshal error", err)
		return err
	}

	// Find the index of the object to delete
	var indexToDelete int
	for i, invite := range invitesByMember {
		member, ok := invite["Member"].(string)
		if ok && member == username {
			indexToDelete = i
			break
		}
	}

	// Remove the object from the slice
	if indexToDelete >= 0 && indexToDelete < len(invitesByMember) {
		invitesByMember = append(invitesByMember[:indexToDelete], invitesByMember[indexToDelete+1:]...)
	}

	// Convert the slice back to a JSON array
	newMemberInvitedUsernames, err := json.Marshal(invitesByMember)
	if err != nil {
		return err
	}

	fmt.Println("newMemberInvitedUsernames", string(newMemberInvitedUsernames))

	// Update the Groups table with the new JSON array
	updateQuery := "UPDATE Groups SET MemberInvitedUsernames = ? WHERE GroupID = ?"
	updateStmt, err := db.Prepare(updateQuery)
	if err != nil {
		return err
	}
	_, err = updateStmt.Exec(string(newMemberInvitedUsernames), groupID)
	if err != nil {
		return err
	}

	return nil
}

// if user is found in the RequestUsernames slice, delete it
func DeleteUserFromJoinRequest(groupID string, username string) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()
	// Get the current JSON array
	query := "SELECT RequestUsernames FROM Groups WHERE GroupID = ?"
	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	row := stmt.QueryRow(groupID)
	// if username is in the row, delete it
	var requestUsernames string
	err = row.Scan(&requestUsernames)
	if err != nil {
		return err
	}
	// Parse the JSON array into a slice
	var usernames []string
	err = json.Unmarshal([]byte(requestUsernames), &usernames)
	if err != nil {
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
	newRequestUsernames, err := json.Marshal(usernames)
	if err != nil {
		return err
	}
	// Update the Groups table with the new JSON array
	updateQuery := "UPDATE Groups SET RequestUsernames = ? WHERE GroupID = ?"
	updateStmt, err := db.Prepare(updateQuery)
	if err != nil {
		return err
	}
	_, err = updateStmt.Exec(string(newRequestUsernames), groupID)
	if err != nil {
		return err
	}
	return nil
}

func AddUserToMemberInvite(groupID string, memberUsername string, invitedUsernames []string) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	// Get the current JSON array
	query := "SELECT MemberInvitedUsernames FROM Groups WHERE GroupID = ?"
	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	row := stmt.QueryRow(groupID)

	var memberInvitedUsernames string
	err = row.Scan(&memberInvitedUsernames)
	if err != nil {
		return err
	}

	// Parse the JSON array into a slice of InvitesByMember
	var invites []InvitesByMember
	err = json.Unmarshal([]byte(memberInvitedUsernames), &invites)
	if err != nil {
		return err
	}

	// Check if the member already has an invite in the list
	for i, invite := range invites {
		if invite.Member == memberUsername {
			// Member already has an invite, update the invited usernames and return
			invites[i].InvitedUsernames = invitedUsernames

			// Convert the slice back to a JSON array
			newMemberInvitedUsernames, err := json.Marshal(invites)
			if err != nil {
				return err
			}

			// Update the Groups table with the new JSON array
			updateQuery := "UPDATE Groups SET MemberInvitedUsernames = ? WHERE GroupID = ?"
			updateStmt, err := db.Prepare(updateQuery)
			if err != nil {
				return err
			}
			_, err = updateStmt.Exec(string(newMemberInvitedUsernames), groupID)
			if err != nil {
				return err
			}

			return nil
		}
	}

	// If the member does not have an invite, add a new entry to the slice
	invite := InvitesByMember{
		InvitedUsernames: invitedUsernames,
		Member:           memberUsername,
	}

	invites = append(invites, invite)

	// Convert the slice back to a JSON array
	newMemberInvitedUsernames, err := json.Marshal(invites)
	if err != nil {
		return err
	}

	// Update the Groups table with the new JSON array
	updateQuery := "UPDATE Groups SET MemberInvitedUsernames = ? WHERE GroupID = ?"
	updateStmt, err := db.Prepare(updateQuery)
	if err != nil {
		return err
	}
	_, err = updateStmt.Exec(string(newMemberInvitedUsernames), groupID)
	if err != nil {
		return err
	}

	return nil
}

func AddUserToJoinRequest(groupID string, username string) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		fmt.Println("open error", err)
		return err
	}
	defer db.Close()

	// Check if the username is already in the RequestUsernames slice for the given groupID
	var usernamesJSON string
	checkQuery := "SELECT RequestUsernames FROM Groups WHERE GroupID = ?"
	err = db.QueryRow(checkQuery, groupID).Scan(&usernamesJSON)
	if err != nil {
		fmt.Println("query error", err)
		return err
	}

	var existingUsernames []string
	err = json.Unmarshal([]byte(usernamesJSON), &existingUsernames)
	if err != nil {
		fmt.Println("unmarshal error", err)
		return err
	}

	// Check if the username is already in the existingUsernames slice
	for _, existingUsername := range existingUsernames {
		if existingUsername == username {
			fmt.Println("Username already exists in the RequestUsernames list")
			return nil // Return early if the username is already in the list
		}
	}

	// Add the username to the RequestUsernames slice in the Groups table
	newUsernames := append(existingUsernames, username)
	newUsernamesJSON, err := json.Marshal(newUsernames)
	if err != nil {
		fmt.Println("marshal error", err)
		return err
	}

	// Update the Groups table with the new JSON array
	updateQuery := "UPDATE Groups SET RequestUsernames = ? WHERE GroupID = ?"
	updateStmt, err := db.Prepare(updateQuery)
	if err != nil {
		fmt.Println("prepare error", err)
		return err
	}

	_, err = updateStmt.Exec(string(newUsernamesJSON), groupID)
	if err != nil {
		fmt.Println("exec error", err)
		return err
	}

	return nil
}
