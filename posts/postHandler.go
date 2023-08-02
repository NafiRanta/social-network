package posts

import (
	"encoding/json"
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
)

func AddPostHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}

	// Extract the userID from the header
	authHeader := r.Header.Get("Authorization")
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		http.Error(w, "Invalid authorization header", http.StatusUnauthorized)
		return
	}
	//getuserName from UserID

	// Parse the request body to get the post information
	var post d.PostResponse
	err = json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		//fmt.Println("error from decode:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// get userName from userID
	user, err := d.GetUserByID(userID)
	if err != nil {
		//fmt.Println("error from getuserbyid:", err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	post.UserName = user.UserName

	// Add the post to the database
	err = d.AddPost(&post)
	if err != nil {
		//fmt.Println("error from addpost:", err)
		http.Error(w, "Failed to add post", http.StatusInternalServerError)
		return
	}

	// Return a success response
	w.WriteHeader(http.StatusCreated)
}
