package users

import (
	"fmt"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"

	"github.com/dgrijalva/jwt-go"
)

func ChangePrivacyofUser(w http.ResponseWriter, r *http.Request) {
	// Check if the request method is POST
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
	token, err := a.JWTTokenDecode(authHeader)
	if err != nil {
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}
	if !token.Valid {
		http.Error(w, "Token is not valid", http.StatusUnauthorized)
		return
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		http.Error(w, "Invalid token claims", http.StatusUnauthorized)
		return
	}

	userID := claims["userID"].(string)
	user, err := d.GetUserByID(userID)
	if err != nil {
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

	// Respond with success message
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "Update privacy successfully")

}

// change nickname, bio, dob
func ChangeBioofUser(w http.ResponseWriter, r *http.Request) {}

// change avatar
func ChangeAvatarofUser(w http.ResponseWriter, r *http.Request) {}
