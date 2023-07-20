package utils

import (
	"fmt"
	"log"
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
	fmt.Println("LogError", err)
	log.Printf("[%s] ERROR: %v\n", time.Now().Format("2006-01-02 15:04:05"), err)
}
