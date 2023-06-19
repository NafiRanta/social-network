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
		return "", fmt.Errorf("missing Authorization header")
	}
	bearerToken := strings.TrimPrefix(authHeader, "Bearer ")

	token, err := jwt.Parse(bearerToken, func(token *jwt.Token) (interface{}, error) {
		return []byte("social-network-2023"), nil
	})

	if err != nil || token == nil {
		fmt.Println("error in extractuseridfromauthheader is", err)
		return "", fmt.Errorf("invalid token")
	}
	fmt.Println("token in extractuseridfromauthheader is", token)
	if !token.Valid {
		return "", fmt.Errorf("token is not valid")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", fmt.Errorf("invalid token claims")
	}

	userID, ok := claims["userID"].(string)
	fmt.Println("user id in extractuseridfromauthheader is", userID)
	if !ok {
		return "", fmt.Errorf("invalid userID claim")
	}

	return userID, nil
}
