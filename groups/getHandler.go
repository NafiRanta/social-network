package groups

import (
	"encoding/json"
	//"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
)

func GetGroupsHandler(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		//fmt.Println("error from authheader:")
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		//fmt.Println("error from extractuserid:", err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	user, err := d.GetUserByID(userID)
	if err != nil {
		//fmt.Println("error from extractuserid:", err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	username := user.UserName

	// get groups by username
	userAdminGroups, err := d.GetGroupsByAdminUsername(username)
	if err != nil {
		//fmt.Println("error getting groups useradmin")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// get groups user is a member of
	userMemberGroups, err := d.GetGroupsByMembersUsername(username)
	if err != nil {
		//fmt.Println("error getting groups userinvited")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// get all groups
	allGroups, err := d.GetAllGroups()
	if err != nil {
		//fmt.Println("error getting all groups")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"userAdminGroups":  userAdminGroups,
		"userMemberGroups": userMemberGroups,
		"allGroups":        allGroups,
	}

	// Convert the response to JSON
	responseJSON, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}

func GetSingleGroupHandler(w http.ResponseWriter, r *http.Request) {
	groupID := r.URL.Query().Get("groupID")
	if groupID == "" {
		http.Error(w, "Missing groupID", http.StatusBadRequest)
		return
	}

	group, err := d.GetGroupByID(groupID)
	if err != nil {
		//fmt.Println("error getting group")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"group": group,
	}

	// Convert the response to JSON
	responseJSON, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)

}

func GetAdminGroupInvitesHandler(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		//fmt.Println("error from authheader:")
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		//fmt.Println("error from extractuserid:", err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	user, err := d.GetUserByID(userID)
	if err != nil {
		//fmt.Println("error from extractuserid:", err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	username := user.UserName

	// get all groups where username is included in adminInvitedUsernames
	groups, err := d.GetGroupsByAdminInvitedUsername(username)
	if err != nil {
		//fmt.Println("error getting groups")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"groups": groups,
	}

	// Convert the response to JSON
	responseJSON, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}
