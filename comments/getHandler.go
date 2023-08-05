package comments

import (
	"encoding/json"
	"net/http"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

func GetCommentsHandler(w http.ResponseWriter, r *http.Request) {

	postID := r.URL.Query().Get("postID")
	if postID == "" {
		u.LogErrorString("error, no postID")
		http.Error(w, "Missing postID", http.StatusBadRequest)
		return
	}
	// get comments from database
	comments, err := d.GetCommentsByPostID(postID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Create a response object containing the comments
	response := map[string]interface{}{
		"comments": comments,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}
