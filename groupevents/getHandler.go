package groupevents

import (
	"encoding/json"
	//"fmt"
	"net/http"
	d "socialnetwork/database"
)

func GetGroupEventsHandler(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("GetGroupEventHandler")
	// Check if the request method is POST
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		//fmt.Println("Method not allowed")
		return
	}
	// get groupEventID from url
	groupID := r.URL.Query().Get("groupID")
	//fmt.Println("groupEventID:", groupID)
	//get groupEvent
	groupEvent, err := d.GetGroupEvents(groupID)
	if err != nil {
		//fmt.Println("error from getgroupEvent:", err)
		http.Error(w, "Failed to get groupEvent", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"groupEvent": groupEvent,
	}

	// Marshal the groupEvent into JSON
	responseJSON, err := json.Marshal(response)
	if err != nil {
		//fmt.Println("error from marshal:", err)
		http.Error(w, "Failed to marshal groupEvent", http.StatusInternalServerError)
		return
	}

	// Write content-type, statuscode, payload
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseJSON)
	//fmt.Println("GroupEvent got successfully")
}


// func GetSingleGroupEventHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != "POST" {
// 		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	var groupEvent d.GroupEventResponse
// 	err := json.NewDecoder(r.Body).Decode(&groupEvent)
// 	if err != nil {
// 		http.Error(w, "Invalid request data", http.StatusBadRequest)
// 		return
// 	}

// 	// Call the getGroupEventByID function to fetch the group event from the database
// 	groupEventDetails, err := d.GetGroupEventByID(&groupEvent)
// 	if err != nil {
// 		// Handle the error, e.g., return a specific error message or appropriate status code
// 		http.Error(w, "Failed to fetch group event details", http.StatusInternalServerError)
// 		return
// 	}

// 	// Return the group event details as a JSON response
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(groupEventDetails)
// }
