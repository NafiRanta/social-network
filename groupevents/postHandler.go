package groupevents

import (
	"encoding/json"
	"fmt"
	"net/http"
	d "socialnetwork/database"
)

type eventReqResponse struct {
	GroupEventID    string `json:"groupEventID"`
	EventName       string `json:"eventName"`
	UserName        string `json:"userName"`
}

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
		//fmt.Println("error from decode:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = d.AddGroupEvent(&groupEvent)
	if err != nil {
		//fmt.Println("error from addgroupEvent:", err)
		http.Error(w, "Failed to add groupEvent", http.StatusInternalServerError)
		return
	}

	// Return a success response
	w.WriteHeader(http.StatusCreated)
	fmt.Println("GroupEvent added successfully")
}

func AcceptGoingEventHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
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
		fmt.Println(err)
		http.Error(w, "Failed to add going user", http.StatusInternalServerError)
		return
	}

	// Send a response indicating success
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Successfully added going user"))
}

func DeclineGoingHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
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
		fmt.Println(err)
		http.Error(w, "Failed to add not going user", http.StatusInternalServerError)
		return
	}

	// Send a response indicating success
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Successfully added not going user"))
}
