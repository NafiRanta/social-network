package websocket

// will be used to manage everything related to the web socket

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	d "socialnetwork/database"

	"github.com/gorilla/websocket"
)

var websocketUpgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		// Allow requests from the frontend origin (e.g., http://localhost:3000)
		// Modify the origin check based on your specific frontend URL or allow all origins for development purposes
		return r.Header.Get("Origin") == "http://localhost:3000"
	},
}

type Manager struct {
	clients       ClientList // map of clients
	sync.RWMutex             // hav emany ppl connecting to the api, so need to protect it
	otps          RetentionMap
	handlers      map[string]EventHandler // map of event type as key and event handler as value
	loggedinUsers map[string]string       // map of userId as key and username as value
	usersConn     map[string]*Client      // map of username as key and client as value
}

// Creates the manager
func NewManager(ctx context.Context) *Manager {
	m := &Manager{
		clients:       make(ClientList),
		handlers:      make(map[string]EventHandler),
		otps:          NewRetentionMap(ctx, 5*time.Second),
		loggedinUsers: make(map[string]string),  // map of otp as key and username as value
		usersConn:     make(map[string]*Client), // map of username as key and client as value
	}
	m.setupEventHandlers()
	return m
}

// sets up the different types of event handlers
func (m *Manager) setupEventHandlers() {
	m.handlers[EventTyping] = SendTyping
	m.handlers[EventSendMessage] = SendMessage
	m.handlers[EventAcknowledgement] = SendLoggedinUsers
	m.handlers[EventNotification] = SendNotification
	m.handlers[messageNotification] = SendMessageNotification
}

// Send a notification to the reciever client
func SendNotification(event Event, c *Client) error {
	var notificationevent NotificationEvent
	// convert event payload from json to struct
	if err := json.Unmarshal(event.Payload, &notificationevent); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}
	data, err := json.Marshal(notificationevent)
	if err != nil {
		return fmt.Errorf("failed to marshal broadcast message: %v", err)
	}
	outgoingEvent := Event{
		Payload: data,
		Type:    EventNotification,
	}
	for client := range c.manager.clients {
		if c.manager.loggedinUsers[client.otp] == notificationevent.Receiver {
			client.egress <- outgoingEvent
		}
	}
	return nil
}

func SendMessageNotification(event Event, c *Client) error {
	var notificationevent NotificationEvent
	// convert event payload from json to struct
	if err := json.Unmarshal(event.Payload, &notificationevent); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}
	data, err := json.Marshal(notificationevent)
	if err != nil {
		return fmt.Errorf("failed to marshal broadcast message: %v", err)
	}
	outgoingEvent := Event{
		Payload: data,
		Type:    messageNotification,
	}
	for client := range c.manager.clients {
		if c.manager.loggedinUsers[client.otp] == notificationevent.Receiver {
			client.egress <- outgoingEvent
		}
	}
	return nil
}

// Send a typing event to the reciever client
func SendTyping(event Event, c *Client) error {
	var typingevent TypingEvent
	// convert event payload from json to struct
	if err := json.Unmarshal(event.Payload, &typingevent); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}
	data, err := json.Marshal(typingevent)
	if err != nil {
		return fmt.Errorf("failed to marshal broadcast message: %v", err)
	}
	outgoingEvent := Event{
		Payload: data,
		Type:    EventTyping,
	}
	for client := range c.manager.clients {
		if c.manager.loggedinUsers[client.otp] == typingevent.Receiver {
			client.egress <- outgoingEvent
		}
	}
	return nil
}

// Send a chat message to all clients
func SendMessage(event Event, c *Client) error {
	var chatevent SendMessageEvent
	if err := json.Unmarshal(event.Payload, &chatevent); err != nil {
		return fmt.Errorf("bad payload in request: %v", err)
	}
	var broadMessage newMessageEvent
	broadMessage.Sent = time.Now()
	broadMessage.Message = chatevent.Message
	broadMessage.Sender = chatevent.Sender
	broadMessage.Receiver = chatevent.Receiver
	data, err := json.Marshal(broadMessage)
	if err != nil {
		return fmt.Errorf("failed to marshal broadcast message: %v", err)
	}
	outgoingEvent := Event{
		Payload: data,
		Type:    EventNewMessage,
	}
	for client := range c.manager.clients {
		client.egress <- outgoingEvent
	}
	return nil
}

// Send the array of logged in users to all clients
func SendLoggedinUsers(event Event, c *Client) error {
	var acknowledgementevent AcknowledgementEvent
	m := c.manager
	var users []string
	// store usernames from m.usersConn map to array
	for _, user := range m.loggedinUsers {
		users = append(users, user)
	}
	fmt.Println("users", users)
	acknowledgementevent.LoggedInUsers = users
	data, err := json.Marshal(acknowledgementevent)
	if err != nil {
		return fmt.Errorf("failed to marshal online users: %v", err)
	}
	outgoingEvent := Event{
		Payload: data,
		Type:    EventAcknowledgement,
	}
	for client := range c.manager.clients {
		client.egress <- outgoingEvent
	}
	return nil
}

