package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	a "socialnetwork/authentication"
	d "socialnetwork/database"
	p "socialnetwork/posts"
	user "socialnetwork/users"
	u "socialnetwork/utils"
	"time"
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
	go closeServer()
	router := http.NewServeMux()
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "connected")
	})
	//handle user login and register, logout
	router.HandleFunc("/login", a.LogIn)
	router.HandleFunc("/register", a.Register)
	router.HandleFunc("/logout", a.LogOut)
	//handle user
	router.HandleFunc("/users", user.GetAllUsers)
	router.HandleFunc("/updateprivacy", user.ChangePrivacyofUser)
	router.HandleFunc("/getUserByEmail", user.GetUserByEmailHandler)
	router.HandleFunc("/updatebio", user.UpdateBioOfUser)

	//handle post
	router.HandleFunc("/posts", p.GetPostsHandler)
	// router.HandleFunc("/websocket", ws)
	handler := u.CorsMiddleware(router)
	//fire up the server
	log.Print("Listening on :8080...")
	err := http.ListenAndServe(":8080", handler)
	u.CheckErr(err)
	return nil
}

func closeServer() {
	var input string
	time.Sleep(10 * time.Millisecond)
	printcolor("Type 'x' to close the server", "yellow")
	fmt.Scanln(&input)
	if input == "x" {
		printcolor("Server closed", "red")
		os.Exit(0)
	} else {
		closeServer()
	}
}

// print in color
func printcolor(text string, color string) {
	switch color {
	case "green":
		fmt.Println("\033[32m" + text + "\033[0m")
	case "red":
		fmt.Println("\033[31m" + text + "\033[0m")
	case "yellow":
		fmt.Println("\033[33m" + text + "\033[0m")
	}
}
