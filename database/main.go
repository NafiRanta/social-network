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

	u.CheckErr(err)
	return database
}
