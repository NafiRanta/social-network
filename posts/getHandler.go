package posts

import (
	"encoding/json"
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
)

func GetPostsHandler(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	fmt.Println(userID)

	//public posts
	publicPosts, err := d.GetPublicPosts()
	fmt.Println(publicPosts)
	//private posts by me
	privatePosts, err := d.GetPrivatePosts(userID)
	fmt.Println(privatePosts)
	//custom posts with me included
	// customPosts, err := d.GetCustomPosts(userID)
	// fmt.Println(customPosts)

	// Create a response object containing the posts
	response := map[string]interface{}{
		"publicPosts":  publicPosts,
		"privatePosts": privatePosts,
	}

	// Convert the response to JSON
	responseJSON, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")

	// Write the JSON response to the HTTP response writer
	w.Write(responseJSON)
}
