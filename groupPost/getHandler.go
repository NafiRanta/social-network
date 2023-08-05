package groupPost

import (
	"encoding/json"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

// get group posts
func GetMyGroupsPostsHandler(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		u.LogErrorString("Missing auth header")
		http.Error(w, "Missing auth header", http.StatusBadRequest)
		return
	}
	// get userID from token
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	// get user by userID
	user, err := d.GetUserByID(userID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	username := user.UserName

	allMyGroupsPosts, err := d.GetUserGroupsPosts(username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a response object containing the group posts
	response := map[string]interface{}{
		"allMyGroupsPosts": allMyGroupsPosts,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}

// get group posts by groupID
func GetGroupPostsByGroupIDHandler(w http.ResponseWriter, r *http.Request) {
	// get groupID from url
	groupID := r.URL.Query().Get("groupID")
	if groupID == "" {
		u.LogErrorString("error, no groupID")
		http.Error(w, "Missing groupID", http.StatusBadRequest)
		return
	}

	groupPosts, err := d.GetGroupPostsByGroupID(groupID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a response object containing the group posts
	response := map[string]interface{}{
		"groupPosts": groupPosts,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}
