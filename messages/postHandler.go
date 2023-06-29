package messages

import (
	"encoding/json"
	"fmt"
	"net/http"
	d "socialnetwork/database"
)

// getMessagesHandler handles the get messages request
func AddMessagesHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request is a POST request
	if r.Method != http.MethodPost {
		// If not, return a 405 status code and return
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	var message d.MessageResponse
	// Decode the request body into the variable message
	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		// If there was an error decoding the request body, return a 400 status code
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	// Add the message to the database
	err = d.AddMessage(&message)
	if err != nil {
		// If there was an error adding the message, return a 500 status code
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	// Return a 200 status code
	w.WriteHeader(http.StatusOK)
	fmt.Println("message added")
}
