package groupcomments

import (
	"encoding/json"
	"fmt"
	"net/http"
	d "socialnetwork/database"
)

// add group comment
func AddGroupCommentPostHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("AddGroupCommentPostHandler")
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Println("Method not allowed")
		return
	}

	var groupComment d.GroupCommentResponse
	err := json.NewDecoder(r.Body).Decode(&groupComment)
	if err != nil {
		fmt.Println("error from decode:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// add group comment to database
	err = d.AddGroupComment(&groupComment)
	if err != nil {
		fmt.Println("error from addgroupcomment:", err)
		http.Error(w, "Failed to add group comment", http.StatusInternalServerError)
		return
	}

	// Return a success response
	w.WriteHeader(http.StatusCreated)
	fmt.Println("Group comment added successfully")

}
