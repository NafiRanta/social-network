package database

//TODO: update the user table to include a profile picture and a cover photo => fit with requirements
import (
	"database/sql"
	"fmt"

	//"fmt"
	u "socialnetwork/utils"
	"strings"

	"github.com/gofrs/uuid"
)

type User struct {
	UserID                    string
	FirstName                 string
	LastName                  string
	UserName                  string
	Email                     string
	Password                  string
	Privacy                   string
	Online                    int
	DateOfBirth               string
	Gender                    string
	Avatar                    string
	Nickname                  string
	AboutMe                   string
	FollowerUsernames         string
	FollowerUsernamesReceived string
	FollowerUsernamesSent     string
}

// create users table
// 16 column
func CreateUsersTable(db *sql.DB) {
	usersTable := `CREATE TABLE IF NOT EXISTS Users (
		UserID CHAR(36) NOT NULL PRIMARY KEY,
		FirstName VARCHAR(255) NOT NULL,
		LastName VARCHAR(255) NOT NULL,
		UserName VARCHAR(255),
		Email VARCHAR(255) NOT NULL UNIQUE,
		Password CHAR(36) NOT NULL,
		Privacy TEXT NOT NULL DEFAULT 'public',
		Online TINYINT(1) NOT NULL DEFAULT 0,
		DateOfBirth TEXT NOT NULL,
		Gender TEXT NOT NULL,
		Avatar BLOB,
		Nickname TEXT,
		AboutMe TEXT,
		FollowerUsernames TEXT,
		FollowerUsernamesReceived TEXT,
		FollowerUsernamesSent TEXT
		
	);`
	//FollowerIDsReceived TEXT, -- Column containing the string of user IDs that sent follow requests to you
	//FollowerIDsSent TEXT, -- Column containing the string of user IDs that you sent follow requests to
	query, err := db.Prepare(usersTable)
	u.CheckErr(err)
	query.Exec()
}

// add users to users table
func AddUser(db *sql.DB, FirstName string, LastName string, UserName string, Email string, Password string, Dob string, Gender string, NickName string, Avatar string, About string) error {
	records := `INSERT INTO Users (UserID, FirstName, LastName, UserName, Email, Password, Privacy, Online, DateOfBirth, Gender, Avatar, Nickname, AboutMe, FollowerUsernames, FollowerUsernamesReceived, FollowerUsernamesSent)
	            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`
	query, err := db.Prepare(records)
	if err != nil {
		return err
	}
	defer query.Close()
	// Generate a unique UserID using UUID
	userID, _ := uuid.NewV4()

	_, err = query.Exec(userID, FirstName, LastName, UserName, Email, Password, "public", 0, Dob, Gender, Avatar, NickName, About, "", "", "")
	if err != nil {
		return err
	}
	return nil
}

func GetUserByEmail(email string) (*User, error) {
	//fmt.Println("GetUserByEmail")
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	stmt, err := db.Prepare("SELECT * FROM Users WHERE email = ?")
	if err != nil {
		//fmt.Println("err from stmt: ", err)
		return nil, err
	}
	defer stmt.Close()

	var user User
	err = stmt.QueryRow(email).Scan(
		&user.UserID,
		&user.FirstName,
		&user.LastName,
		&user.UserName,
		&user.Email,
		&user.Password,
		&user.Privacy,
		&user.Online,
		&user.DateOfBirth,
		&user.Gender,
		&user.Avatar,
		&user.Nickname,
		&user.AboutMe,
		&user.FollowerUsernames,
		&user.FollowerUsernamesReceived,
		&user.FollowerUsernamesSent,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			//fmt.Println("user not found")
			return &user, err // user not found
		} else {
			//fmt.Println("sth else error:", err)
			return nil, err
		}
	}
	return &user, nil
}

