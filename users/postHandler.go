package users

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
	u "socialnetwork/utils"
	"strings"
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
		//fmt.Println("error in getUserByID", err)
		http.Error(w, "Error retrieving user", http.StatusInternalServerError)
		return
	}
	// Parse the request body
	var requestBody struct {
		Nickname    string `json:"nickname"`
		AboutMe     string `json:"about"`
		DateOfBirth string `json:"dateOfBirth"`
		Gender      string `json:"gender"`
	}

	err = json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Update the user fields if new values are provided
	if requestBody.DateOfBirth == "" {
		user.DateOfBirth = requestBody.DateOfBirth
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
		//fmt.Println("error in updateUserINfo", err)
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
}

// change avatar
func UpdateAvatarOfUser(w http.ResponseWriter, r *http.Request) {
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
		//fmt.Println("error in getUserByID", err)
		http.Error(w, "Error retrieving user", http.StatusInternalServerError)
		return
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Create a new buffer with the request body content
	buffer := bytes.NewBuffer(body)
	// Parse the request body
	var requestBody struct {
		Avatar string `json:"avatar"`
	}
	err = json.NewDecoder(buffer).Decode(&requestBody)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if requestBody.Avatar == "" {
		user.Avatar = requestBody.Avatar
	}
	err = d.UpdateUserAvatar(user)
	if err != nil {
		//fmt.Println("error in updateUserAvatar", err)
		http.Error(w, "Error updating user", http.StatusInternalServerError)
		return
	}
	updatedUser, _ := d.GetUserByID(userID)
	jsonData, _ := json.Marshal(updatedUser)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}

// add friend
type FollowRequest struct {
	SenderUsername   string `json:"sender_username"`
	ReceiverUsername string `json:"receiver_username"`
}

func FollowHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	var followReq FollowRequest
	err := json.NewDecoder(r.Body).Decode(&followReq)

	// frontend need to send in the r http.Request the sender username(the one who send request) and the receiver username
	if err != nil {
		http.Error(w, "Invalid request data", http.StatusBadRequest)
		return
	}

	senderUsername := followReq.SenderUsername
	receiverUsername := followReq.ReceiverUsername

	decodedSender := u.SpecialCharDecode(senderUsername)
	decodedReceiver := u.SpecialCharDecode(receiverUsername)
	// get both users from db
	senderUser, err := d.GetUserByUsername(decodedSender)
	if err != nil {
		http.Error(w, "Sender not found", http.StatusNotFound)
		return
	}
	receiverUser, err := d.GetUserByUsername(decodedReceiver)

	if err != nil {
		http.Error(w, "Receiver not found", http.StatusNotFound)
		return
	}
	// Check if senderUser is already following receiverUser
	if isFollower(senderUser, receiverUser) && isFollowing(senderUser, receiverUser) {
		http.Error(w, "You are already following each other", http.StatusConflict)
		return
	}

	if receiverUser.Privacy == "private" {
		if isFollowingSent(senderUser, receiverUser) && isFollowerReceived(senderUser, receiverUser) {
			http.Error(w, "You already sent request", http.StatusConflict)
			return
		}
		if err := d.SentFollowerRequest(senderUser, receiverUser); err != nil {
			fmt.Println(err)
			http.Error(w, "Failed to send following request", http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(w, "Successfully sent follow request to %s", followReq.ReceiverUsername)
	}

	if receiverUser.Privacy == "public" {
		// add receiver username to sender's FollowingUsernames
		if err := d.AddFollowing(senderUser, receiverUser); err != nil {
			//fmt.Println(err)
			http.Error(w, "Failed to update sender's followers", http.StatusInternalServerError)
			return
		}
		// add sender username to receiver's FollowerUsernames
		if err := d.AddFollower(receiverUser, senderUser); err != nil {
			//fmt.Println(err)
			http.Error(w, "Failed to update sender's followers", http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(w, "Successfully followed %s", followReq.ReceiverUsername)

	}

}

func UnfollowHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var followReq FollowRequest
	err := json.NewDecoder(r.Body).Decode(&followReq)
	if err != nil {
		http.Error(w, "Invalid request data", http.StatusBadRequest)
		return
	}

	senderUsername := followReq.SenderUsername
	receiverUsername := followReq.ReceiverUsername

	decodedSender := u.SpecialCharDecode(senderUsername)
	decodedReceiver := u.SpecialCharDecode(receiverUsername)

	// Get sender user from the database
	senderUser, err := d.GetUserByUsername(decodedSender)
	if err != nil {
		http.Error(w, "Sender not found", http.StatusNotFound)
		return
	}
	receiverUser, err := d.GetUserByUsername(decodedReceiver)
	if err != nil {
		http.Error(w, "Receiver not found", http.StatusNotFound)
		return
	}

	// Remove the follower relationship: remove the sender from the receiver's follower list
	if err := d.RemoveFollower(receiverUser, senderUser); err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to unfollow", http.StatusInternalServerError)
		return
	}

	// Remove the following relationship from the receiver's side
	if err := d.RemoveFollowing(senderUser, receiverUser); err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to unfollow", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Unfollow successfully")

}

func AcceptFollowRequestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var followReq FollowRequest
	err := json.NewDecoder(r.Body).Decode(&followReq)
	if err != nil {
		http.Error(w, "Invalid request data", http.StatusBadRequest)
		return
	}

	senderUsername := followReq.SenderUsername
	receiverUsername := followReq.ReceiverUsername

	decodedSender := u.SpecialCharDecode(senderUsername)
	decodedReceiver := u.SpecialCharDecode(receiverUsername)

	// Get sender user from the database
	senderUser, err := d.GetUserByUsername(decodedSender)
	if err != nil {
		http.Error(w, "Sender not found", http.StatusNotFound)
		return
	}

	// Check receiver user privacy and get receiver user from the database
	receiverUser, err := d.GetUserByUsername(decodedReceiver)
	if err != nil {
		http.Error(w, "Receiver not found", http.StatusNotFound)
		return
	}

	if err := d.RemoveFollowRequest(senderUser, receiverUser); err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to remove follow request", http.StatusInternalServerError)
		return
	}

	// Add receiver username to sender's FollowingUsernames
	if err := d.AddFollowing(senderUser, receiverUser); err != nil {
		http.Error(w, "Failed to update sender's followers", http.StatusInternalServerError)
		return
	}

	// Add the sender's username to the receiver's FollowerUsernames
	if err := d.AddFollower(receiverUser, senderUser); err != nil {
		http.Error(w, "Failed to update receiver's followers", http.StatusInternalServerError)
		return
	}
	// Return a success response
	fmt.Fprintf(w, "Follow request accepted successfully")
}

func DeclineFollowRequestHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var followReq FollowRequest
	err := json.NewDecoder(r.Body).Decode(&followReq)
	if err != nil {
		http.Error(w, "Invalid request data", http.StatusBadRequest)
		return
	}

	senderUsername := followReq.SenderUsername
	receiverUsername := followReq.ReceiverUsername

	decodedSender := u.SpecialCharDecode(senderUsername)
	decodedReceiver := u.SpecialCharDecode(receiverUsername)

	// Get sender user from the database
	senderUser, err := d.GetUserByUsername(decodedSender)
	if err != nil {
		http.Error(w, "Sender not found", http.StatusNotFound)
		return
	}

	// Check receiver user privacy and get receiver user from the database
	receiverUser, err := d.GetUserByUsername(decodedReceiver)
	if err != nil {
		http.Error(w, "Receiver not found", http.StatusNotFound)
		return
	}

	if err := d.RemoveFollowRequest(senderUser, receiverUser); err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to remove follow request", http.StatusInternalServerError)
		return
	}
	fmt.Fprintf(w, "Decline request successfully")
}

func isFollower(sender *d.User, receiver *d.User) bool {
	followerUsernames := strings.Split(receiver.FollowerUsernames, ",")
	for _, username := range followerUsernames {
		if username == sender.UserName {
			return true
		}
	}
	return false
}

func isFollowing(sender *d.User, receiver *d.User) bool {
	followingUsernames := strings.Split(sender.FollowingUsernames, ",")
	for _, username := range followingUsernames {
		if username == receiver.UserName {
			return true
		}
	}
	return false
}

func isFollowingSent(sender *d.User, receiver *d.User) bool {
	followingUsernamesSent := strings.Split(sender.FollowingUsernamesSent, ",")
	for _, username := range followingUsernamesSent {
		if username == receiver.UserName {
			return true
		}
	}
	return false
}

func isFollowerReceived(sender *d.User, receiver *d.User) bool {
	followerUsernamesReceived := strings.Split(receiver.FollowerUsernamesReceived, ",")
	for _, username := range followerUsernamesReceived {
		if username == sender.UserName {
			return true
		}
	}
	return false
}
