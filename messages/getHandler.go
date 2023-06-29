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
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil && userID == "" {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	// get message by userID¨
	messages, err := d.GetMessagesByUserID(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// mark messages as seen
	err = d.MarkMessagesByUserIDAsSeen(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// return messages
	err = json.NewEncoder(w).Encode(messages)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Return a 200 status code
	w.WriteHeader(http.StatusOK)
	fmt.Println("messages returned")
}
