package groups

import (
	"encoding/json"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

func GetGroupsHandler(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		u.LogErrorString("Missing auth header")
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	user, err := d.GetUserByID(userID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	username := user.UserName

	userAdminGroups, err := d.GetGroupsByAdminUsername(username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// get groups user is a member of
	userMemberGroups, err := d.GetGroupsByMembersUsername(username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	allGroups, err := d.GetAllGroups()
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"userAdminGroups":  userAdminGroups,
		"userMemberGroups": userMemberGroups,
		"allGroups":        allGroups,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

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
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"group": group,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)

}

func GetAdminGroupInvitesHandler(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		u.LogErrorString("Missing auth header")
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	user, err := d.GetUserByID(userID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	username := user.UserName

	// get all groups where username is included in adminInvitedUsernames
	groups, err := d.GetGroupsByAdminInvitedUsername(username)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"groups": groups,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}
