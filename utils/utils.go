package utils

import (
	"fmt"
	"log"
	"net/url"
	"time"
)

// CheckErr checks if there is an error and logs it
func CheckErr(err error) {
	if err != nil {
		LogError(err)
	}
}

// Log errors to file with date and time
func LogError(err error) {
	fmt.Println(err)
	log.Printf("[%s] ERROR: %v\n", time.Now().Format("2006-01-02 15:04:05"), err)
}

func LogErrorString(text string) {
	log.Printf("[%s] ERROR: %v\n", time.Now().Format("2006-01-02 15:04:05"), text)
}

// decode special character
func SpecialCharDecode(input string) string {
	decoded, err := url.PathUnescape(input)
	if err != nil {
		fmt.Println("Error decoding:", err)
		return ""
	}
	return decoded
}

// contains checks if a string is present in a slice
func Contains(s []string, str string) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}
