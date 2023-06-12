package posts

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
)

func GetPostsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetPostsHandler")

	// Retrieve the Authorization header from the request
	authHeader := r.Header.Get("Authorization")

	// Check if the Authorization header is present
	if authHeader == "" {
		http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
		return
	}

	// Extract the token from the Authorization header
	bearerToken := strings.TrimPrefix(authHeader, "Bearer ")

	// Validate and decode the token
	token, err := jwt.Parse(bearerToken, func(token *jwt.Token) (interface{}, error) {
		// Provide the same secret key used for signing the JWT during login
		return []byte("social-network-2023"), nil
	})
	if err != nil {
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	// Check if the token is valid and has not expired
	if !token.Valid {
		http.Error(w, "Token is not valid", http.StatusUnauthorized)
		return
	}

	// Access the claims from the token, including the userID if it was included in the token payload
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		http.Error(w, "Invalid token claims", http.StatusUnauthorized)
		return
	}

	userID := claims["userID"].(string)
	fmt.Println("userID:", userID)

	// Continue with your logic for handling the GET request
	// ...
}
