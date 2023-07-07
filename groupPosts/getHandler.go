package groupposts

/* //get group posts
func GetGroupPostsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetGroupPostsHandler")

	groupID := r.URL.Query().Get("groupID")
	if groupID == "" {
		fmt.Println("Missing groupID")
		http.Error(w, "Missing groupID", http.StatusBadRequest)
		return
	}
	// get group posts from database
	groupPosts, err := d.GetGroupPostsByGroupID(groupID)
	if err != nil {
		fmt.Println("error from getGroupPostsByGroupID:", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Create a response object containing the group posts
	response := map[string]interface{}{
		"groupPosts": groupPosts,
	}

	responseJSON, err := json.Marshal(response)
	if err != nil {
		fmt.Println("error from marshal response:", err)
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	// Set the Content-Type header to application/json
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)
} */
