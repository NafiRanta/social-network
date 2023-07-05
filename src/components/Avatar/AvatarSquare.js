import React from 'react';
import './Avatar.css';

function AvatarSquare(props) {
    return(
        <img src={props.avatar} alt="avatar" className="rounded float-right" id="avatarSquare"/>
    )
}

export default AvatarSquare;