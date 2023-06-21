package users

import (
	"encoding/json"
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
)

func ChangePrivacyofUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprint(w, "Method not allowed")
		return
	}
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}
	userID, _ := a.ExtractUserIDFromAuthHeader(authHeader)
	user, err := d.GetUserByID(userID)
	if err != nil {
		http.Error(w, "Error retrieving user", http.StatusInternalServerError)
		return
	}
	// Toggle the privacy from public to private or vice versa
	if user.Privacy == "public" {
		user.Privacy = "private"
	} else {
		user.Privacy = "public"
	}
	// Update the user's privacy in the database
	err = d.UpdateUserPrivacy(user)
	if err != nil {
		http.Error(w, "Error updating user privacy", http.StatusInternalServerError)
		return
	}
	updatedUser, _ := d.GetUserByID(userID)
	jsonData, _ := json.Marshal(updatedUser)
	// Respond with success message
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)

}

// change nickname, bio, dob
func UpdateBioOfUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("update bio of user")
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	// get userID from authHeader, which is an object
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	userID, _ := a.ExtractUserIDFromAuthHeader(authHeader)
	user, err := d.GetUserByID(userID)
	if err != nil {
		fmt.Println("error in getUserByID", err)
		http.Error(w, "Error retrieving user", http.StatusInternalServerError)
		return
	}
	fmt.Println("userID", userID)
	// Parse the request body
	var requestBody struct {
		Nickname string `json:"nickname"`
		AboutMe  string `json:"about"`
		DOB      string `json:"dob"`
		Gender   string `json:"gender"`
	}

	err = json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Update the user fields if new values are provided
	if requestBody.DOB == "" {
		user.DateOfBirth = requestBody.DOB
	}
	if requestBody.Gender != "" {
		user.Gender = requestBody.Gender
	}
	if requestBody.Nickname != "" {
		user.Nickname = requestBody.Nickname
	}
	if requestBody.AboutMe != "" {
		user.AboutMe = requestBody.AboutMe
	}

	// Update the user in the database
	err = d.UpdateUserInfo(user)
	if err != nil {
		fmt.Println("error in updateUserINfo", err)
		http.Error(w, "Error updating user", http.StatusInternalServerError)
		return
	}
	updatedUser, _ := d.GetUserByID(userID)
	jsonData, _ := json.Marshal(updatedUser)
	// Respond with success message
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
	// Send a success response
	fmt.Println("User bio updated successfully")

}

// change avatar
func ChangeAvatarofUser(w http.ResponseWriter, r *http.Request) {}
