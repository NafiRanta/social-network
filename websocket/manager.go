package websocket

import (
	"fmt"
	"net/http"
)

func NewManager(w http.ResponseWriter, r *http.Request) {
	fmt.Println("new manager")
}
