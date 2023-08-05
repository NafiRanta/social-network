package database

import (
	"database/sql"

	//"sort"
	"strings"
	"time"

	"github.com/google/uuid"
)

type Post struct {
	PostID          string
	UserName        string
	Privacy         string
	IncludedFriends string
	Content         string
	Image           string
	CreateAt        time.Time
}

type PostResponse struct {
	PostID          string    `json:"postID"`
	UserName        string    `json:"userName"`
	Privacy         string    `json:"privacy"`
	IncludedFriends []string  `json:"includedFriends"`
	Content         string    `json:"content"`
	Image           string    `json:"image"`
	CreateAt        time.Time `json:"createAt"`
}

func AddPost(post *PostResponse) error {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return err
	}
	defer db.Close()
	query := `
		INSERT INTO Posts (PostID, UserName, Privacy, IncludedFriends, Content, Image, CreateAt)
		VALUES (?, ?, ?, ?, ?, ?, ?)`

	post.PostID = uuid.New().String()
	var includedFriendsString string
	if len(post.IncludedFriends) != 0 {
		includedFriendsString = strings.Join(post.IncludedFriends, ",")
	} else {
		includedFriendsString = ""
	}

	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	// Execute the statement with the post values
	_, err = stmt.Exec(
		post.PostID,
		post.UserName,
		post.Privacy,
		includedFriendsString,
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
		SELECT PostID, UserName, Privacy, IncludedFriends, Content, Image, CreateAt
		FROM Posts
		WHERE Privacy = 'public' 
	`

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var posts []Post

	for rows.Next() {
		var post Post

		err := rows.Scan(
			&post.PostID,
			&post.UserName,
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

func GetPrivatePosts(username string) ([]Post, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	query := `
		SELECT PostID, UserName, Privacy, IncludedFriends, Content, Image, CreateAt
		FROM Posts
		WHERE Privacy = 'private' AND UserName = ?
	`

	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Post

	for rows.Next() {
		var post Post

		err := rows.Scan(
			&post.PostID,
			&post.UserName,
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

func GetCustomPosts(username string) ([]Post, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	query := `
		SELECT PostID, UserName, Privacy, IncludedFriends, Content, Image, CreateAt
		FROM Posts
		WHERE Privacy = 'custom' AND UserName = ?
	`

	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Post

	for rows.Next() {
		var post Post

		err := rows.Scan(
			&post.PostID,
			&post.UserName,
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

func GetPublicPostsByUserName(username string) ([]Post, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	query := `
		SELECT PostID, UserName, Privacy, IncludedFriends, Content, Image, CreateAt
		FROM Posts
		WHERE Privacy = 'public' AND UserName = ?
	`

	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var posts []Post

	for rows.Next() {
		var post Post

		err := rows.Scan(
			&post.PostID,
			&post.UserName,
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

func GetPrivatePostsByUserName(username string) ([]Post, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()
	query := `
		SELECT PostID, UserName, Privacy, IncludedFriends, Content, Image, CreateAt
		FROM Posts
		WHERE Privacy = 'private' AND UserName = ?
	`

	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []Post

	for rows.Next() {
		var post Post

		err := rows.Scan(
			&post.PostID,
			&post.UserName,
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

func GetCustomPostsByUserName(username string) ([]Post, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `
		SELECT PostID, UserName, Privacy, IncludedFriends, Content, Image, CreateAt
		FROM Posts
		WHERE Privacy = 'custom' AND UserName = ?
	`

	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var posts []Post

	for rows.Next() {
		var post Post

		err := rows.Scan(
			&post.PostID,
			&post.UserName,
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
