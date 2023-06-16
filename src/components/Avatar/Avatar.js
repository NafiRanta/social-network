import React from 'react';
import './Avatar.css';

function Avatar(props) {
    // handle null for userInfo
    if (!props.userInfo) {
        return null;
    }

    return(
        <img src={props.userInfo.profilePicture} alt="avatar" className="rounded-circle me-2" id="avatar"/>
    )
}

export default Avatar;