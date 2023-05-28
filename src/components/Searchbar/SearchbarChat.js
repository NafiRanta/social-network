import React from "react";

function SearchbarChat() {
    return(
        <div className="search-bar">
        <div className="input-group">
            <input className="form-control" placeholder="Search" />
            <div className="input-group-btn">
                <button type="button" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </div>
    </div>
    )
}
export default SearchbarChat;