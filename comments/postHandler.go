package comments

import (
	"encoding/json"
	//"fmt"
	"net/http"
	d "socialnetwork/database"
)

func AddCommentHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		//fmt.Println("Method not allowed")
		return
	}

	var comment d.CommentResponse
	err := json.NewDecoder(r.Body).Decode(&comment)
	if err != nil {
		//fmt.Println("error from decode:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = d.AddComment(&comment)
	if err != nil {
		//fmt.Println("error from addcomment:", err)
		http.Error(w, "Failed to add comment", http.StatusInternalServerError)
		return
	}

	// Return a success response
	w.WriteHeader(http.StatusCreated)
	//fmt.Println("Comment added successfully")
}
