import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CommentCard from "./CommentCard";

// Function to decode a JSON Web Token (JWT)
export function decodeJwt(jwt) {
  if (!jwt) {
    return null; // Or handle the error in an appropriate way
  }

  const base64Url = jwt.split(".")[1];
  if (!base64Url) {
    return null; // Or handle the error in an appropriate way
  }

  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const decoded = atob(base64);
  const result = JSON.parse(decoded);
  return result;
}

function GroupPostCard(props) {
  const [groupPosts, setGroupPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});
  const mygroups = useSelector((state) => state.myGroups);

  useEffect(() => {
    const displayGroupPosts = async () => {
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");
      const url = window.location.href;
      const groupID = url.substring(url.lastIndexOf("/") + 1);

      try {
        const res = await fetch(
          `http://localhost:8080/getgroupposts?groupID=${groupID}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (res.ok) {
          const data = await res.json();

          if (data.groupPosts !== null) {
            const updatedData = data.groupPosts.map((post) => {
              const group = mygroups.find(
                (group) => group.GroupID === post.groupID
              );
              const groupName = group ? group.GroupName : "";
              return { ...post, groupName };
            });
            // Sort the groupPosts array by createAt property
            updatedData.sort(
              (a, b) => new Date(b.createAt) - new Date(a.createAt)
            );
            setGroupPosts(updatedData);
          }
        } else {
          throw new Error("Error occurred while getting the posts");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    displayGroupPosts();
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
    const paragraphs = content.split(/<br\s*\/?>/).map((line, index) => {
      return line ? <p key={index}>{line}</p> : <br key={index} />;
    });
    return paragraphs;
  };

  const displayAllPosts = () => {
    return groupPosts.map((post, index) => {
      const date = new Date(post.createAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      const truncatedContent = truncateContent(post.content, 100);
      const shouldShowMoreButton = post.content.length > 100;

      return (
        <div
          className="bg-white p-4 rounded shadow mt-3"
          key={`${post.groupID}-${index}`}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2">
                <i className="fas fa-users"></i>
              </div>
              <div>
                <p className="m-0 fw-bold">{post.groupName}</p>
                <span className="text-muted fs-7">{date}</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div>
              {isPostExpanded(post.groupID)
                ? parseContentWithBreaks(post.content)
                : parseContentWithBreaks(truncatedContent)}
              {shouldShowMoreButton && (
                <button
                  className="btn btn-link p-0 ms-1"
                  onClick={() => handleShowMore(post.groupID)}
                >
                  {isPostExpanded(post.groupID) ? "See less" : "See more"}
                </button>
              )}
              {post.image && (
                <img
                  src={post.image}
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

  return <div>{displayAllPosts()}</div>;
}

export default GroupPostCard;
