package groupPost

import (
	"encoding/json"
	//"fmt"
	"net/http"
	d "socialnetwork/database"
)

// add group post
func AddGroupPostHandler(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("AddGroupPostHandler")
	// Check if the request method is POST
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		//fmt.Println("Method not allowed")
		return
	}

	var groupPost d.GroupPostResponse
	err := json.NewDecoder(r.Body).Decode(&groupPost)
	if err != nil {
		//fmt.Println("error from decode:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	err = d.AddGroupPost(&groupPost)
	if err != nil {
		//fmt.Println("error from addgroupPost:", err)
		http.Error(w, "Failed to add groupPost", http.StatusInternalServerError)
		return
	}

	// Return a success response
	w.WriteHeader(http.StatusCreated)
	//fmt.Println("GroupPost added successfully")
}
