package groupevents

import (
	"encoding/json"
	"fmt"
	"net/http"
	d "socialnetwork/database"
)

func GetGroupEventHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetGroupEventHandler")
	// Check if the request method is POST
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Println("Method not allowed")
		return
	}
	// get groupEventID from url
	groupID := r.URL.Query().Get("groupID")
	fmt.Println("groupEventID:", groupID)
	//get groupEvent
	groupEvent, err := d.GetGroupEvent(groupID)
	if err != nil {
		fmt.Println("error from getgroupEvent:", err)
		http.Error(w, "Failed to get groupEvent", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"groupEvent": groupEvent,
	}

	// Marshal the groupEvent into JSON
	responseJSON, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error from marshal:", err)
		http.Error(w, "Failed to marshal groupEvent", http.StatusInternalServerError)
		return
	}

	// Write content-type, statuscode, payload
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseJSON)
	fmt.Println("GroupEvent got successfully")
}
