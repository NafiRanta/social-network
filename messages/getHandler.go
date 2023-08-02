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
		//fmt.Println("method not allowed")
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		//fmt.Println("Missing Authorization header")
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
	// get userID
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil && userID == "" {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	// url.QueryUnescape to get username
	username := r.URL.Query().Get("username")
	username, err = url.QueryUnescape(username)
	if err != nil {
		fmt.Println("Error decoding username:", err)
		return
	}
	// get userEmail by email
	user, err := d.GetUserByUsername(username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// get message by userID
	messages, err := d.GetMessagesByUserID(user.UserID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// mark messages as seen
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
		//fmt.Println("method not allowed")
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		//fmt.Println("Missing Authorization header")
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
