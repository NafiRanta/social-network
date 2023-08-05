package groupPost

import (
	"encoding/json"
	"net/http"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

func AddGroupPostHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		u.LogErrorString("Invalid request method")
		return
	}

	var groupPost d.GroupPostResponse
	err := json.NewDecoder(r.Body).Decode(&groupPost)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = d.AddGroupPost(&groupPost)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add groupPost", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
