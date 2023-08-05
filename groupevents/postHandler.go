package groupevents

import (
	"encoding/json"
	"net/http"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

type eventReqResponse struct {
	GroupEventID string `json:"groupEventID"`
	EventName    string `json:"eventName"`
	UserName     string `json:"userName"`
}

func AddGroupEventHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		u.LogErrorString("Invalid request method")
		return
	}

	var groupEvent d.GroupEventResponse
	err := json.NewDecoder(r.Body).Decode(&groupEvent)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = d.AddGroupEvent(&groupEvent)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add groupEvent", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func AcceptGoingEventHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Decode the request body into eventReqResponse struct
	var eventReqResponse *eventReqResponse
	err := json.NewDecoder(r.Body).Decode(&eventReqResponse)
	if err != nil {
		http.Error(w, "Invalid request data", http.StatusBadRequest)
		return
	}

	// Get the group event by its GroupEventID
	groupEvent, err := d.GetGroupEventByID(eventReqResponse.GroupEventID)
	if err != nil {
		http.Error(w, "Group event not found", http.StatusNotFound)
		return
	}

	// Call the AddGoingUsers function to add the username to the GoingUsers field
	err = d.AddGoingUsers(&groupEvent, eventReqResponse.UserName)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add going user", http.StatusInternalServerError)
		return
	}

	// Send a response indicating success
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Successfully added going user"))
}

func DeclineGoingHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Decode the request body into eventReqResponse struct
	var eventReqResponse *eventReqResponse
	err := json.NewDecoder(r.Body).Decode(&eventReqResponse)
	if err != nil {
		http.Error(w, "Invalid request data", http.StatusBadRequest)
		return
	}

	// Get the group event by its GroupEventID
	groupEvent, err := d.GetGroupEventByID(eventReqResponse.GroupEventID)
	if err != nil {
		http.Error(w, "Group event not found", http.StatusNotFound)
		return
	}

	// Call the AddNotGoingUsers function to add the username to the NotGoingUsers field
	err = d.AddNotGoingUsers(&groupEvent, eventReqResponse.UserName)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add not going user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Successfully added not going user"))
}
