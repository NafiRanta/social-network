package posts

import (
	"encoding/json"

	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

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

	publicPosts, _ := d.GetPublicPostsByUserName(username)
	privatePosts, _ := d.GetPrivatePostsByUserName(username)
	//custom posts with me included
	customPosts, _ := d.GetCustomPostsByUserName(username)

	// Create a response object containing the posts
	response := map[string]interface{}{
		"publicPosts":  publicPosts,
		"privatePosts": privatePosts,
		"customPosts":  customPosts,
	}

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
