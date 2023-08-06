package posts

import (
	"encoding/json"
	"fmt"

	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

// Returns all posts that the user is allowed to see
func GetPostsByUserNameHandler(w http.ResponseWriter, r *http.Request) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
	_, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	username := r.URL.Query().Get("username")

	// public posts
	ownPosts, err := d.GetPostsByUserName(username)
	if err != nil {
		fmt.Println("error from getPostsByUserName:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// private posts by people I follow
	privatePosts, err := d.GetPrivatePostsByUserName(username)
	if err != nil {
		fmt.Println("error from getPrivatePostsByUserName:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// custom posts with me included
	customPosts, err := d.GetCustomPostsByUserName(username)
	if err != nil {
		fmt.Println("error from getCustomPostsByUserName:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a response object containing the posts i am allowed to see
	response := map[string]interface{}{
		"ownPosts":     ownPosts,
		"privatePosts": privatePosts,
		"customPosts":  customPosts,
	}
	fmt.Println("response:", response)

	responseJSON, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}

func GetAllPublicPostsHandler(w http.ResponseWriter, r *http.Request) {
	publicPosts, _ := d.GetPublicPosts()
	responseJSON, err := json.Marshal(publicPosts)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	w.Write(responseJSON)
}
