package websocket

import (
	"encoding/json"
	"time"
)

type Event struct {
	Type    string          `json:"type"`
	Payload json.RawMessage `json:"payload"`
}

type EventHandler func(event Event, c *Client) error

const (
	EventSendMessage     = "send_message"
	EventNewMessage      = "new_message"
	EventAcknowledgement = "acknowledgement"
	EventTyping          = "send_typing"
)

type SendMessageEvent struct {
	Message  string `json:"message"`
	Sender   string `json:"sender"`
	Receiver string `json:"receiver"`
}

type newMessageEvent struct {
	SendMessageEvent
	Sent time.Time `json:"sent"`
}

type AcknowledgementEvent struct {
	LoggedInUsers []string `json:"loggedInUsers"`
}

type TypingEvent struct {
	Sender   string `json:"sender"`
	Receiver string `json:"receiver"`
}
