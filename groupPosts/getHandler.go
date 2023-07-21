package groupposts

import (
	"encoding/json"
	//"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
)

// get group posts
func GetMyGroupsPostsHandler(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("GetGroupPostsHandler")
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		//fmt.Println("Missing auth header")
		http.Error(w, "Missing auth header", http.StatusBadRequest)
		return
	}
	// get userID from token
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		//fmt.Println("error from getUserIDFromToken:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// get user by userID
	user, err := d.GetUserByID(userID)
	if err != nil {
		//fmt.Println("error from getUserByUserID:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	username := user.UserName

	allMyGroupsPosts, err := d.GetUserGroupsPosts(username)
	if err != nil {
		//fmt.Println("error from getGroupPostsByUsername:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a response object containing the group posts
	response := map[string]interface{}{
		"allMyGroupsPosts": allMyGroupsPosts,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		//fmt.Println("error from marshal response:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}

// get group posts by groupID
func GetGroupPostsByGroupIDHandler(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("GetGroupPostsByGroupIDHandler")

	// get groupID from url
	groupID := r.URL.Query().Get("groupID")
	if groupID == "" {
		//fmt.Println("Missing groupID")
		http.Error(w, "Missing groupID", http.StatusBadRequest)
		return
	}

	groupPosts, err := d.GetGroupPostsByGroupID(groupID)
	if err != nil {
		//fmt.Println("error from getGroupPostsByGroupID:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a response object containing the group posts
	response := map[string]interface{}{
		"groupPosts": groupPosts,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		//fmt.Println("error from marshal response:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}
