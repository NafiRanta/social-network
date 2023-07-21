import React from 'react';
import { useSelector } from 'react-redux';
import './Avatar.css';

function Avatar(props) {
    const userInfo = useSelector((state) => state.userInfo);
    if (!userInfo) {
        return null;
    }

    return(
        <img src={userInfo.Avatar} alt="avatar" className="rounded-circle me-2" id="avatar"/>
    )
}

export default Avatar;