package comments

import (
	"encoding/json"
	//"fmt"
	"net/http"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

func AddCommentHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		u.LogErrorString("Invalid request method")
		return
	}

	var comment d.CommentResponse
	err := json.NewDecoder(r.Body).Decode(&comment)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = d.AddComment(&comment)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add comment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
