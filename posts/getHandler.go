package posts

import (
	"encoding/json"
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
)

func GetPostsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetPostsHandler")
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		fmt.Println("error from extractuserid:", err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	//public posts
	publicPosts, _ := d.GetPublicPosts()
	//private posts by me
	privatePosts, _ := d.GetPrivatePosts(userID)
	//custom posts with me included
	customPosts, _ := d.GetCustomPosts(userID)

	// Create a response object containing the posts
	response := map[string]interface{}{
		"publicPosts":  publicPosts,
		"privatePosts": privatePosts,
		"customPosts":  customPosts,
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
	fmt.Println("post retrieved successfully")
}
