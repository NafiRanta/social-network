package groups

import (
	"encoding/json"
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
)

func CreateGroupHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("AddGroupHandler")
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
		fmt.Println("error from decode:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	fmt.Println("group:", group)
	user, err := d.GetUserByID(userID)
	if err != nil {
		fmt.Println("error from getuserbyid:", err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	group.Admin = user.UserName
	err = d.AddGroup(&group)
	if err != nil {
		fmt.Println("error from addgroup:", err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}

	// Create a response object
	response := struct {
		GroupID string `json:"groupID"`
	}{
		GroupID: group.GroupID,
	}

	// Convert the response object to JSON
	jsonData, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error from json.Marshal:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the response headers and write the JSON data
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(jsonData)
	fmt.Println("Group added successfully")
}

// add user to group memberUsernames
func AddUserToGroupHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("AddUserToGroupHandler")
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
		fmt.Println("error from getuserbyid:", err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	username := user.UserName
	err = d.AddUserToGroup(groupID, username)
	if err != nil {
		fmt.Println("error from addgroup:", err)
		http.Error(w, "Failed to add group", http.StatusInternalServerError)
		return
	}

	group, err := d.GetGroupByID(groupID)
	if err != nil {
		fmt.Println("error getting group")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Create a response object
	response := map[string]interface{}{
		"group": group,
	}

	// Convert the response object to JSON
	jsonData, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error from json.Marshal:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the response headers and write the JSON data
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(jsonData)
	fmt.Println("user added to group successfully")
}
