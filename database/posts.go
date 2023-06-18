package database

import (
	"database/sql"
	"encoding/json"
	"fmt"
	u "socialnetwork/utils"
	"sort"
	"time"

	"github.com/google/uuid"
)

type Post struct {
	PostID          string
	AuthorID        string
	Privacy         string
	IncludedFriends string
	Content         string
	Image           []byte
	CreateAt        time.Time
}

type PostResponse struct {
	PostID          string    `json:"postID"`
	AuthorID        string    `json:"authorID"`
	Privacy         string    `json:"privacy"`
	IncludedFriends []string  `json:"includedFriends"`
	Content         string    `json:"content"`
	Image           []byte    `json:"image"`
	CreateAt        time.Time `json:"createAt"`
}

func CreatePostsTable(db *sql.DB) {
	postsTable := `
	CREATE TABLE IF NOT EXISTS Posts (
		PostID CHAR(36) NOT NULL,
		AuthorID CHAR(36) NOT NULL,
		Privacy TEXT NOT NULL,
		IncludedFriends TEXT NULL,
		Content TEXT NOT NULL,
		Image BLOB NULL,
		CreateAt TIMESTAMP NOT NULL,
		CommentCount INT DEFAULT 0,
		LikeCount INT DEFAULT 0,
		PRIMARY KEY (PostID)
	);`

	query, err := db.Prepare(postsTable)
	u.CheckErr(err)
	query.Exec()
}

func AddPost(post *PostResponse) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()
	query := `
		INSERT INTO Posts (PostID, AuthorID, Privacy, IncludedFriends, Content, Image, CreateAt)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`

	// Generate a new PostID
	post.PostID = uuid.New().String()
	// Serialize the IncludedFriends array to a JSON string
	includedFriendsJSON, err := json.Marshal(post.IncludedFriends)
	if err != nil {
		return err
	}
	// Prepare the SQL statement
	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	// Execute the statement with the post values
	_, err = stmt.Exec(
		post.PostID,
		post.AuthorID,
		post.Privacy,
		string(includedFriendsJSON),
		post.Content,
		post.Image,
		post.CreateAt,
	)
	if err != nil {
		return err
	}

	return nil
}

func GetPublicPosts() ([]Post, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	query := `
		SELECT PostID, AuthorID, Privacy, IncludedFriends, Content, Image, CreateAt
		FROM Posts
		WHERE Privacy = 'public'
	`

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	fmt.Println("rows in pub: ", rows)
	var posts []Post

	for rows.Next() {
		var post Post

		err := rows.Scan(
			&post.PostID,
			&post.AuthorID,
			&post.Privacy,
			&post.IncludedFriends,
			&post.Content,
			&post.Image,
			&post.CreateAt,
		)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return posts, nil
}

func GetPrivatePosts(userID string) ([]Post, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	query := `
		SELECT PostID, AuthorID, Privacy, IncludedFriends, Content, Image, CreateAt
		FROM Posts
		WHERE Privacy = 'private' AND AuthorID = ?
	`

	rows, err := db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Post

	for rows.Next() {
		var post Post

		err := rows.Scan(
			&post.PostID,
			&post.AuthorID,
			&post.Privacy,
			&post.IncludedFriends,
			&post.Content,
			&post.Image,
			&post.CreateAt,
		)
		if err != nil {
			return nil, err
		}

		posts = append(posts, post)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return posts, nil
}

func GetCustomPosts(userID string) ([]Post, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	// Retrieve email from Users table based on userID
	email := "SELECT Email FROM Users WHERE UserID = ?"
	var userEmail string
	err = db.QueryRow(email, userID).Scan(&userEmail)
	if err != nil {
		return nil, err
	}

	query := `
		SELECT PostID, AuthorID, Privacy, IncludedFriends, Content, Image, CreateAt
		FROM Posts
		WHERE Privacy = 'custom'
	`
	// Append '%' to the email to perform a wildcard search

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var posts []Post
	for rows.Next() {
		fmt.Println("this is inside rows")
		var post Post
		err := rows.Scan(
			&post.PostID,
			&post.AuthorID,
			&post.Privacy,
			&post.IncludedFriends,
			&post.Content,
			&post.Image,
			&post.CreateAt,
		)
		if err != nil {
			return nil, err
		}
		var includedFriends []string
		test := json.Unmarshal([]byte(post.IncludedFriends), &includedFriends)
		if test != nil {
			fmt.Println("Error:", err)
		}
		fmt.Println(includedFriends)
		sort.Strings(includedFriends)

		index := sort.SearchStrings(includedFriends, userEmail)

		if index < len(includedFriends) && includedFriends[index] == userEmail {
			fmt.Println("Found")
			posts = append(posts, post)
		} else {
			fmt.Println("Not found")
			continue
		}

	}
	// fmt.Println("posts: ", posts)
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return posts, nil
}
