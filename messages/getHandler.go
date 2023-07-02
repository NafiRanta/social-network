package messages

import (
	"encoding/json"
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
)

// getMessagesHandler handles the get messages request
func GetMessagesHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodGet {
		fmt.Println("method not allowed")
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		fmt.Println("Missing Authorization header")
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
	// get userID
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil && userID == "" {
		fmt.Println("Invalid token")
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	username := r.URL.Query().Get("username")
	// get userEmail by email
	user, err := d.GetUserByUsername(username)
	if err != nil {
		fmt.Println("Error getting usrename")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// get message by userEmail
	messages, err := d.GetMessagesByUserID(user.UserID)
	if err != nil {
		fmt.Println("Error getting messages")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// mark messages as seen
	err = d.MarkMessagesByUsernameAsSeen(user.UserName)
	if err != nil {
		fmt.Println("error marking messages as seen")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// return messages
	responseJSON, err := json.Marshal(messages)
	if err != nil {
		fmt.Println("error encoding messages")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")

	// Write the JSON response to the HTTP response writer
	w.Write(responseJSON)
	//fmt.Println("messages returned")
}
