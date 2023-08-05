package groupcomments

import (
	"encoding/json"
	"net/http"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

// add group comment
func AddGroupCommentPostHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		u.LogErrorString("Invalid request method")
		return
	}

	var groupComment d.GroupCommentResponse
	err := json.NewDecoder(r.Body).Decode(&groupComment)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// add group comment to database
	err = d.AddGroupComment(&groupComment)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add group comment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
