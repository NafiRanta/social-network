package groupcomments

import (
	"encoding/json"
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
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

	// get userID from token
	userID, err := a.ExtractUserIDFromAuthHeader(r.Header.Get("Authorization"))
	if err != nil {
		fmt.Println("error from getUserIDFromToken:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// get user by userID
	user, err := d.GetUserByID(userID)
	if err != nil {
		fmt.Println("error from getUserByUserID:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	groupComment.UserName = user.UserName

	err = d.AddGroupComment(&groupComment)
	if err != nil {
		fmt.Println("error from addgroupComment:", err)
		http.Error(w, "Failed to add groupComment", http.StatusInternalServerError)
		return
	}

	// Return a success response
	w.WriteHeader(http.StatusCreated)
	fmt.Println("GroupComment added successfully")
}