// serveWS will updgrade to the websocket connection
func (m *Manager) ServeWS(w http.ResponseWriter, r *http.Request) {
	fmt.Println("new websocket connection")
	_ = m.otps.NewOTP()
	otp := r.URL.Query().Get("otp")
	// json stringify otp
	fmt.Println("userId", otp)
	// get username from database according to otp witch is equal to userId
	user, err := d.GetUserByID(otp)
	if err != nil {
		fmt.Println("error getting user", err)
	}
	// add user to loggedinUsers
	fmt.Println("user.UserName", user.UserName)
	m.addLoggedInUser(user.UserName, otp)
	if otp == "" {
		fmt.Println("no otp")
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	log.Println("new connection")

	// upgrade regular http connection to a websocket connection
	conn, err := websocketUpgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	// create a new client
	client := NewClient(conn, m, otp)
	// add the client to the manager with username as key and client as value
	m.usersConn[m.loggedinUsers[otp]] = client

	// add the client to the manager
	m.addClient(client)

	// set client.otp to the otp
	client.otp = otp
	// Start client processes
	go client.readMessages()
	go client.writeMessages()
	// wait 500ms before sending the acknowledgement
	time.Sleep(50 * time.Millisecond)

	var request Event
	// Extract values from the map to values slice
	values := make([]string, 0, len(m.loggedinUsers))
	for _, v := range m.loggedinUsers {
		values = append(values, v)
	}

	// Convert the values to JSON
	jsonData, err := json.Marshal(values)
	if err != nil {
		log.Fatal(err)
	}

	// Assign the JSON to request.Payload
	request.Payload = jsonData
	request.Type = EventAcknowledgement
	if err := client.manager.routeEvent(request, client); err != nil {
		log.Printf("error routing event: %v", err)
	}
}

// logs in a user and creates an otp and adds the user to the manager
// func (m *Manager) loginHandler(w http.ResponseWriter, r *http.Request) {
// 	type userLoginRequest struct {
// 		EmailUsername string `json:"emailUsername"`
// 		Password      string `json:"password"`
// 	}

// 	var req userLoginRequest
// 	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	// get users from Users database
// 	selDB, err := s.Database.Query("SELECT ID, Username, Firstname, Lastname, Gender, Email, Password, Dob FROM Users")
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer selDB.Close()
// 	var users []u.User
// 	for selDB.Next() {
// 		var user u.User
// 		err = selDB.Scan(&user.ID, &user.Username, &user.Firstname, &user.Lastname, &user.Gender, &user.Email, &user.Password, &user.DateOfBirth)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		users = append(users, user)
// 	}

// 	// loop through users and check that username, password, and email match
// 	for _, user := range users {
// 		if (user.Email == req.EmailUsername || user.Username == req.EmailUsername) && user.Password == req.Password {

// 			otp := m.otps.NewOTP()

// 			m.addLoggedInUser(user.Username, otp.Key)
// 			s.AddOtpToDb(otp.Key, m.loggedinUsers[otp.Key])
// 			user.Otp = otp.Key
// 			data, err := json.Marshal(user)
// 			if err != nil {
// 				log.Println(err)
// 				return
// 			}
// 			w.WriteHeader(http.StatusOK)
// 			w.Write(data)
// 			return
// 		}
// 	}
// 	w.WriteHeader(http.StatusUnauthorized)
// }

// add to loggedinUsers userId as key and username as value
func (m *Manager) addLoggedInUser(username, userId string) {
	m.Lock()
	defer m.Unlock()
	// add username to loggedinUsers
	m.loggedinUsers[userId] = username
}

// addClient adds the client to the manager
func (m *Manager) addClient(client *Client) {
	m.Lock() // when we have 2 ppl connecting at the same time, we will not modify the map at the same time
	defer m.Unlock()
	// when there is a new client, we will add client to the map
	m.clients[client] = true
}

// removeClient removes the client from the manager
func (m *Manager) removeClient(client *Client) {
	m.Lock()
	defer m.Unlock()
	// if client exists, close the connection and delete the client from clientList
	if _, ok := m.clients[client]; ok {
		client.connection.Close()
		delete(m.clients, client)
	}
}

// routeEvent will route the event to the correct handler
func (m *Manager) routeEvent(event Event, c *Client) error {
	// check if the event type is in the map
	if handler, ok := m.handlers[event.Type]; ok {
		if err := handler(event, c); err != nil {
			fmt.Println("error handler", err)
			return err
		}
		return nil
	} else {
		return errors.New("no handler for event type")
	}
}
