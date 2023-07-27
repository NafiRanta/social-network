package database

import (
	"database/sql"
	u "socialnetwork/utils"

	_ "github.com/mattn/go-sqlite3"
)

func GetDB() *sql.DB {
	database, err := sql.Open("sqlite3", "./socialnetwork.db")
	u.CheckErr(err)
	CreateUsersTable(database)
	CreatePostsTable(database)
	CreateCommentsTable(database)
	CreateMessagesTable(database)
	CreateGroupsTable(database)
	CreateGroupPostsTable(database)
	CreateGroupEventsTable(database)
	CreateGroupCommentsTable(database)
	u.CheckErr(err)
	// Check if the Users table is empty
	var count int
	err = database.QueryRow("SELECT COUNT(*) FROM Users").Scan(&count)
	u.CheckErr(err)

	if count == 0 {
		// If the Users table is empty, add dummy data
		err = addDummyUserData(database)
		u.CheckErr(err)
	}
	
	return database
}
