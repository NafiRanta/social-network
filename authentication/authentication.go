package authentication

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	d "socialnetwork/database"

	"github.com/gofrs/uuid"
	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("social-network-2023"))

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
			fmt.Println("user not found")
			// http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		}
		// Get the stored password from the database and unhash it

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
			// Generate a new JWT with the userID
			token, err := GenerateJWT(user.UserID)
			if err != nil {
				http.Error(w, "Failed to generate JWT", http.StatusInternalServerError)
				return
			}
			fmt.Println("token generated:", token)
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
			// Set the token in the response header
			w.Header().Set("Authorization", "Bearer "+token)
			w.Header().Set("Content-Type", "application/json")
			w.Write(userJSON)
		}
	}
}

func LogOut(w http.ResponseWriter, r *http.Request) {
	fmt.Println("logout")
}

func Register(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Register")
	var user d.User

	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	fmt.Println("method accepted")

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Println(&user)

	// Check if email already exists in the database
	_, err = d.GetUserByEmail(user.Email)
	if err == nil {
		errMsg := "You already have an account"
		fmt.Println("User already exists:", errMsg)
		http.Error(w, errMsg, http.StatusConflict)
		return
	} else {
		// Insert user in the database
		if err == sql.ErrNoRows {
			fmt.Println("User does not exist")
			//  print  user.Avatar
			fmt.Println("user.Avatar", user.Avatar)
			err = d.AddUser(d.GetDB(), user.FirstName, user.LastName, user.Email, user.Password, user.DateOfBirth, user.Gender, user.Nickname, user.Avatar, user.AboutMe)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		} else {
			fmt.Println("different error")
		}
	}

	/* // Create bcrypt hash from password

	// Set the hashed password in the user struct
	user.Password = hashedPassword */
	w.WriteHeader(http.StatusOK)
	fmt.Println("User added successfully")

}
