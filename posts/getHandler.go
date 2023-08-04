package posts

import (
	"encoding/json"

	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
)
//not use
// func GetPostsHandler(w http.ResponseWriter, r *http.Request) {
// 	//fmt.Println("GetPostsHandler")
// 	authHeader := r.Header.Get("Authorization")
// 	if authHeader == "" {
// 		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
// 		return
// 	}
// 	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
// 	if err != nil {
// 		//fmt.Println("error from extractuserid:", err)
// 		http.Error(w, err.Error(), http.StatusUnauthorized)
// 		return
// 	}
// 	user, _ := d.GetUserByID(userID)
// 	fmt.Println("user:", user.UserName)

// 	//public posts
// 	publicPosts, _ := d.GetPublicPosts()
// 	fmt.Println("publicPosts:", publicPosts)
// 	//private posts by me
// 	privatePosts, _ := d.GetPrivatePosts(user.UserName)
// 	fmt.Println("privatePosts:", privatePosts)
// 	//custom posts with me included
// 	customPosts, _ := d.GetCustomPosts(user.UserName)
// 	fmt.Println("customPosts:", customPosts)

// 	// Create a response object containing the posts
// 	response := map[string]interface{}{
// 		"publicPosts":  publicPosts,
// 		"privatePosts": privatePosts,
// 		"customPosts":  customPosts,
// 	}

// 	// Convert the response to JSON
// 	responseJSON, err := json.Marshal(response)
// 	if err != nil {
// 		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
// 		return
// 	}

// 	// Set the Content-Type header to application/json
// 	w.Header().Set("Content-Type", "application/json")

// 	// Write the JSON response to the HTTP response writer
// 	w.Write(responseJSON)
// }

func GetPostsByUserNameHandler(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
		_, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil {
		//fmt.Println("error from extractuserid:", err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	username := r.URL.Query().Get("username")

	//public posts
	publicPosts, _ := d.GetPublicPostsByUserName(username)
	//private posts by me
	privatePosts, _ := d.GetPrivatePostsByUserName(username)
	//custom posts with me included
	customPosts, _ := d.GetCustomPostsByUserName(username)

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
}

func GetAllPublicPostsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetAllPublicPostsHandler")
	//public posts
	publicPosts, _ := d.GetPublicPosts()

	// Create a response object containing the posts
	// Convert the response to JSON
	responseJSON, err := json.Marshal(publicPosts)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")

	// Write the JSON response to the HTTP response writer
	w.Write(responseJSON)
}