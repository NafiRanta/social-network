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
	fmt.Println("get messages handler")
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
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil && userID == "" {
		fmt.Println("Invalid token")
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	// get message by userID¨
	messages, err := d.GetMessagesByUserID(userID)
	if err != nil {
		fmt.Println("Error getting messages")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// mark messages as seen
	err = d.MarkMessagesByUserIDAsSeen(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Create a response object containing the messages
	response := map[string]interface{}{
		"messages": messages,
	}
	// return messages
	responseJSON, err := json.Marshal(response)
	if err != nil {
		fmt.Println("Error encoding messages")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")

	// Write the JSON response to the HTTP response writer
	w.Write(responseJSON)
	fmt.Println("messages returned")
}
