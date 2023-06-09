import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import './Card.css';
import { Link } from 'react-router-dom';
//import { set } from "draft-js/lib/DefaultDraftBlockRenderMap";
function GroupProfileCard(props) {
    const [groupsToDisplay, setGroupsToDisplay] = useState([]);
    const currentPath = window.location.pathname;
    const allgroups = useSelector((state) => state.allGroups);
    console.log("allgroups", allgroups);
    const mygroups = useSelector((state) => state.myGroups);
    
    useEffect(() => {
      if (currentPath === "/mygroups") {
          setGroupsToDisplay(mygroups);
        } else if (currentPath === "/allgroups") {
          setGroupsToDisplay(allgroups);
        }
    }, [mygroups, allgroups, currentPath]);
    
    const handleJoinGroup = async (groupId) => {
        try {
          const token = localStorage.getItem("token");
          const headers = new Headers();
          headers.append("Authorization", "Bearer " + token);
          headers.append("Content-Type", "application/json");
          const url = `http://localhost:8080/joingroup?groupID=${groupId}`;
          const res = await fetch(url, {
            method: "POST",
            headers: headers,
          });
    
          if (res.ok) {
            setGroupsToDisplay((prevGroups) =>
              prevGroups.map((group) =>
                group.GroupID === groupId
                  ? { ...group, MemberUsernames: [...group.MemberUsernames, props.username] }
                  : group
              )
            );
          } else {
            throw new Error("Failed to join the group.");
          }
        } catch (error) {
          console.log("ERROR",error);
        }
      };

    const renderGroupActions = (group) => {
        if (window.location.pathname === "/allgroups") {
          console.log("group rendergroupactions", group )
          console.log("props", props)
          const memberUsernames = JSON.parse(group.MemberUsernames);
          const isMember = memberUsernames.includes(props.username);
          const isAdmin = props.username && group.Admin === props.username;
          if (isMember || isAdmin) {
            return (
              <Link
                to={`/singlegroup/${group.GroupID}`}
                className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
              >
                View
              </Link>
            );
          } else {
            return (
                <button
                className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
                onClick={() => handleJoinGroup(group.GroupID)}
              >
                Join
              </button>
            );
          }
        } else {
          return (
            <Link
              to={`/singlegroup/${group.GroupID}`}
              className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
            >
              View
            </Link>
          );
        }
      }; 
    
      return (
        <div className="row1">
         {groupsToDisplay.map((group, index) => ( 
            <div className="cols col-lg-3" key={group.GroupID + index} >
              <div className="card shadow d-flex justify-content-center align-items-center">
                <div className="card-body">
                  <h3 className="card-title">
                    <strong>{group.GroupName}</strong>
                  </h3>
                  <p className="card-text"> {group.GroupDescription}</p>
                 {renderGroupActions(group)}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
}

export default GroupProfileCard;