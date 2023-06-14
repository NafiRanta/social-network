import React from 'react';
import './Avatar.css';

function Avatar(props) {
    return(
        <img src={props.profilePicture} alt="avatar" className="rounded-circle me-2" id="avatar"/>
    )
}

export default Avatar;