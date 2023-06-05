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
		if err != nil {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}
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
	fmt.Println("registering")

	if r.Method != "POST" {
		fmt.Println("Invalid request method")
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	decoder := json.NewDecoder(r.Body)
	var data struct {
		Email          string `json:"email"`
		Password       string `json:"password"`
		FirstName      string `json:"firstname"`
		LastName       string `json:"lastname"`
		DateOfBirth    string `json:"dob"`
		Gender         string `json:"gender"`
		Nickname       string `json:"nickname"`
		ProfilePicture string `json:"profilepicture"`
		About          string `json:"about"`
	}
	fmt.Println("register - ln 112")
	err := decoder.Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Println("register - ln 117")
	// Validate input data

	fmt.Println("register - ln 120")
	// Check if email is already registered

	fmt.Println("register - ln 136")
	// Create bcrypt hash from password
	hashedPassword := d.HashPassword(data.Password)

	// Insert user into the database
	db := d.GetDB()
	fmt.Println("register - ln 129")
	err = d.AddUser(db, data.FirstName, data.LastName, data.Email, hashedPassword, data.DateOfBirth, data.Gender, data.Nickname, data.ProfilePicture, data.About)
	if err != nil {
		fmt.Println("Error adding user:", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	fmt.Println("register - ln 136")
	fmt.Println("User registered successfully")
	w.WriteHeader(http.StatusOK)
}
