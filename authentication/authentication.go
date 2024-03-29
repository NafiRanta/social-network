package authentication

import (
	"bytes"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"io/ioutil"
	"math/rand"
	"net/http"
	d "socialnetwork/database"
	u "socialnetwork/utils"
	"strconv"
	"time"

	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte("social-network-2023"))

type UserResponse struct {
	FirstName                 string `json:"FirstName"`
	LastName                  string `json:"LastName"`
	UserName                  string `json:"UserName"`
	Email                     string `json:"Email"`
	Privacy                   string `json:"Privacy"`
	DateOfBirth               string `json:"DateOfBirth"`
	Gender                    string `json:"Gender"`
	Avatar                    string `json:"Avatar"`
	Nickname                  string `json:"Nickname"`
	AboutMe                   string `json:"AboutMe"`
	FollowerUsernames         string `json:"FollowerUsernames"`
	FollowingUsernames        string `json:"FollowingUsernames"`
	FollowingUsernamesSent    string `json:"FollowingUsernamesSent"`
	FollowerUsernamesReceived string `json:"FollowerUsernamesReceived"`
}

type UserProfile struct {
	FirstName         string `json:"FirstName"`
	LastName          string `json:"LastName"`
	UserName          string `json:"UserName"`
	Privacy           string `json:"Privacy"`
	Avatar            string `json:"Avatar"`
	FollowerUsernames string `json:"FollowerUsernames"`
}

//user repsonse after login should not have password, the followers should have name, email, pic

func LogIn(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	if r.Method == "POST" {
		decoder := json.NewDecoder(r.Body)
		var data map[string]string
		err := decoder.Decode(&data)
		if err != nil {
			u.CheckErr(err)
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		email := data["email"]
		password := data["password"]

		var storedPassword string
		user, err := d.GetUserByEmail(email)
		if err != nil {
			u.CheckErr(err)
		}
		// Get the stored password from the database
		storedPassword = user.Password
		// Compare the stored password with the password received from the front-end
		if password != storedPassword {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}
		if user != nil && password == storedPassword {
			// Generate a new UUID
			if err != nil {
				u.CheckErr(err)
				http.Error(w, "Failed to generate session ID", http.StatusInternalServerError)
				return
			}
			token, err := GenerateJWT(user.UserID)
			if err != nil {
				u.CheckErr(err)
				http.Error(w, "Failed to generate JWT", http.StatusInternalServerError)
				return
			}

			// Combine the UUID with the session name using a delimiter
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
				FirstName:                 user.FirstName,
				LastName:                  user.LastName,
				UserName:                  user.UserName,
				Email:                     user.Email,
				Privacy:                   user.Privacy,
				DateOfBirth:               user.DateOfBirth,
				Gender:                    user.Gender,
				Avatar:                    user.Avatar,
				Nickname:                  user.Nickname,
				AboutMe:                   user.AboutMe,
				FollowerUsernames:         user.FollowerUsernames,
				FollowingUsernames:        user.FollowingUsernames,
				FollowingUsernamesSent:    user.FollowingUsernamesSent,
				FollowerUsernamesReceived: user.FollowerUsernamesReceived,
			}
			userJSON, err := json.Marshal(userResponse)
			if err != nil {
				u.CheckErr(err)
				http.Error(w, "Failed to encode user", http.StatusInternalServerError)
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
	sessionName := r.Header.Get("session-name")
	session, _ := store.Get(r, sessionName)
	session.Values["authenticated"] = false
	session.Save(r, w)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Logged out successfully"))
}

func Register(w http.ResponseWriter, r *http.Request) {

	var user d.User

	if r.Method != "POST" {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Read the request body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		u.CheckErr(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Create a new buffer with the request body content
	buffer := bytes.NewBuffer(body)

	// Decode the request body into the user variable
	err = json.NewDecoder(buffer).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if email already exists in the database
	_, err = d.GetUserByEmail(user.Email)
	if err == nil {
		errMsg := "You already have an account"
		http.Error(w, errMsg, http.StatusConflict)
		return
	} else {
		// Insert user in the database
		if err == sql.ErrNoRows {
			if user.Avatar == "" {
				user.Avatar = "data:image/jpeg;base64," + base64.StdEncoding.EncodeToString(SetDefaultImg("defaultImg/default-avatar.jpeg"))
			}
			// generate unique username
			rand.Seed(time.Now().UnixNano())
			randomNumber := rand.Intn(100)
			user.UserName = user.FirstName + `-` + user.LastName + `-` + strconv.Itoa(randomNumber)

			err = d.AddUser(d.GetDB(), user.FirstName, user.LastName, user.UserName, user.Email, user.Password, user.DateOfBirth, user.Gender, user.Nickname, user.Avatar, user.AboutMe)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			// add welcome message to user from admin to db insert to messages table
			// get admin UserName by email: admin@example.com
			admin, err := d.GetUserByEmail("admin@example.com")
			if err != nil {
				u.CheckErr(err)
			}
			// get user id by email
			user, err := d.GetUserByEmail(user.Email)
			if err != nil {
				u.CheckErr(err)
			}
			var welcomeMessage d.MessageResponse
			welcomeMessage.SenderUsername = admin.UserName
			welcomeMessage.ReceiverUsername = user.UserName
			welcomeMessage.Content = "Welcome to Social Network!"
			welcomeMessage.SentAt = time.Now()

			// insert welcome message to user from admin to db
			d.AddMessage(&welcomeMessage)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
		} else {
			u.CheckErr(err)
		}
	}
}

func SetDefaultImg(imgDefaultPath string) []byte {
	// Load the default image from the file system
	imgData, err := ioutil.ReadFile(imgDefaultPath)
	if err != nil {
		u.CheckErr(err)
	}
	return imgData
}
