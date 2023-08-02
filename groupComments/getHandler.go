package groupcomments

import (
	"encoding/json"
	"net/http"
	d "socialnetwork/database"
)

// get group comments
func GetGroupCommentsHandler(w http.ResponseWriter, r *http.Request) {

	groupPostID := r.URL.Query().Get("groupPostID")
	if groupPostID == "" {
		http.Error(w, "Missing groupPostID", http.StatusBadRequest)
		return
	}
	// get group comments from database
	groupComments, err := d.GetGroupCommentsByGroupPostID(groupPostID)
	if err != nil {
		//fmt.Println("error from getGroupCommentsByGroupPostID:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Create a response object containing the group comments
	response := map[string]interface{}{
		"groupComments": groupComments,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		//fmt.Println("error from marshal response:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}
