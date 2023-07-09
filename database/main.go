package database

import (
	"database/sql"
	"fmt"
	u "socialnetwork/utils"

	_ "github.com/mattn/go-sqlite3"
)

func GetDB() *sql.DB {
	//open the database
	fmt.Println("Opening database...")
	database, err := sql.Open("sqlite3", "./socialnetwork.db")
	u.CheckErr(err)
	CreateUsersTable(database)
	CreatePostsTable(database)
	CreateCommentsTable(database)
	CreateMessagesTable(database)
	CreateGroupsTable(database)
	CreateGroupPostsTable(database)
	CreateGroupEventsTable(database)
	// CreatePostsTable(database)
	// CreatePostLikesTable(database)
	// CreateCommentsTable(database)
	// CreateCommentLikesTable(database)

	//fake data for testing

	// err = AddUser(database, "Gin", "Phan", "GinP", "gin.phan@gritlab.ax", "abc123", 29, "Female")
	// err = AddUser(database, "Nafisah", "Rantasalmi", "NafisahR", "nafisah.rantasalmi@gritlab.ax", "abc123456", 39, "Female")

	// // err = AddPost(database, 1, "My First Post", "Hello, world!", "2023-04-27", "Programming, Golang")
	// // err = AddPost(database, 1, "My Favorite Books", "Here are some of my favorite books: 1984, To Kill a Mockingbird, and The Catcher in the Rye.", "2023-04-27", "Books, Literature")

	// // err = AddLikeToPost(database, 1, 2)
	// // err = AddLikeToPost(database, 2, 2)

	// // err = AddComment(database, 2, "NafisahR", 1, "I agree, this post is very insightful.")
	// // err = AddComment(database, 1, "GinP", 1, "This is a great post!")
	// // err = AddComment(database, 1, "GinP", 2, "Thanks for sharing this information.")

	// // err = AddLikeToComment(database, 2, 2)
	// // err = AddLikeToComment(database, 1, 1)

	u.CheckErr(err)
	fmt.Println("Fetching records...")
	return database
}
