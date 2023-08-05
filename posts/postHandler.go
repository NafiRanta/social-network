package posts

import (
	"encoding/json"
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

func AddPostHandler(w http.ResponseWriter, r *http.Request) {
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
	// Parse the request body to get the post information
	var post d.PostResponse
	err = json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// get userName from userID
	user, err := d.GetUserByID(userID)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to get user", http.StatusInternalServerError)
		return
	}
	post.UserName = user.UserName

	err = d.AddPost(&post)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, "Failed to add post", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
