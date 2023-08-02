package messages

import (
	"encoding/json"
	//"fmt"
	"net/http"
	d "socialnetwork/database"
)

// getMessagesHandler handles the get messages request
func AddMessagesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	var message d.MessageResponse
	// Decode the request body into the variable message
	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	// Add the message to the database
	err = d.AddMessage(&message)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
