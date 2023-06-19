package database

//TODO: update the user table to include a profile picture and a cover photo => fit with requirements
import (
	"database/sql"
	"fmt"
	u "socialnetwork/utils"

	"github.com/gofrs/uuid"
)

type User struct {
	UserID         string
	FirstName      string
	LastName       string
	Email          string
	Password       string
	Privacy        string
	Online         int
	DateOfBirth    string
	Gender         string
	Avatar         string
	Nickname       string
	AboutMe        string
	FollowerIDs    string
	OnFollowingIDs string
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
		Avatar BLOB,
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
func AddUser(db *sql.DB, FirstName string, LastName string, Email string, Password string, Dob string, Gender string, NickName string, ProfilePicture string, About string) error {
	records := `INSERT INTO Users (UserID, FirstName, LastName, Email, Password, Privacy, Online, DateOfBirth, Gender, Avatar, Nickname, AboutMe, Follower_IDs, OnFollowing_IDs)
	            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	query, err := db.Prepare(records)
	if err != nil {
		return err
	}
	defer query.Close()
	// Generate a unique UserID using UUID
	userID, _ := uuid.NewV4()

	_, err = query.Exec(userID, FirstName, LastName, Email, Password, "public", 0, Dob, Gender, ProfilePicture, NickName, About, "", "")
	if err != nil {
		return err
	}
	return nil
}

func GetUserByEmail(email string) (*User, error) {
	fmt.Println("GetUserByEmail")
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	stmt, err := db.Prepare("SELECT * FROM Users WHERE email = ?")
	if err != nil {
		fmt.Println("err from stmt: ", err)
		return nil, err
	}
	defer stmt.Close()

	var user User
	err = stmt.QueryRow(email).Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Privacy, &user.Online, &user.DateOfBirth, &user.Gender, &user.Avatar, &user.Nickname, &user.AboutMe, &user.FollowerIDs, &user.OnFollowingIDs)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("user not found")
			return &user, err // user not found
		} else {
			fmt.Println("sth else error:", err)
			return nil, err
		}
	}
	return &user, nil
}

func GetUserByID(userID string) (*User, error) {
	// If the user is not found, return nil, nil
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	stmt, err := db.Prepare("SELECT * FROM Users WHERE UserID = ?")
	if err != nil {
		fmt.Println("error from stmt:", err)
		return nil, err
	}
	defer stmt.Close()

	var user User

	err = stmt.QueryRow(userID).Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.Privacy, &user.Online, &user.DateOfBirth, &user.Gender, &user.Avatar, &user.Nickname, &user.AboutMe, &user.FollowerIDs, &user.OnFollowingIDs)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("user not found")
			return nil, nil // User not found
		} else {
			fmt.Println("something else error:", err)
			return nil, err
		}
	}
	// If the error is nil, the user is found
	return &user, nil
}

func GetAllPublicUsers() ([]*User, error) {
	// Open a connection to the SQL database
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	// Prepare the SQL query
	query := "SELECT * FROM Users WHERE privacy = 'public'"
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Iterate over the query results and populate the users slice
	users := make([]*User, 0)
	for rows.Next() {
		user := &User{}
		err := rows.Scan(
			&user.UserID,
			&user.FirstName,
			&user.LastName,
			&user.Email,
			&user.Password,
			&user.Privacy,
			&user.Online,
			&user.DateOfBirth,
			&user.Gender,
			&user.Avatar,
			&user.Nickname,
			&user.AboutMe,
			&user.FollowerIDs,
			&user.OnFollowingIDs,
		)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	// Check for any errors during the iteration
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func GetAllPrivateUsers() ([]*User, error) {
	// Open a connection to the SQL database
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	// Prepare the SQL query
	query := "SELECT * FROM Users WHERE privacy = 'private'"
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Iterate over the query results and populate the users slice
	users := make([]*User, 0)
	for rows.Next() {
		user := &User{}
		err := rows.Scan(
			&user.UserID,
			&user.FirstName,
			&user.LastName,
			&user.Email,
			&user.Password,
			&user.Privacy,
			&user.Online,
			&user.DateOfBirth,
			&user.Gender,
			&user.Avatar,
			&user.Nickname,
			&user.AboutMe,
			&user.FollowerIDs,
			&user.OnFollowingIDs,
		)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	// Check for any errors during the iteration
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func UpdateUserPrivacy(user *User) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	stmt, err := db.Prepare("UPDATE Users SET Privacy = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.Privacy, user.UserID)
	if err != nil {
		return err
	}

	return nil
}

func UpdateUserInfo(user *User) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	stmt, err := db.Prepare("UPDATE Users SET DateOfBirth = ?, Gender = ?, Nickname = ?, AboutMe = ? WHERE userID = ?")
	if err != nil {
		fmt.Println("error from stmt:", err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.DateOfBirth, user.Gender, user.Nickname, user.AboutMe, user.UserID)
	if err != nil {
		fmt.Println("error from exec:", err)
		return err
	}

	return nil
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
