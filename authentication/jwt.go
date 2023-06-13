package authentication

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

// GenerateJWT generates a JWT token with the userID as a claim
func GenerateJWT(userID string) (string, error) {
	// Define the expiration time for the token
	expirationTime := time.Now().Add(24 * time.Hour) // Token valid for 24 hours

	// Create a new token with the userID as a claim
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": userID,
		"exp":    expirationTime.Unix(),
	})

	// Sign the token using a secret key
	// Replace "your-secret-key" with your own secret key
	tokenString, err := token.SignedString([]byte("social-network-2023"))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
