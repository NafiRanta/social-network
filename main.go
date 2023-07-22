package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	a "socialnetwork/authentication"
	c "socialnetwork/comments"
	d "socialnetwork/database"
	gc "socialnetwork/groupcomments"
	ge "socialnetwork/groupevents"
	gp "socialnetwork/groupposts"
	g "socialnetwork/groups"
	m "socialnetwork/messages"
	p "socialnetwork/posts"
	user "socialnetwork/users"
	u "socialnetwork/utils"
	ws "socialnetwork/websocket"

	"time"
)

var Database *sql.DB

func init() {
	Database = d.GetDB()
}

func main() {
	err := Start()
	u.CheckErr(err)
}

func Start() error {
	go closeServer()
	// setup log file
	logFile, err := setupLogFile()
	if err != nil {
		log.Fatal("Error creating log file:", err)
	}
	defer logFile.Close()

	// websocket
	ctx := context.Background()
	manager := ws.NewManager(ctx)
	router := http.NewServeMux()
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	})
	// handle websocket
	router.HandleFunc("/ws", manager.ServeWS)
	//handle user login and register, logout
	router.HandleFunc("/login", a.LogIn)
	router.HandleFunc("/register", a.Register)
	router.HandleFunc("/logout", a.LogOut)
	//handle user
	router.HandleFunc("/users", user.GetAllUsers)
	// need one api for display users as friends
	//router.HandleFunc("/friends, user.GetAllFriends")
	router.HandleFunc("/updateprivacy", user.ChangePrivacyofUser)
	router.HandleFunc("/getUserByUsername", user.GetUserByUsernameHandler)
	router.HandleFunc("/updatebio", user.UpdateBioOfUser)
	router.HandleFunc("/updateavatar", user.UpdateAvatarOfUser)

	// add friend
	router.HandleFunc("/sendfollowreq", user.SendFollowRequest)

	//handle post
	router.HandleFunc("/posts", p.GetPostsHandler)
	router.HandleFunc("/createpost", p.AddPostHandler)
	router.HandleFunc("/getpostsbyusername", p.GetPostsByUserNameHandler)

	//handle comments
	router.HandleFunc("/addcomment", c.AddCommentHandler)
	router.HandleFunc("/getcomments", c.GetCommentsHandler)

	//handle messages
	router.HandleFunc("/messages", m.GetMessagesHandler)
	router.HandleFunc("/sendmessage", m.AddMessagesHandler)

	//handle groups
	router.HandleFunc("/creategroup", g.CreateGroupHandler)
	router.HandleFunc("/getgroups", g.GetGroupsHandler)
	router.HandleFunc("/getsinglegroup", g.GetSingleGroupHandler)
	router.HandleFunc("/addusertogroup", g.AddUserToGroupHandler)
	router.HandleFunc("/invitesbyadmin", g.GetAdminGroupInvitesHandler)
	router.HandleFunc("/invitesbymember", g.AddUsersToMemberInvited)

	// handle group posts
	router.HandleFunc("/addgrouppost", gp.AddGroupPostHandler)
	router.HandleFunc("/getmygroupsposts", gp.GetMyGroupsPostsHandler)
	router.HandleFunc("/getgroupposts", gp.GetGroupPostsByGroupIDHandler)

	//handle group comments
	router.HandleFunc("/addgroupcomment", gc.AddGroupCommentPostHandler)
	router.HandleFunc("/getgroupcomments", gc.GetGroupCommentsHandler)

	// handle group events
	router.HandleFunc("/addevent", ge.AddGroupEventHandler)
	router.HandleFunc("/getevent", ge.GetGroupEventHandler)

	// router.HandleFunc("/websocket", ws)
	handler := u.CorsMiddleware(router)
	err = http.ListenAndServe(":8080", handler)
	// create an error to try out the log file
	return err
}

func closeServer() {
	var input string
	time.Sleep(10 * time.Millisecond)
	printcolor("Type 'x' to close the server", "yellow")
	fmt.Scanln(&input)
	if input == "x" {
		printcolor("Server closed", "red")
		os.Exit(0)
	} else if input == "testerror" {
		u.CheckErr(fmt.Errorf("testing error handling"))
		closeServer()
	} else {
		closeServer()
	}
}

// print in color
func printcolor(text string, color string) {
	switch color {
	case "green":
		fmt.Println("\033[32m" + text + "\033[0m")
	case "red":
		fmt.Println("\033[31m" + text + "\033[0m")
	case "yellow":
		fmt.Println("\033[33m" + text + "\033[0m")
	default:
		fmt.Println(text)
	}
}

func setupLogFile() (*os.File, error) {
	filename := "error.log"
	file, err := os.OpenFile(filename, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		return nil, err
	}
	log.SetOutput(file)
	return file, nil
}