func GetUserByUsername(username string) (*User, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	stmt, err := db.Prepare("SELECT * FROM Users WHERE UserName = ?")
	if err != nil {
		//fmt.Println("err from stmt: ", err)
		return nil, err
	}
	defer stmt.Close()

	var user User
	err = stmt.QueryRow(username).Scan(
		&user.UserID,
		&user.FirstName,
		&user.LastName,
		&user.UserName,
		&user.Email,
		&user.Password,
		&user.Privacy,
		&user.Online,
		&user.DateOfBirth,
		&user.Gender,
		&user.Avatar,
		&user.Nickname,
		&user.AboutMe,
		&user.FollowerUsernames,
		&user.FollowerUsernamesReceived,
		&user.FollowerUsernamesSent,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			//fmt.Println("user not found")
			return &user, err // user not found
		} else {
			//fmt.Println("sth else error:", err)
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
		//fmt.Println("error from stmt:", err)
		return nil, err
	}
	defer stmt.Close()

	var user User

	err = stmt.QueryRow(userID).Scan(
		&user.UserID,
		&user.FirstName,
		&user.LastName,
		&user.UserName,
		&user.Email,
		&user.Password,
		&user.Privacy,
		&user.Online,
		&user.DateOfBirth,
		&user.Gender,
		&user.Avatar,
		&user.Nickname,
		&user.AboutMe,
		&user.FollowerUsernames,
		&user.FollowerUsernamesReceived,
		&user.FollowerUsernamesSent,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			//fmt.Println("user not found")
			return nil, nil // User not found
		} else {
			//fmt.Println("something else error:", err)
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
			&user.UserName,
			&user.Email,
			&user.Password,
			&user.Privacy,
			&user.Online,
			&user.DateOfBirth,
			&user.Gender,
			&user.Avatar,
			&user.Nickname,
			&user.AboutMe,
			&user.FollowerUsernames,
			&user.FollowerUsernamesReceived,
			&user.FollowerUsernamesSent,
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
			&user.UserName,
			&user.Email,
			&user.Password,
			&user.Privacy,
			&user.Online,
			&user.DateOfBirth,
			&user.Gender,
			&user.Avatar,
			&user.Nickname,
			&user.AboutMe,
			&user.FollowerUsernames,
			&user.FollowerUsernamesReceived,
			&user.FollowerUsernamesSent,
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
		//fmt.Println("error from stmt:", err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.DateOfBirth, user.Gender, user.Nickname, user.AboutMe, user.UserID)
	if err != nil {
		//fmt.Println("error from exec:", err)
		return err
	}

	return nil
}

func UpdateUserAvatar(user *User) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	stmt, err := db.Prepare("UPDATE Users SET Avatar = ? WHERE userID = ?")
	if err != nil {
		//fmt.Println("error from stmt:", err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.Avatar, user.UserID)
	if err != nil {
		//fmt.Println("error from exec:", err)
		return err
	}

	return nil
}

func AddFollower(userA *User, userB *User) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	if userA.FollowerUsernames == "" {
		userA.FollowerUsernames = userB.UserName
	} else {
		userA.FollowerUsernames = userA.FollowerUsernames + "," + userB.UserName
	}

	stmt, err := db.Prepare("UPDATE Users SET FollowerUsernames = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(userA.FollowerUsernames, userA.UserID)
	if err != nil {
		return err
	}

	return nil

}

// RemoveFollower removes userB's UserName from userA's FollowerUsernames in the database.
func RemoveFollower(userA *User, userB *User) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()
	
	followerUsernames := strings.Split(userA.FollowerUsernames, ",")
	var updatedFollowerUsernames []string

	for _, follower := range followerUsernames {
		if follower != userB.UserName {
			updatedFollowerUsernames = append(updatedFollowerUsernames, follower)
		}
	}

	userA.FollowerUsernames = strings.Join(updatedFollowerUsernames, ",")

	stmt, err := db.Prepare("UPDATE Users SET FollowerUsernames = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(userA.FollowerUsernames, userA.UserID)
	if err != nil {
		return err
	}

	return nil
}


func SentFollowerRequest(sender *User, receiver *User) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()
	// Add receiver's username to sender's FollowerUsernamesSent
	if sender.FollowerUsernamesSent == "" {
		sender.FollowerUsernamesSent = receiver.UserName
	} else {
		sender.FollowerUsernamesSent = sender.FollowerUsernamesSent + "," + receiver.UserName
	}

	// Add sender's username to receiver's FollowerUsernamesReceived
	if receiver.FollowerUsernamesReceived == "" {
		receiver.FollowerUsernamesReceived = sender.UserName
	} else {
		receiver.FollowerUsernamesReceived = receiver.FollowerUsernamesReceived + "," + sender.UserName
	}
	// Prepare and execute the update queries
	stmtSender, err := db.Prepare("UPDATE Users SET FollowerUsernamesSent = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmtSender.Close()

	stmtReceiver, err := db.Prepare("UPDATE Users SET FollowerUsernamesReceived = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmtReceiver.Close()

	_, err = stmtSender.Exec(sender.FollowerUsernamesSent, sender.UserID)
	if err != nil {
		return err
	}

	_, err = stmtReceiver.Exec(receiver.FollowerUsernamesReceived, receiver.UserID)
	if err != nil {
		return err
	}

	return nil
}

func RemoveFollowRequest(sender *User, receiver *User) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	// Remove sender's username from receiver's FollowerUsernamesReceived
	receiverFollowerUsernamesReceived := strings.Split(receiver.FollowerUsernamesReceived, ",")
	fmt.Println("receiverFollowerUsernamesReceived1:", receiverFollowerUsernamesReceived)
	var updatedReceiverFollowerUsernamesReceived []string
	for _, username := range receiverFollowerUsernamesReceived {
		if username != sender.UserName {
			updatedReceiverFollowerUsernamesReceived = append(updatedReceiverFollowerUsernamesReceived, username)
		}
	}
	receiver.FollowerUsernamesReceived = strings.Join(updatedReceiverFollowerUsernamesReceived, ",")
	fmt.Println("receiver.FollowerUsernamesReceived2:", receiver.FollowerUsernamesReceived)
	// Remove receiver's username from sender's FollowerUsernamesSent
	senderFollowerUsernameSent := strings.Split(sender.FollowerUsernamesSent, ",")
	fmt.Println("senderFollowerUsernameSent1:", senderFollowerUsernameSent)
	var updatedSenderFollowerUsernameSent []string
	for _, username := range senderFollowerUsernameSent {
		if username != receiver.UserName {
			updatedSenderFollowerUsernameSent = append(updatedSenderFollowerUsernameSent, username)
		}
	}
	sender.FollowerUsernamesSent = strings.Join(updatedSenderFollowerUsernameSent, ",")
	fmt.Println("sender.FollowerUsernamesSent2:", sender.FollowerUsernamesSent)
	// Prepare and execute the update queries
	stmtSender, err := db.Prepare("UPDATE Users SET FollowerUsernamesSent = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmtSender.Close()

	stmtReceiver, err := db.Prepare("UPDATE Users SET FollowerUsernamesReceived = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmtReceiver.Close()

	_, err = stmtSender.Exec(sender.FollowerUsernamesSent, sender.UserID)
	if err != nil {
		return err
	}

	_, err = stmtReceiver.Exec(receiver.FollowerUsernamesReceived, receiver.UserID)
	if err != nil {
		return err
	}

	return nil

}
