package websocket

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID              int    `json:"id"`
	UsernameEmail   string `json:"emailUsername"`
	Username        string `json:"username"`
	Firstname       string `json:"firstname"`
	Lastname        string `json:"lastname"`
	DateOfBirth     string `json:"Dob"`
	Gender          string `json:"gender"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	Logout          bool   `json:"logout"`
	ReactedPosts    []Post `json:"reactedPosts"`
	CommmentedPosts []Post `json:"commentedPosts"`
	CreatedPosts    []Post `json:"createdPosts"`
	Otp             string `json:"Otp"`
	Created_at      string `json:"created_at"`
}

type Category struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	NumPosts int    `json:"numPosts"`
	Posts    []Post `json:"posts"`
}

type Post struct {
	ID       int       `json:"id"`
	AuthorID int       `json:"authorId"`
	Username string    `json:"author"`
	Session  uuid.UUID `json:"session"`
	Liked    bool      `json:"liked"`
	Disliked bool      `json:"disliked"`
	Title    string    `json:"title"`
	Content  string    `json:"content"`
	// CategoryIDs string    `json:"category ids"`
	Categories   string    `json:"categories"`
	Date         int64     `json:"date"`
	ImageURL     string    `json:"image src"`
	Likes        []Reac    `json:"Likes"`
	Dislikes     []Reac    `json:"Dislikes"`
	Comments     []Comment `json:"comments"`
	CommentCount int       `json:"commentCount"`
}

type Reac struct {
	ID        int       `json:"id"`
	LorD      int       `json:"likeOrDislike"`
	AuthorID  int       `json:"authorId"`
	Username  string    `json:"author"`
	Session   uuid.UUID `json:"session"`
	PostID    int       `json:"postId"`
	CommentID int       `json:"commentId"`
}

type Comment struct {
	// Author   string    `json:"username"`
	Content  string    `json:"content"`
	PostID   int       `json:"postId"`
	ID       int       `json:"id"`
	AuthorID int       `json:"authorId"`
	Username string    `json:"author"`
	Session  uuid.UUID `json:"session"`
	Liked    bool      `json:"liked"`
	Disliked bool      `json:"disliked"`
	Likes    []Reac    `json:"likes"`
	Dislikes []Reac    `json:"dislikes"`
}

type Chat struct {
	ID       int       `json:"id"`
	Sender   string    `json:"sender"`
	Receiver string    `json:"receiver"`
	Content  string    `json:"content"`
	Date     time.Time `json:"date"`
	IsRead   bool      `json:"isRead"`
}

type Image struct {
	ID       int    `json:"id"`
	PostID   int    `json:"post id"`
	ImageURL string `json:"image src"`
}

type Acknowledgement struct {
	Type string `json:"type"`
	OTP  string `json:"otp"`
	User string `json:"username"`
}

type Session struct {
	Username    string
	Privilege   int
	Cookie      string
	ExpiredTime time.Time
}

type Logged struct {
	User    User `json:"user"`
	Success bool `json:"success"`
}
