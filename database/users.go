package database

//TODO: update the user table to include a profile picture and a cover photo => fit with requirements
import (
	"database/sql"
	"fmt"
	u "socialnetwork/utils"

	"github.com/gofrs/uuid"
)

type User struct {
	UserID         string `json:"-"`
	FirstName      string `json:"firstname"`
	LastName       string `json:"lastname"`
	Email          string `json:"email"`
	Password       string `json:"password"`
	Privacy        string `json:"privacy"`
	Online         int    `json:"online"`
	DateOfBirth    string `json:"dob"`
	Gender         string `json:"gender"`
	Avatar         string `json:"profilePicture"`
	CoverImage     string `json:"-"`
	Nickname       string `json:"nickname"`
	AboutMe        string `json:"about"`
	FollowerIDs    string `json:"-"`
	OnFollowingIDs string `json:"-"`
}

// create users table
func CreateUsersTable(db *sql.DB) {
	usersTable := `CREATE TABLE IF NOT EXISTS Users (
		UserID CHAR(36) NOT NULL PRIMARY KEY,
		FirstName VARCHAR(255) NOT NULL,
		LastName VARCHAR(255) NOT NULL,
		Email VARCHAR(255) NOT NULL UNIQUE,
		Password CHAR(36) NOT NULL,
		Privacy TEXT NOT NULL DEFAULT 'public',
		Online TINYINT(1) NOT NULL DEFAULT 0,
		DateOfBirth DATETIME NOT NULL,
		Gender TEXT NOT NULL,
		Avatar BLOB DEFAULT 'Default avatar',
		CoverImage BLOB NOT NULL DEFAULT 'default cover image',
		Nickname TEXT,
		AboutMe TEXT,
		Follower_IDs TEXT,
		OnFollowing_IDs TEXT
	);`
	query, err := db.Prepare(usersTable)
	u.CheckErr(err)
	query.Exec()
}

// add users to users table
func AddUser(db *sql.DB, FirstName string, LastName string, Email string, Password string, Dob string, Gender string, NickName string, ProfilePicture string, CoverPicture string, About string) error {
	records := `INSERT INTO Users (UserID, FirstName, LastName, Email, Password, Privacy, Online, DateOfBirth, Gender, Avatar, CoverImage, Nickname, AboutMe, Follower_IDs, OnFollowing_IDs)
	            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	query, err := db.Prepare(records)
	if err != nil {
		return err
	}
	defer query.Close()
	// Generate a unique UserID using UUID
	userID, _ := uuid.NewV4()

	_, err = query.Exec(userID, FirstName, LastName, Email, Password, "public", 0, Dob, Gender, ProfilePicture, CoverPicture, NickName, About, "", "")
	if err != nil {
		return err
	}
	return nil
}

func GetUserByEmail(email string) (*User, error) {
	fmt.Println("GetUserByEmail")
	// if user not found, return nil, nil
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	stmt, err := db.Prepare("SELECT * FROM users WHERE email = ?")
	if err != nil {
		fmt.Println("err from stmt: ", err)
		return nil, err
	}
	defer stmt.Close()

	var user User
	err = stmt.QueryRow(email).Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Privacy, &user.Online, &user.DateOfBirth, &user.Gender, &user.Avatar, &user.CoverImage, &user.Nickname, &user.AboutMe, &user.FollowerIDs, &user.OnFollowingIDs)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("user not found")
			return &user, err // user not found
		} else {
			fmt.Println("sth else error:", err)
			return nil, err
		}
	}
	//if error is nil -> user found
	return &user, nil
}

//func GetUserByID(userID string) (*User, error) {}

// Create bcrypt hash from password
// func HashPassword(password string) string {
// 	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
// 	u.CheckErr(err)
// 	return string(hash)
// }

// VerifyPassword checks if the entered password matches the stored bcrypt hash
// func VerifyPassword(enteredPassword, storedHash string) error {
// 	// Compare the entered password with the stored hash
// 	err := bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(enteredPassword))
// 	if err != nil {
// 		// Passwords don't match
// 		return err
// 	}
// 	// Passwords match
// 	return nil
// }
