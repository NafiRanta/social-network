package database

//TODO: update the user table to include a profile picture and a cover photo => fit with requirements
import (
	"database/sql"
	u "socialnetwork/utils"

	//"fmt"

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
	FollowingUsernames        string
	FollowerUsernamesReceived string
	FollowingUsernamesSent    string
}

// add users to users table
func AddUser(db *sql.DB, FirstName string, LastName string, UserName string, Email string, Password string, Dob string, Gender string, NickName string, Avatar string, About string) error {
	records := `INSERT INTO Users (UserID, FirstName, LastName, UserName, Email, Password, Privacy, Online, DateOfBirth, Gender, Avatar, Nickname, AboutMe, FollowerUsernames, FollowerUsernamesReceived, FollowingUsernamesSent, FollowingUsernames)
	            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	query, err := db.Prepare(records)
	if err != nil {
		return err
	}
	defer query.Close()
	// Generate a unique UserID using UUID
	userID, _ := uuid.NewV4()

	_, err = query.Exec(userID, FirstName, LastName, UserName, Email, Password, "public", 0, Dob, Gender, Avatar, NickName, About, "", "", "", "") // Set the new column value to an empty string
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

	stmt, err := db.Prepare("SELECT * FROM Users WHERE email = ?")
	if err != nil {
		u.CheckErr(err)
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
		&user.FollowingUsernames,
		&user.FollowerUsernamesReceived,
		&user.FollowingUsernamesSent,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			u.CheckErr(err)
			return nil, err // user not found
		} else {
			u.CheckErr(err)
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
		u.CheckErr(err)
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
		&user.FollowingUsernames,
		&user.FollowerUsernamesReceived,
		&user.FollowingUsernamesSent,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, err // user not found
		} else {
			u.CheckErr(err)
			return nil, err
		}
	}
	return &user, nil
}

func GetUserByID(userID string) (*User, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	stmt, err := db.Prepare("SELECT * FROM Users WHERE UserID = ?")
	if err != nil {
		u.CheckErr(err)
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
		&user.FollowingUsernames,
		&user.FollowerUsernamesReceived,
		&user.FollowingUsernamesSent,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // User not found
		} else {
			u.CheckErr(err)
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
			&user.FollowingUsernames,
			&user.FollowerUsernamesReceived,
			&user.FollowingUsernamesSent,
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
			&user.FollowingUsernames,
			&user.FollowerUsernamesReceived,
			&user.FollowingUsernamesSent,
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
		u.CheckErr(err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.DateOfBirth, user.Gender, user.Nickname, user.AboutMe, user.UserID)
	if err != nil {
		u.CheckErr(err)
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
		u.CheckErr(err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(user.Avatar, user.UserID)
	if err != nil {
		u.CheckErr(err)
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

func AddFollowing(userA *User, userB *User) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	if userA.FollowingUsernames == "" {
		userA.FollowingUsernames = userB.UserName
	} else {
		userA.FollowingUsernames = userA.FollowingUsernames + "," + userB.UserName
	}

	stmt, err := db.Prepare("UPDATE Users SET FollowingUsernames = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(userA.FollowingUsernames, userA.UserID)
	if err != nil {
		return err
	}
	return nil
}

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

func RemoveFollowing(userA *User, userB *User) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	followingUsernames := strings.Split(userA.FollowingUsernames, ",")
	var updatedFollowingUsernames []string

	for _, following := range followingUsernames {
		if following != userB.UserName {
			updatedFollowingUsernames = append(updatedFollowingUsernames, following)
		}
	}

	userA.FollowingUsernames = strings.Join(updatedFollowingUsernames, ",")

	stmt, err := db.Prepare("UPDATE Users SET FollowingUsernames = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(userA.FollowingUsernames, userA.UserID)
	if err != nil {
		return err
	}
	return nil
}

func SentFollowerRequest(sender *User, receiver *User) error {
	//when a sender sends a follower request to a receiver, the receiver's username is added to the sender's FollowingUsernamesSent
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()
	// Add receiver's username to sender's FollowingUsernamesSent
	if sender.FollowingUsernamesSent == "" {
		sender.FollowingUsernamesSent = receiver.UserName
	} else {
		sender.FollowingUsernamesSent = sender.FollowingUsernamesSent + "," + receiver.UserName
	}

	// Add sender's username to receiver's FollowerUsernamesReceived
	if receiver.FollowerUsernamesReceived == "" {
		receiver.FollowerUsernamesReceived = sender.UserName
	} else {
		receiver.FollowerUsernamesReceived = receiver.FollowerUsernamesReceived + "," + sender.UserName
	}
	// Prepare and execute the update queries
	stmtSender, err := db.Prepare("UPDATE Users SET FollowingUsernamesSent = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmtSender.Close()

	stmtReceiver, err := db.Prepare("UPDATE Users SET FollowerUsernamesReceived = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmtReceiver.Close()

	_, err = stmtSender.Exec(sender.FollowingUsernamesSent, sender.UserID)
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
	var updatedReceiverFollowerUsernamesReceived []string
	for _, username := range receiverFollowerUsernamesReceived {
		if username != sender.UserName {
			updatedReceiverFollowerUsernamesReceived = append(updatedReceiverFollowerUsernamesReceived, username)
		}
	}
	receiver.FollowerUsernamesReceived = strings.Join(updatedReceiverFollowerUsernamesReceived, ",")
	// Remove receiver's username from sender's FollowingUsernamesSent
	senderFollowingUsernamesSent := strings.Split(sender.FollowingUsernamesSent, ",")
	var updatedSenderFollowingUsernamesSent []string
	for _, username := range senderFollowingUsernamesSent {
		if username != receiver.UserName {
			updatedSenderFollowingUsernamesSent = append(updatedSenderFollowingUsernamesSent, username)
		}
	}
	sender.FollowingUsernamesSent = strings.Join(updatedSenderFollowingUsernamesSent, ",")
	// Prepare and execute the update queries
	stmtSender, err := db.Prepare("UPDATE Users SET FollowingUsernamesSent = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmtSender.Close()

	stmtReceiver, err := db.Prepare("UPDATE Users SET FollowerUsernamesReceived = ? WHERE UserID = ?")
	if err != nil {
		return err
	}
	defer stmtReceiver.Close()

	_, err = stmtSender.Exec(sender.FollowingUsernamesSent, sender.UserID)
	if err != nil {
		return err
	}

	_, err = stmtReceiver.Exec(receiver.FollowerUsernamesReceived, receiver.UserID)
	if err != nil {
		return err
	}
	return nil
}
