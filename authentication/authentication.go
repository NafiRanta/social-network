package authentication

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	d "socialnetwork/database"

	"github.com/gofrs/uuid"
	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("social-network-2023"))

type UserResponse struct {
	FirstName      string `json:"firstname"`
	LastName       string `json:"lastname"`
	Email          string `json:"email"`
	Privacy        string `json:"privacy"`
	DateOfBirth    string `json:"dob"`
	Gender         string `json:"gender"`
	Avatar         string `json:"profilePicture"`
	Nickname       string `json:"nickname"`
	AboutMe        string `json:"about"`
	FollowerIDs    string `json:"Follower_IDs"`
	OnFollowingIDs string `json:"OnFollowing_IDs"`
}

type UserProfile struct {
	FirstName      string `json:"firstname"`
	LastName       string `json:"lastname"`
	Email          string `json:"email"`
	Privacy        string `json:"privacy"`
	DateOfBirth    string `json:"dob"`
	Nickname       string `json:"nickname"`
	AboutMe        string `json:"about"`
	ProfilePicture string `json:"profilePicture"`
}

//user repsonse after login should not have password, the followers should have name, email, pic

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
			fmt.Println("uuid generated:", id.String())
			token, err := GenerateJWT(user.UserID)
			if err != nil {
				http.Error(w, "Failed to generate JWT", http.StatusInternalServerError)
				return
			}
			fmt.Println("token generated:", token)
			// Combine the UUID with the session name using a delimiter
			//sessionName := "session-name-" + id.String()
			sessionName := "session-name-" + token
			// Create a new session for the user with the combined session name
			session, _ := store.Get(r, sessionName)
			// Set some session values
			session.Values["authenticated"] = true
			// Saves all sessions used during the current request
			session.Save(r, w)
			// Generate a new JWT with the userID

			w.WriteHeader(http.StatusOK)
			// Encode the user as JSON
			//convert user to userResponse
			userResponse := UserResponse{
				FirstName:      user.FirstName,
				LastName:       user.LastName,
				Email:          user.Email,
				Privacy:        user.Privacy,
				DateOfBirth:    user.DateOfBirth,
				Gender:         user.Gender,
				Avatar:         user.Avatar,
				Nickname:       user.Nickname,
				AboutMe:        user.AboutMe,
				FollowerIDs:    user.FollowerIDs,
				OnFollowingIDs: user.OnFollowingIDs,
			}
			userJSON, err := json.Marshal(userResponse)
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
			if user.Avatar == "" {
				user.Avatar = "data:image/jpeg;base64," + base64.StdEncoding.EncodeToString(SetDefaultImg("defaultImg/default-avatar.jpeg"))
				fmt.Println(user.Avatar)
			}
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

func SetDefaultImg(imgDefaultPath string) []byte {
	// Load the default image from the file system
	imgData, err := ioutil.ReadFile(imgDefaultPath)
	if err != nil {
		log.Println("Error reading image file:", err)
	}
	return imgData
	// Use the default image data

}
