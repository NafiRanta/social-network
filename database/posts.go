package database

import (
	"database/sql"
	"fmt"

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

func GetAllMyPosts(username string) ([]Post, error) {
	publicPosts, err := GetPublicPosts()
	if err != nil {
		return nil, err
	}
	privatePosts, err := GetPrivatePostsForMe(username)
	if err != nil {
		return nil, err
	}
	customPosts, err := GetCustomPostsForMe(username)
	if err != nil {
		return nil, err
	}
	fmt.Println("publicPosts:", publicPosts)
	fmt.Println("privatePosts:", privatePosts)
	fmt.Println("customPosts:", customPosts)

	posts := append(publicPosts, privatePosts...)
	posts = append(posts, customPosts...)

	return posts, nil
}

func GetPrivatePostsForMe(username string) ([]Post, error) {
	// get all my followings
	followings, err := GetFollowings(username)
	if err != nil {
		return nil, err
	}
	fmt.Println("username:", username)
	fmt.Println("followings:", followings)
	// get all private posts of my followings
	var privatePosts []Post
	for _, following := range followings {
		posts, err := GetPrivatePostsByUserName(following)
		if err != nil {
			return nil, err
		}
		privatePosts = append(privatePosts, posts...)
	}

	// get all my private posts
	myPrivatePosts, err := GetPrivatePostsByUserName(username)
	if err != nil {
		return nil, err
	}
	privatePosts = append(privatePosts, myPrivatePosts...)

	return privatePosts, nil
}

// get custom posts where I am included in the includedFollowers
func GetCustomPostsForMe(username string) ([]Post, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `
		SELECT PostID, UserName, Privacy, IncludedFriends, Content, Image, CreateAt
		FROM Posts
		WHERE Privacy = 'custom' AND IncludedFriends LIKE ?
	`

	rows, err := db.Query(query, "%"+username+"%")
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

func GetFollowings(username string) ([]string, error) {
	db, err := sql.Open("sqlite3", "./socialnetwork.db")
	if err != nil {
		return nil, err
	}
	defer db.Close()

	query := `
		SELECT Username
		FROM Users
		WHERE FollowingUsernames LIKE ?
	`

	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var followings []string

	for rows.Next() {
		var following string

		err := rows.Scan(
			&following,
		)
		if err != nil {
			return nil, err
		}
		followings = append(followings, following)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return followings, nil
}
