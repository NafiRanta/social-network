package groupevents

import (
	"encoding/json"
	"fmt"
	"strings"

	//"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
	u "socialnetwork/utils"
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

// returns a slice of groupIDs for all groups that has events that user has not responded to
func GetEventNotificationsHandler(w http.ResponseWriter, r *http.Request) {
	var groupIDEventNotifications []string
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Println("Method not allowed")
		return
	}
	// check authorization header token
	fmt.Println("GetEventNotificationsHandler")
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		//fmt.Println("Missing auth header")
		http.Error(w, "Missing auth header", http.StatusBadRequest)
		return
	}
	// get userID from token
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		//fmt.Println("error from getUserIDFromToken:", err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	// get user by userID
	user, err := d.GetUserByID(userID)
	if err != nil {
		//fmt.Println("error from getUserByUserID:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	username := user.UserName
	// get all groups where user is a member
	// get groups user is a member of
	userMemberGroups, err := d.GetGroupsByMembersUsername(username)
	if err != nil {
		//fmt.Println("error getting groups userinvited")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// get all groupEvents for groups user is a member of
	// loop through userMemberGroups
	for _, group := range userMemberGroups {
		// get groupEvents for group
		groupEvents, err := d.GetGroupEvents(group.GroupID)
		if err != nil {
			//fmt.Println("error getting groupEvents")
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		// loop through groupEvents
		for _, groupEvent := range groupEvents {
			var notGoingUsers []string
			var goingUsers []string
			// split notGoingUsers by comma for groupEvent to array
			if groupEvent.NotGoingUsers != "" {
				notGoingUsers = strings.Split(groupEvent.NotGoingUsers, ",")
			}
			// split goingUsers by comma for groupEvent to array
			if groupEvent.GoingUsers != "" {
				goingUsers = strings.Split(groupEvent.GoingUsers, ",")
			}

			// if user is not included in groupEvent.NotGoingUsers or groupEvent.GoingUsers
			if !(u.Contains(notGoingUsers, username) || u.Contains(goingUsers, username)) {
				// append groupEvent to groupEventNotifications
				groupIDEventNotifications = append(groupIDEventNotifications, groupEvent.GroupID)
			}
		}
	}
	// return groupEventNotifications
	response := map[string]interface{}{
		"groupIDEventNotifications": groupIDEventNotifications,
	}
	// Marshal the groupEventNotifications into JSON
	responseJSON, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error from marshal:", err)
		http.Error(w, "Failed to marshal groupEventNotifications", http.StatusInternalServerError)
		return
	}
	// Write content-type, statuscode, payload
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseJSON)
	fmt.Println("GroupEventNotifications got successfully")
}
