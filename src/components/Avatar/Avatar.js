import React from 'react';
import { useSelector } from 'react-redux';
import './Avatar.css';

function Avatar(props) {
    const userInfo = useSelector((state) => state.userInfo);
    const allUsers = useSelector((state) => state.allUsers);
    if (props.username != null) {
        const matchedUser = allUsers.find((user) => user.UserName === props.username);
        if (matchedUser) {
            return (
                <img src={matchedUser.Avatar} alt="avatar" className="rounded-circle me-2" id="avatar" />
            );
        }
    }

    if (!userInfo) {
        return null;
    }

    return (
        <img src={userInfo.Avatar} alt="avatar" className="rounded-circle me-2" id="avatar" />
    );
}

export default Avatar;