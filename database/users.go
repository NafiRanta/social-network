package database

//TODO: update the user table to include a profile picture and a cover photo => fit with requirements
import (
	"database/sql"
	"fmt"
	u "socialnetwork/utils"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID             int    `json:"-"`
	FirstName      string `json:"firstname"`
	LastName       string `json:"lastname"`
	Email          string `json:"email"`
	Password       string `json:"password"`
	Dob            string `json:"dob"`
	Gender         string `json:"gender"`
	NickName       string `json:"nickname"`
	ProfilePicture string `json:"-"`
	About          string `json:"about"`
}

// create users table
func CreateUsersTable(db *sql.DB) {
	usersTable := `CREATE TABLE IF NOT EXISTS Users (
        UserID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        FirstName TEXT NOT NULL,
        LastName TEXT NOT NULL,
		Email TEXT NOT NULL UNIQUE,
		Password TEXT NOT NULL,
		Dob TEXT NOT NULL,
		Gender TEXT NOT NULL,
		NickName TEXT,
		ProfilePicture TEXT,
		About TEXT 
        );`
	query, err := db.Prepare(usersTable)
	u.CheckErr(err)
	query.Exec()
	// insert or ignore into
	_, err = db.Exec(`
	INSERT OR IGNORE INTO "main"."Users" ("FirstName", "LastName", "Email", "Password", "Dob", "Gender", "NickName", "ProfilePicture", "About")
        VALUES
            ("Nafisah", "Rantasalmi", "nafisah.rantasalmi@gmail.com", "nafi123", "1984-10-22", "Female", "Nafi", "", ""),
            ("Jacob", "Pesämaa", "jacob.pesamaa@gmail.com", "jacob123", "1994-10-22", "Male", "Jacob", "", "");
	`)
	u.CheckErr(err)
}

// add users to users table
func AddUser(db *sql.DB, FirstName string, LastName string, Email string, Password string, Dob string, Gender string, NickName string, ProfilePicture string, About string) error {
	records := `INSERT INTO Users (FirstName, LastName, Email, Password, Dob, Gender, NickName, ProfilePicture, About) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
	query, err := db.Prepare(records)
	if err != nil {
		return err
	}
	defer query.Close()

	_, err = query.Exec(FirstName, LastName, Email, Password, Dob, Gender, NickName, ProfilePicture, About)
	if err != nil {
		return err
	}
	return nil
}

func GetUserByEmail(email string) (*User, error) {
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
	err = stmt.QueryRow(email).Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Dob, &user.Gender, &user.NickName, &user.ProfilePicture, &user.About)
	if err != nil {
		if err == sql.ErrNoRows {
			return &user, nil // user not found
		} else {
			return nil, err
		}
	}

	return &user, nil
}

// Create bcrypt hash from password
func HashPassword(password string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	u.CheckErr(err)
	return string(hash)
}

// VerifyPassword checks if the entered password matches the stored bcrypt hash
func VerifyPassword(enteredPassword, storedHash string) error {
	// Compare the entered password with the stored hash
	err := bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(enteredPassword))
	if err != nil {
		// Passwords don't match
		return err
	}
	// Passwords match
	return nil
}
