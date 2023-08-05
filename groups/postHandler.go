package groups

import (
	"encoding/json"
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

func CreateGroupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}

	authHeader := r.Header.Get("Authorization")
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		http.Error(w, "Invalid authorization header", http.StatusUnauthorized)
		return
	}

	// Parse the request body to get the post information
	var group d.GroupResponse
	err = json.NewDecoder(r.Body).Decode(&group)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	user, err := d.GetUserByID(userID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	group.AdminID = user.UserName
	err = d.AddGroup(&group)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}

	allGroups, err := d.GetAllGroups()
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a response object
	response := struct {
		GroupID   string    `json:"groupID"`
		AllGroups []d.Group `json:"allGroups"`
	}{
		GroupID:   group.GroupID,
		AllGroups: allGroups,
	}

	// Convert the response object to JSON
	jsonData, err := json.Marshal(response)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(jsonData)
}

func AddUserToGroupHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		u.LogErrorString("Invalid request method")
		return
	}

	// Extract the userID from the header
	authHeader := r.Header.Get("Authorization")
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		http.Error(w, "Invalid authorization header", http.StatusUnauthorized)
		u.CheckErr(err)
		return
	}

	groupID := r.URL.Query().Get("groupID")
	if groupID == "" {
		u.LogErrorString("error, no groupID")
		http.Error(w, "Missing groupID", http.StatusBadRequest)
		return
	}

	user, err := d.GetUserByID(userID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	username := user.UserName
	// find username in group adminInvitedUsernames and delete it
	err = d.DeleteUserFromAdminInvite(groupID, username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to delete group", http.StatusInternalServerError)
		return
	}
	// add username to group memberUsernames
	err = d.AddUserToGroup(groupID, username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}

	allGroups, err := d.GetAllGroups()
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := struct {
		AllGroups []d.Group `json:"allGroups"`
	}{
		AllGroups: allGroups,
	}

	// Convert the response object to JSON
	jsonData, err := json.Marshal(response)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the response headers and write the JSON data
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(jsonData)
}

// add users to group MemberInvitedUsernames
func AddUsersToMemberInvited(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		u.LogErrorString("Missing auth header")
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	user, err := d.GetUserByID(userID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	username := user.UserName

	groupID := r.URL.Query().Get("groupID")

	var response d.InvitesByMemberResponse
	err = json.NewDecoder(r.Body).Decode(&response)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	invitedUsernames := response.InvitedUsernames

	allGroups, err := d.GetAllGroups()
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response2 := struct {
		AllGroups                 []d.Group `json:"allGroups"`
		d.InvitesByMemberResponse `json:"invitesByMemberResponse"`
	}{
		AllGroups:               allGroups,
		InvitesByMemberResponse: response,
	}

	responseJSON, err := json.Marshal(response2)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	err = d.AddUserToMemberInvite(groupID, username, invitedUsernames)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")

	w.Write(responseJSON)
}

func AddUsersToAdminInvited(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		u.LogErrorString("Missing auth header")
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	user, err := d.GetUserByID(userID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	username := user.UserName

	groupID := r.URL.Query().Get("groupID")

	var invitesByAdminResponse d.InvitesByAdminResponse
	err = json.NewDecoder(r.Body).Decode(&invitesByAdminResponse)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	// get invitedUsernames from response
	invitedUsernames := invitesByAdminResponse.InvitedUsernames

	err = d.AddUserToAdminInvite(invitedUsernames, groupID, username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}
	allGroups, err := d.GetAllGroups()
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to get groups", http.StatusInternalServerError)
		return
	}

	response := struct {
		AllGroups []d.Group `json:"allGroups"`
	}{
		AllGroups: allGroups,
	}
	// write groups to response
	responseJSON, err := json.Marshal(response)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}

func DeclineGroupInviteHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}

	// Extract the userID from the header
	authHeader := r.Header.Get("Authorization")
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		http.Error(w, "Invalid authorization header", http.StatusUnauthorized)
		return
	}

	groupID := r.URL.Query().Get("groupID")
	if groupID == "" {
		http.Error(w, "Missing groupID", http.StatusBadRequest)
		return
	}

	user, err := d.GetUserByID(userID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	username := user.UserName
	// find username in group adminInvitedUsernames and delete it
	err = d.DeleteUserFromAdminInvite(groupID, username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to delete group", http.StatusInternalServerError)
		return
	}
	// get all groups
	allGroups, err := d.GetAllGroups()
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to get groups", http.StatusInternalServerError)
		return
	}

	response := struct {
		AllGroups []d.Group `json:"allGroups"`
	}{
		AllGroups: allGroups,
	}
	responseJSON, err := json.Marshal(response)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}

func JoinRequestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}

	// Extract the userID from the header
	authHeader := r.Header.Get("Authorization")
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Invalid authorization header", http.StatusUnauthorized)
		return
	}

	groupID := r.URL.Query().Get("groupID")
	if groupID == "" {
		u.LogErrorString("error, no groupID")
		http.Error(w, "Missing groupID", http.StatusBadRequest)
		return
	}

	user, err := d.GetUserByID(userID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	username := user.UserName

	err = d.AddUserToJoinRequest(groupID, username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}

	// remove user from AdminInvitedUsernames
	err = d.DeleteUserFromAdminInvite(groupID, username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to delete group", http.StatusInternalServerError)
		return
	}

	// remove user from memberInvitedUsernames
	err = d.DeleteUserFromMemberInvite(groupID, username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to delete group", http.StatusInternalServerError)
		return
	}

	// get all groups
	allGroups, err := d.GetAllGroups()
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to get groups", http.StatusInternalServerError)
		return
	}

	response := struct {
		AllGroups []d.Group `json:"allGroups"`
	}{
		AllGroups: allGroups,
	}
	// write groups to response
	responseJSON, err := json.Marshal(response)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}

func AcceptJoinRequestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	// get groupID & username from request body
	var request d.AcceptJoinRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	groupID := request.GroupID
	username := request.UserName
	// add username to group memberUsernames
	err = d.AddUserToGroup(groupID, username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}

	allGroups, err := d.GetAllGroups()
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to get groups", http.StatusInternalServerError)
		return
	}

	response := struct {
		AllGroups []d.Group `json:"allGroups"`
		GroupID   string    `json:"groupID"`
	}{
		AllGroups: allGroups,
		GroupID:   groupID,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}

func DeclineJoinRequestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	// get groupID & username from request body
	var request d.AcceptJoinRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	groupID := request.GroupID
	username := request.UserName
	// remove username from group joinRequests
	err = d.DeleteUserFromJoinRequest(groupID, username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to delete group", http.StatusInternalServerError)
		return
	}

	allGroups, err := d.GetAllGroups()
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to get groups", http.StatusInternalServerError)
		return
	}
	response := map[string]interface{}{
		"groupID":   groupID,
		"allGroups": allGroups,
		"message":   "user added to group successfully",
	}
	responseJSON, err := json.Marshal(response)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}
