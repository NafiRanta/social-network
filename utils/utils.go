package utils

import "fmt"

//TODO: Log errors to file with date and time

// If error logFatal
func CheckErr(err error) {
	if err != nil {
		fmt.Println("error: ", err)
		return
	}
}
