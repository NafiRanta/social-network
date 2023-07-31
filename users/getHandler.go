package users

import (
	"encoding/json"
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	publicUsers, err := d.GetAllPublicUsers()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error retrieving public user data: %v", err)
		return
	}

	privateUsers, err := d.GetAllPrivateUsers()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error retrieving private user data: %v", err)
		return
	}

	// Combine public and private users
	allUsers := append(publicUsers, privateUsers...)

	// Create a slice of UserResponse with the desired fields
	response := make([]a.UserProfile, len(allUsers))
	for i, user := range allUsers {
		response[i] = a.UserProfile{
			FirstName:         user.FirstName,
			LastName:          user.LastName,
			UserName:          user.UserName,
			Privacy:           user.Privacy,
			Avatar:            user.Avatar,
			FollowerUsernames: user.FollowerUsernames,
		}
	}

	// Encode the response slice to JSON
	jsonData, err := json.Marshal(response)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error encoding JSON: %v", err)
		return
	}

	// Set the Content-Type header and write the JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}

func GetUserByUsernameHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
	userID, err := a.ExtractUserIDFromAuthHeader(authHeader)
	if err != nil && userID == "" {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}
	// Get the email parameter from the query string
	username := r.URL.Query().Get("senderUsername")
	if username == "" {
		http.Error(w, "Missing email parameter", http.StatusBadRequest)
		return
	}
	// Get the user by email from the database
	user, err := d.GetUserByUsername(username)
	if err != nil {
		http.Error(w, "Error retrieving user", http.StatusInternalServerError)
		return
	}

	// Check if the user was found
	if user == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}
	// Create a UserResponse instance with the desired fields
	//change dob format
	userResponse := a.UserResponse{
		FirstName:                 user.FirstName,
		LastName:                  user.LastName,
		Email:                     user.Email,
		Privacy:                   user.Privacy,
		DateOfBirth:               user.DateOfBirth,
		Gender:                    user.Gender,
		Avatar:                    user.Avatar,
		Nickname:                  user.Nickname,
		AboutMe:                   user.AboutMe,
		UserName:                  user.UserName,
		FollowerUsernames:         user.FollowerUsernames,
		FollowingUsernames:        user.FollowingUsernames,
		FollowingUsernamesSent:     user.FollowingUsernamesSent,
		FollowerUsernamesReceived: user.FollowerUsernamesReceived,
	}
	userJSON, err := json.Marshal(userResponse)
	if err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}
	// Set the Content-Type header and write the JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(userJSON)
}
