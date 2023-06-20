package comments

import (
	"encoding/json"
	"fmt"
	"net/http"
	d "socialnetwork/database"
)

func GetCommentsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetCommentsHandler")
	// get postID from query
	postID := r.URL.Query().Get("postID")
	if postID == "" {
		fmt.Println("Missing postID")
		http.Error(w, "Missing postID", http.StatusBadRequest)
		return
	}
	// get comments from database
	comments, err := d.GetCommentsByPostID(postID)
	if err != nil {
		fmt.Println("error from getcommentsbyPostID:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Create a response object containing the comments
	response := map[string]interface{}{
		"comments": comments,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error from marshal response:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}
