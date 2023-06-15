package users

import (
	"encoding/json"
	"fmt"
	"net/http"
	d "socialnetwork/database"
)

type UserResponse struct {
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Email     string `json:"email"`
	Privacy   string `json:"privacy"`
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
			FirstName: user.FirstName,
			LastName:  user.LastName,
			Email:     user.Email,
			Privacy:   user.Privacy,
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

//get user by id/ email handler
