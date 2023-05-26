import React from "react";

function Searchbar(){
    return(
        <div class="search-bar">
        <div class="input-group">
            <input class="form-control" placeholder="Search" />
            <div class="input-group-btn">
                <button type="button" class="btn btn-primary">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
    </div>
    )
}
export default Searchbar;