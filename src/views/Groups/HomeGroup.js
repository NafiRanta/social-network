import React, { useState, useEffect } from "react";
import CreateGroupPost from "../../components/CreatePost/CreateGroupPost";
import { useSelector } from "react-redux";
import GroupSidenav from "../../views/Groups/GroupSidenav";
import Topnav from "../../views/Topnav";
import CommentCard from "../../components/Card/CommentCard";

function HomeGroup(props) {
  const userInfo = useSelector((state) => state.userInfo);
  const mygroups = useSelector((state) => state.myGroups);
  console.log("mygroups", mygroups);
  const [myGroupsPosts, setMyGroupsPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({}); // Added state for expanded posts

  useEffect(() => {
    const getUserGroupsPosts = async (e) => {
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");
      try {
        const res = await fetch("http://localhost:8080/getmygroupsposts", {
          method: "GET",
          headers: headers,
        });

        if (res.ok) {
          const data = await res.json();
          // get group names using data.GroupID from mygroups and add to data
          console.log("data", data);
          const updatedData = data.allMyGroupsPosts.map((post) => {
            const group = mygroups.find(
              (group) => group.GroupID === post.GroupID
            );
            const groupName = group ? group.GroupName : "";
            return { ...post, groupName };
          });
          console.log("updatedData", updatedData);
          setMyGroupsPosts(updatedData);
        } else {
          console.log("error");
          // alert("Something went wrong. Please try again later.");
        }
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };
    getUserGroupsPosts();
  }, []);

  const handleShowMore = (postId) => {
    setExpandedPosts((prevExpandedPosts) => ({
      ...prevExpandedPosts,
      [postId]: !prevExpandedPosts[postId],
    }));
  };

  const isPostExpanded = (postId) => {
    return expandedPosts[postId];
  };

  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) {
      return content;
    }

    const truncatedContent = content.slice(0, maxLength);
    const lastSpaceIndex = truncatedContent.lastIndexOf(" ");
    const trimmedText = truncatedContent.slice(0, lastSpaceIndex);
    return `${trimmedText}...`;
  };

  const parseContentWithBreaks = (content) => {
    return content
      .split("<br>")
      .map((line, index) => <p key={index}>{line}</p>);
  };

  const displayMyGroupsPosts = () => {
    // Sort the myGroupsPosts array by CreateAt in descending order
    const sortedPosts = myGroupsPosts.sort((a, b) => {
      const dateA = new Date(a.CreateAt);
      const dateB = new Date(b.CreateAt);
      return dateB - dateA;
    });

    return sortedPosts.map((post, index) => {
      const date = new Date(post.CreateAt);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      const truncatedContent = truncateContent(post.Content, 100);
      const shouldShowMoreButton = post.Content.length > 100;

      return (
        <div
          className="bg-white p-4 rounded shadow mt-3"
          key={`${post.GroupID}-${index}`}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2">
                <i className="fas fa-users"></i>
              </div>
              <div>
                <p className="m-0 fw-bold">{post.groupName}</p>
                <span className="text-muted fs-7">{formattedDate}</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div>
              {isPostExpanded(post.GroupID)
                ? parseContentWithBreaks(post.Content)
                : parseContentWithBreaks(truncatedContent)}
              {shouldShowMoreButton && (
                <button
                  className="btn btn-link p-0 ms-1"
                  onClick={() => handleShowMore(post.GroupID)}
                >
                  {isPostExpanded(post.GroupID) ? "See less" : "See more"}
                </button>
              )}
              {post.Image && (
                <img
                  src={post.Image}
                  alt="post image"
                  className="img-fluid rounded"
                />
              )}
            </div>
            <CommentCard userDisplayname={props.userDisplayname} />
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Topnav
        userDisplayname={props.userDisplayname}
      />
      <div className="container-fluid">
        <div className="row justify-content-evenly">
          <div className="col-12 col-lg-3">
            <GroupSidenav
              userDisplayname={props.userDisplayname}
            />
          </div>
          <div className="col-12 col-lg-6 pb-5 p-3">
            <div
              className="d-flex flex-column justify-content-center w-100"
              id="d-flex-postcontainer-homeGroup"
            >
              <h5>
                <strong>Your Feed</strong>
              </h5>
              <CreateGroupPost
                userDisplayname={props.userDisplayname}
              />
              {displayMyGroupsPosts()}
            </div>
          </div>
          <div className="col-12 col-lg-3"></div>
        </div>
      </div>
    </div>
  );
}

export default HomeGroup;
