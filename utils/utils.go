package utils

//TODO: Log errors to file with date and time
import (
	"log"
)

// If error logFatal
func CheckErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
