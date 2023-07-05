import React, { useState, useEffect } from "react";
import './Card.css';
import { Link } from 'react-router-dom';
import { set } from "draft-js/lib/DefaultDraftBlockRenderMap";
function GroupProfileCard(props) {
    console.log("props", props);
    console.log("username", props.userInfo?.username)
    const [username, setUsername] = useState("");
    const [groupsToDisplay, setGroupsToDisplay] = useState([]);
    useEffect(() => {
        const displayUserGroups = async (e) => {
                const token = localStorage.getItem("token");
                const headers = new Headers();
                headers.append("Authorization", "Bearer " + token);
                headers.append("Content-Type", "application/json");
                try {
                    const res = await fetch("http://localhost:8080/getmygroups", {
                        method: "GET",
                        headers: headers,
                    });
                    if (res.ok) {
                        const data = await res.json();
                        console.log("data", data);
                        const username = props.userInfo?.username;
                        setUsername(username);
                        const invitedGroups = data.userMemberGroups;
                        const adminGroups = data.userAdminGroups
                        const allGroups = data.allGroups;
                        ;

                        // add all groups to one array and sort by CreateAt
                        const allMyGroups = [
                            ...(invitedGroups || []),
                            ...(adminGroups|| []),
                        ];

                        const currentPath = window.location.pathname;
                        if (currentPath === "/mygroups") {
                            setGroupsToDisplay(allMyGroups);
                          } else if (currentPath === "/allgroups") {
                            setGroupsToDisplay(allGroups);
                          }
                        
                    } else {
                        console.log("error");
                    }
                } catch (error) {
                    // Handle error
                    console.log(error);
                }
            };
        
            displayUserGroups();
    }, []);

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
            // Update the component state to reflect the user's membership status in the group
            setGroupsToDisplay((prevGroups) =>
              prevGroups.map((group) =>
                group.GroupID === groupId
                  ? { ...group, MemberUsernames: [...group.MemberUsernames, username] }
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
        console.log("group", group);
        if (window.location.pathname === "/allgroups") {
          const memberUsernames = JSON.parse(group.MemberUsernames);
          console.log("group.name", group.GroupName, "memberUsernames", memberUsernames);
          const isMember = memberUsernames.includes(props.userInfo?.username);
          console.log("memberUsernames", memberUsernames, isMember);
          const isAdmin =
            username && group.Admin === username;
            console.log("isAdmin", isAdmin);
    
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
          {groupsToDisplay.map((group) => (
            <div className="cols col-lg-3" key={group.GroupID}>
              <div className="card shadow d-flex justify-content-center align-items-center">
                <div className="card-body">
                  <h3 className="card-title">
                    <strong>{group.GroupName}</strong>
                  </h3>
                  <p className="card-text">{group.GroupDescription}</p>
                  {renderGroupActions(group)}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
}

export default GroupProfileCard;