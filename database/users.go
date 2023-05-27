package database

//TODO: update the user table to include a profile picture and a cover photo => fit with requirements
import (
	"database/sql"
	"fmt"
	u "socialnetwork/utils"
)

type User struct {
	ID        int `json:"-"`
	FirstName string
	LastName  string
	UserName  string
	Email     string
	Password  string `json:"-"`
	Age       int
	Gender    string
}

//create users table
func CreateUsersTable(db *sql.DB) {
	usersTable := `CREATE TABLE IF NOT EXISTS Users (
        UserID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        FirstName TEXT NOT NULL,
        LastName TEXT NOT NULL,
		UserName TEXT NOT NULL UNIQUE,
		Email TEXT NOT NULL UNIQUE,
		Password TEXT NOT NULL,
		Age INTEGER NOT NULL,
		Gender TEXT NOT NULL
        );`
	query, err := db.Prepare(usersTable)
	u.CheckErr(err)
	query.Exec()
	fmt.Println("Users table created successfully!")
}

//add users to users table
func AddUser(db *sql.DB, FirstName string, LastName string, UserName string, Email string, Password string, Age int, Gender string) error {
	records := `INSERT INTO users(FirstName, LastName, UserName, Email, Password, Age, Gender) VALUES (?, ?, ?, ?, ?, ?, ?)`
	query, err := db.Prepare(records)
	u.CheckErr(err)
	_, err = query.Exec(FirstName, LastName, UserName, Email, Password, Age, Gender)
	if err != nil {
		return err
	}
	return nil
}

func GetUserByEmail(email string) (*User, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	stmt, err := db.Prepare("SELECT * FROM users WHERE email = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var user User
	err = stmt.QueryRow(email).Scan(&user.ID, &user.FirstName, &user.LastName, &user.UserName, &user.Email, &user.Password, &user.Age, &user.Gender)
	fmt.Println("err from GetUserByEmail: ", err)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // user not found
		} else {
			return nil, err
		}
	}

	return &user, nil
}
