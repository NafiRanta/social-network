package groupevents

import (
	"encoding/json"
	"fmt"
	"net/http"
	d "socialnetwork/database"
)

//add group event

func AddGroupEventHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("AddGroupEventHandler")
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Println("Method not allowed")
		return
	}

	var groupEvent d.GroupEventResponse
	err := json.NewDecoder(r.Body).Decode(&groupEvent)
	if err != nil {
		fmt.Println("error from decode:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = d.AddGroupEvent(&groupEvent)
	if err != nil {
		fmt.Println("error from addgroupEvent:", err)
		http.Error(w, "Failed to add groupEvent", http.StatusInternalServerError)
		return
	}

	// Return a success response
	w.WriteHeader(http.StatusCreated)
	fmt.Println("GroupEvent added successfully")
}
