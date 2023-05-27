package authentication

import (
	"encoding/json"
	"fmt"
	"net/http"
	d "socialnetwork/database"

	"github.com/gofrs/uuid"
	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("secret-key"))

type UserData struct {
	User string
}

func LogIn(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Login")
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	if r.Method == "POST" {
		decoder := json.NewDecoder(r.Body)
		var data map[string]string
		err := decoder.Decode(&data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		email := data["email"]
		password := data["password"]

		var storedPassword string
		user, err := d.GetUserByEmail(email)
		storedPassword = user.Password

		// Compare the stored password with the password received from the front-end
		if password != storedPassword {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		if user != nil && password == storedPassword {
			// Generate a new UUID
			id, err := uuid.NewV4()
			if err != nil {
				http.Error(w, "Failed to generate session ID", http.StatusInternalServerError)
				return
			}
			// Combine the UUID with the session name using a delimiter
			sessionName := "session-name-" + id.String()

			// Create a new session for the user with the combined session name
			session, _ := store.Get(r, sessionName)

			session.Values["authenticated"] = true
			// Saves all sessions used during the current request
			session.Save(r, w)

			w.WriteHeader(http.StatusOK)
			// Encode the user as JSON
			userJSON, err := json.Marshal(user)
			fmt.Println(user)
			if err != nil {
				http.Error(w, "Failed to encode user", http.StatusInternalServerError)
				return
			}
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			w.Write(userJSON)
		}
	}

}

func LogOut(w http.ResponseWriter, r *http.Request) {
	fmt.Println("logout")
}

func Register(w http.ResponseWriter, r *http.Request) {
	fmt.Println("register")
	/*
		1. check username criteria
		2. check password criteria
		3. check if username is already exists in database
		4. create bcrypt hash from password
		5. insert username and password hash in database
		(email validation will be in another video)
	*/
}
