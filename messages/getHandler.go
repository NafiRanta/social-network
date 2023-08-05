package messages

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

// getMessagesHandler handles the get messages request
func GetMessagesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		u.LogErrorString("Invalid request method")
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		u.LogErrorString("Missing Authorization header")
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil && userID == "" {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	username := r.URL.Query().Get("username")
	username, err = url.QueryUnescape(username)
	if err != nil {
		u.CheckErr(err)
		return
	}
	user, err := d.GetUserByUsername(username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	messages, err := d.GetMessagesByUserID(user.UserID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = d.MarkMessagesByUsernameAsSeen(user.UserName)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// return messages
	responseJSON, err := json.Marshal(messages)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}

func GetMessagesByGroupIDHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		u.LogErrorString("Invalid request method")
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		u.LogErrorString("Missing Authorization header")
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
	groupID := r.URL.Query().Get("groupID")
	messages, err := d.GetMessagesByGroupID(groupID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// mark messages as seen
	err = d.MarkMessagesByGroupIDAsSeen(groupID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// return messages
	responseJSON, err := json.Marshal(messages)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}
