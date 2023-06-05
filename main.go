package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
	u "socialnetwork/utils"
)

var Database *sql.DB

func init() {
	fmt.Println("Server init")
	Database = d.GetDB()
}

func main() {
	err := Start()
	u.CheckErr(err)
}

func Start() error {
	router := http.NewServeMux()
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "connected")
	})

	router.HandleFunc("/login", a.LogIn)
	router.HandleFunc("/register", a.Register)
	handler := u.CorsMiddleware(router)

	//fire up the server
	log.Print("Listening on :8080...")
	err := http.ListenAndServe(":8080", handler)
	u.CheckErr(err)
	return nil
}
