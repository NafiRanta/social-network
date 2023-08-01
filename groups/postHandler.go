package groups

import (
	"encoding/json"
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
)

func CreateGroupHandler(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("AddGroupHandler")
	// Check if the request method is POST
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

	// Parse the request body to get the post information
	var group d.GroupResponse
	err = json.NewDecoder(r.Body).Decode(&group)
	if err != nil {
		//fmt.Println("error from decode:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	//fmt.Println("group:", group)
	user, err := d.GetUserByID(userID)
	if err != nil {
		//fmt.Println("error from getuserbyid:", err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	group.AdminID = user.UserName
	err = d.AddGroup(&group)
	if err != nil {
		//fmt.Println("error from addgroup:", err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}

	allGroups, err := d.GetAllGroups()
	if err != nil {
		//fmt.Println("error getting all groups")
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
		//fmt.Println("error from json.Marshal:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the response headers and write the JSON data
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(jsonData)
	//fmt.Println("Group added successfully")
}

// add user to group memberUsernames
func AddUserToGroupHandler(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("AddUserToGroupHandler")
	// Check if the request method is POST
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
		//fmt.Println("error from getuserbyid:", err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	username := user.UserName
	// find username in group adminInvitedUsernames and delete it
	err = d.DeleteUserFromAdminInvite(groupID, username)
	if err != nil {
		//fmt.Println("error from delete:", err)
		http.Error(w, "Failed to delete group", http.StatusInternalServerError)
		return
	}
	// add username to group memberUsernames
	err = d.AddUserToGroup(groupID, username)
	if err != nil {
		//fmt.Println("error from addgroup:", err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}

	allGroups, err := d.GetAllGroups()
	if err != nil {
		//fmt.Println("error getting group")
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
		//fmt.Println("error from json.Marshal:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the response headers and write the JSON data
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(jsonData)
	//fmt.Println("user added to group successfully")
}

// add users to group MemberInvitedUsernames
func AddUsersToMemberInvited(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("AddUsersToMemberInvited")
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		//fmt.Println("error from authheader:")
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		//fmt.Println("error from extractuserid:", err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	user, err := d.GetUserByID(userID)
	if err != nil {
		//fmt.Println("error from extractuserid:", err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	username := user.UserName

	groupID := r.URL.Query().Get("groupID")

	// get response from the r.body
	var response d.InvitesByMemberResponse
	err = json.NewDecoder(r.Body).Decode(&response)
	if err != nil {
		//fmt.Println("error from decode:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	//fmt.Println("response:", response)
	// get invitedUsernames from response
	invitedUsernames := response.InvitedUsernames
	// Convert the response to JSON
	//fmt.Println("invitedUsernames:", invitedUsernames)

	allGroups, err := d.GetAllGroups()
	if err != nil {
		//fmt.Println("error getting group")
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
		//fmt.Println("error from json.Marshal:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}
	//fmt.Println("responseJSON:", responseJSON)

	err = d.AddUserToMemberInvite(groupID, username, invitedUsernames)
	if err != nil {
		//fmt.Println("error from addgroup:", err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}
	// Set the Content-Type header to application/json
	// 200
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")

	w.Write(responseJSON)

	//fmt.Println("users added to group successfully")
}

func DeclineGroupInviteHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("DeclineGroupInviteHandler")
	// Check if the request method is POST
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
		//fmt.Println("error from getuserbyid:", err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	username := user.UserName
	// find username in group adminInvitedUsernames and delete it
	err = d.DeleteUserFromAdminInvite(groupID, username)
	if err != nil {
		//fmt.Println("error from delete:", err)
		http.Error(w, "Failed to delete group", http.StatusInternalServerError)
		return
	}
	// get all groups
	allGroups, err := d.GetAllGroups()
	if err != nil {
		//fmt.Println("error from getgroups:", err)
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
		//fmt.Println("error from json.Marshal:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
	fmt.Println("users added to group successfully")
}

func JoinRequestHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("JoinRequestHandler")
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}

	// Extract the userID from the header
	authHeader := r.Header.Get("Authorization")
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		fmt.Println("error from extractuserid:", err)
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
		fmt.Println("error from getuserbyid:", err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	username := user.UserName

	err = d.AddUserToJoinRequest(groupID, username)
	if err != nil {
		fmt.Println("error from addgroup:", err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}

	// remove user from AdminInvitedUsernames
	err = d.DeleteUserFromAdminInvite(groupID, username)
	if err != nil {
		fmt.Println("error from delete 1:", err)
		http.Error(w, "Failed to delete group", http.StatusInternalServerError)
		return
	}

	// remove user from memberInvitedUsernames
	err = d.DeleteUserFromMemberInvite(groupID, username)
	if err != nil {
		fmt.Println("error from delete 2:", err)
		http.Error(w, "Failed to delete group", http.StatusInternalServerError)
		return
	}

	// get all groups
	allGroups, err := d.GetAllGroups()
	if err != nil {
		//fmt.Println("error from getgroups:", err)
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
		//fmt.Println("error from json.Marshal:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
	fmt.Println("users added to group successfully")

}

func AcceptJoinRequestHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("AcceptJoinRequestHandler")
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	// get groupID & username from request body
	var request d.AcceptJoinRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		fmt.Println("error from decode:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	groupID := request.GroupID
	username := request.UserName
	// add username to group memberUsernames
	err = d.AddUserToGroup(groupID, username)
	if err != nil {
		fmt.Println("error from addgroup:", err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}

	allGroups, err := d.GetAllGroups()
	if err != nil {
		//fmt.Println("error from getgroups:", err)
		http.Error(w, "Failed to get groups", http.StatusInternalServerError)
		return
	}

	// write response
	response := struct {
		AllGroups []d.Group `json:"allGroups"`
		GroupID   string    `json:"groupID"`
	}{
		AllGroups: allGroups,
		GroupID:   groupID,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error from json.Marshal:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
	fmt.Println("users added to group successfully")
}

func DeclineJoinRequestHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("DeclineJoinRequestHandler")
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	// get groupID & username from request body
	var request d.AcceptJoinRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		fmt.Println("error from decode:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	groupID := request.GroupID
	username := request.UserName
	// remove username from group joinRequests
	err = d.DeleteUserFromJoinRequest(groupID, username)
	if err != nil {
		fmt.Println("error from delete:", err)
		http.Error(w, "Failed to delete group", http.StatusInternalServerError)
		return
	}

	allGroups, err := d.GetAllGroups()
	if err != nil {
		//fmt.Println("error from getgroups:", err)
		http.Error(w, "Failed to get groups", http.StatusInternalServerError)
		return
	}
	// write response
	response := map[string]interface{}{
		"groupID":   groupID,
		"allGroups": allGroups,
		"message":   "user added to group successfully",
	}
	responseJSON, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error from json.Marshal:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
	fmt.Println("users added to group successfully")
}
