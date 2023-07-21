package database

import (
	"database/sql"
	//"fmt"
	u "socialnetwork/utils"
	"time"

	"github.com/google/uuid"
)

type Message struct {
	MessageID        string
	SenderUsername   string
	ReceiverUsername string
	GroupChatID      string
	Content          string
	Types            string
	SentAt           time.Time
	SeenAt           time.Time
}

type MessageResponse struct {
	MessageID        string    `json:"messageID"`
	SenderUsername   string    `json:"senderUsername"`
	ReceiverUsername string    `json:"receiverUsername"`
	GroupChatID      string    `json:"groupChatID"`
	Content          string    `json:"content"`
	Types            string    `json:"types"`
	SentAt           time.Time `json:"sentAt"`
	SeenAt           time.Time `json:"seenAt"`
}

func CreateMessagesTable(db *sql.DB) {
	messagesTable := `
	CREATE TABLE IF NOT EXISTS Messages (
		MessageID CHAR(36) NOT NULL,
		SenderUsername CHAR(36) NOT NULL,
		ReceiverUsername CHAR(36) NOT NULL,
		GroupChatID CHAR(36) NOT NULL,
		Content TEXT NOT NULL,
		Types TEXT NOT NULL,
		SentAt TIMESTAMP NOT NULL,
		SeenAt TIMESTAMP,
		PRIMARY KEY (MessageID)
	);`

	query, err := db.Prepare(messagesTable)
	u.CheckErr(err)
	query.Exec()
}

func AddMessage(message *MessageResponse) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()
	query := `
		INSERT INTO Messages (MessageID, SenderUsername, ReceiverUsername, GroupChatID, Content, Types, SentAt, SeenAt)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
	// Generate UUID for messageID
	message.MessageID = uuid.New().String()
	// Get current time
	message.SentAt = time.Now()
	// message.SeenAt = time.Now()

	// Execute statement
	statement, err := db.Prepare(query)
	if err != nil {
		return err
	}
	_, err = statement.Exec(message.MessageID, message.SenderUsername, message.ReceiverUsername, message.GroupChatID, message.Content, message.Types, message.SentAt, message.SeenAt)
	if err != nil {
		return err
	}
	return nil
}

func GetMessagesByUserID(userID string) ([]MessageResponse, error) {
	////fmt.Println("userID in get messagesbyuserid", userID)
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	// if userID is either SenderUsername or ReceiverUsername, get the messages
	query := `
		SELECT MessageID, SenderUsername, ReceiverUsername, GroupChatID, Content, Types, SentAt, SeenAt
		FROM Messages
		WHERE SenderUsername = ? OR ReceiverUsername = ?;`
	user, err := GetUserByID(userID)
	if err != nil {
		//fmt.Println("error getting user")
		return nil, err
	}
	rows, err := db.Query(query, user.UserName, user.UserName)
	if err != nil {
		//fmt.Println("error in get messages by user id", err)
		return nil, err
	}
	defer rows.Close()

	var messages []MessageResponse
	for rows.Next() {
		var message MessageResponse
		err := rows.Scan(&message.MessageID, &message.SenderUsername, &message.ReceiverUsername, &message.GroupChatID, &message.Content, &message.Types, &message.SentAt, &message.SeenAt)
		if err != nil {
			return nil, err
		}
		messages = append(messages, message)
	}
	return messages, nil
}

// Mark all messages where userEmail is either sender or receiver seenAt to time now
func MarkMessagesByUsernameAsSeen(username string) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()

	query := `
		UPDATE Messages
		SET SeenAt = ?
		WHERE SenderUsername = ? OR ReceiverUsername = ?;`

	_, err = db.Exec(query, time.Now(), username, username)
	if err != nil {
		return err
	}
	return nil
}
