import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import './Card.css';
import { Link } from 'react-router-dom';
import { set } from "draft-js/lib/EditorState";
//import { set } from "draft-js/lib/DefaultDraftBlockRenderMap";
function GroupProfileCard(props) {
    const dispatch = useDispatch();
    const [groupsToDisplay, setGroupsToDisplay] = useState([]);
    const currentPath = window.location.pathname;
    const allgroups = useSelector((state) => state.allGroups);
    const userInfo = useSelector((state) => state.userInfo);
    const [mygroups, setMyGroups] = useState([]);
    const [pendingJoinRequest, setPendingJoinRequest] = useState(false);
    
    useEffect(() => {
      if (currentPath === "/mygroups") {
        let mygroups = [];
        // get groups where user is a member or admin and push to mygroups
        allgroups.forEach((group) => {
          const memberUsernames = JSON.parse(group.MemberUsernames) || [];
          console.log("memberUsernames", memberUsernames)
          const isAdmin = group.AdminID === userInfo.UserName;
          const isMember =(memberUsernames.includes(userInfo.UserName));
          if (isAdmin || isMember) {
            mygroups.push(group);
          }
          setMyGroups(mygroups);
        });
        console.log("mygroups", mygroups);
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
          const url = `http://localhost:8080/joinrequest?groupID=${groupId}`;
          const res = await fetch(url, {
            method: "POST",
            headers: headers,
          });
    
          if (res.ok) {
            setPendingJoinRequest(true);
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

      console.log("groupsToDisplay", groupsToDisplay);
      console.log("pendingJoinRequest", pendingJoinRequest)
      const renderGroupActions = (group) => {
        if (window.location.pathname === "/allgroups") {
          console.log("group rendergroupactions", group);
      
          const memberUsernames = JSON.parse(group.MemberUsernames) || [];
          const isMember = memberUsernames.includes(userInfo.UserName);
          console.log("isMember", isMember)
          const isAdmin = group.AdminID === userInfo.UserName;
          const isPendingJoinRequest = pendingJoinRequest && !isMember && !isAdmin;
      
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
                className={`btn btn-primary btn-sm d-flex justify-content-center align-items-center ${isPendingJoinRequest ? "disabled" : ""}`}
                id="joinbutton"
                onClick={() => handleJoinGroup(group.GroupID)}
                disabled={isPendingJoinRequest}
              >
                {isPendingJoinRequest ? "Pending Join" : "Join" ? "Join" : "Join"}
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
        <div className="row1"  >
         {groupsToDisplay ? (
            groupsToDisplay.map((group, index) => (
              <div className="cols col-lg-3" key={group.GroupID + index}>
                <div className="card shadow d-flex justify-content-center align-items-center" id="card">
                  <div className="card-body">
                    <div className="card-title">
                      <strong>{group.GroupName}</strong>
                    </div>
                    <p className="card-text">{group.GroupDescription}</p>
                  </div>
                  <div id="viewbutton">
                    {renderGroupActions(group)}
                  </div>
                </div>
              </div>

            ))
          ) 
          : (
            <div className="d-flex justify-content-center align-items-center">
              <p>No groups to display</p>
            </div>
            )}
        </div>
      );
}

export default GroupProfileCard;