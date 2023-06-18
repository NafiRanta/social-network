package authentication

import (
	"fmt"
	"strings"
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

func ExtractUserIDFromAuthHeader(authHeader string) (string, error) {
	if authHeader == "" {
		return "", fmt.Errorf("Missing Authorization header")
	}
	bearerToken := strings.TrimPrefix(authHeader, "Bearer ")
	token, err := jwt.Parse(bearerToken, func(token *jwt.Token) (interface{}, error) {
		return []byte("social-network-2023"), nil
	})
	if err != nil {
		return "", fmt.Errorf("Invalid token")
	}

	if !token.Valid {
		return "", fmt.Errorf("Token is not valid")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", fmt.Errorf("Invalid token claims")
	}

	userID, ok := claims["userID"].(string)
	if !ok {
		return "", fmt.Errorf("Invalid userID claim")
	}

	return userID, nil
}
