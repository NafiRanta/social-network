package users

import (
	"encoding/json"
	"fmt"
	"net/http"

	a "socialnetwork/authentication"
	d "socialnetwork/database"

	"github.com/dgrijalva/jwt-go"
)

type UserResponse struct {
	FirstName      string `json:"firstname"`
	LastName       string `json:"lastname"`
	Email          string `json:"email"`
	Privacy        string `json:"privacy"`
	DateOfBirth    string `json:"dob"`
	Nickname       string `json:"nickname"`
	AboutMe        string `json:"about"`
	ProfilePicture string `json:"profilePicture"`
}

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
	response := make([]UserResponse, len(allUsers))
	for i, user := range allUsers {
		response[i] = UserResponse{
			FirstName:      user.FirstName,
			LastName:       user.LastName,
			Email:          user.Email,
			Privacy:        user.Privacy,
			DateOfBirth:    user.DateOfBirth,
			Nickname:       user.Nickname,
			AboutMe:        user.AboutMe,
			ProfilePicture: user.Avatar,
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

// get user by id/ email handler
func GetUserByEmailHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is GET
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
	token, err := a.JWTTokenDecode(authHeader)
	if err != nil {
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}
	if !token.Valid {
		http.Error(w, "Token is not valid", http.StatusUnauthorized)
		return
	}
	_, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		http.Error(w, "Invalid token claims", http.StatusUnauthorized)
		return
	}

	// Get the email parameter from the query string
	email := r.URL.Query().Get("email")
	if email == "" {
		http.Error(w, "Missing email parameter", http.StatusBadRequest)
		return
	}

	// Get the user by email from the database
	user, err := d.GetUserByEmail(email)
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
	userResponse := a.UserResponse{
		FirstName:      user.FirstName,
		LastName:       user.LastName,
		Email:          user.Email,
		Privacy:        user.Privacy,
		DateOfBirth:    user.DateOfBirth,
		Gender:         user.Gender,
		Avatar:         user.Avatar,
		Nickname:       user.Nickname,
		AboutMe:        user.AboutMe,
		FollowerIDs:    user.FollowerIDs,
		OnFollowingIDs: user.OnFollowingIDs,
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
