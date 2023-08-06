package posts

import (
	"encoding/json"

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
	publicPosts, err := d.GetPublicPostsByUserName(username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// private posts by people I follow
	privatePosts, err := d.GetPrivatePostsByUserName(username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// custom posts with me included
	customPosts, err := d.GetCustomPostsByUserName(username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a response object containing the posts i am allowed to see
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

// GetAllMyPostsHandler gets all posts that user is allowed to see including public, private made by people who user follow, custom where user is included in the list
func GetAllMyPostsHandler(w http.ResponseWriter, r *http.Request) {
	// check if method is get
	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}
	// get user id from token in authorization header
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	// get username from user id
	user, err := d.GetUserByID(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// get all my posts
	posts, err := d.GetAllMyPosts(user.UserName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// return posts
	responseJSON, err := json.Marshal(posts)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
}
