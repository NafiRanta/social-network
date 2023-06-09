import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CommentCard from "./CommentCard";

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

function PostCard(props) {
  const userInfo = useSelector((state) => state.userInfo);
  const [publicPosts, setPublicPosts] = useState([]);
  const [privatePosts, setPrivatePosts] = useState([]);
  const [customPosts, setCustomPosts] = useState([]);
  const token = localStorage.getItem("token");
  const userId = decodeJwt(token).userID;

  useEffect(() => {
    const GetUserPosts = async () => {
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");

      try {
        const res = await fetch("http://localhost:8080/posts", {
          method: "GET",
          headers: headers,
        });

        if (res.ok) {
          const data = await res.json();

          const publicPosts = data.publicPosts;
          const privatePosts = data.privatePosts;
          const customPosts = data.customPosts;
          setPublicPosts(publicPosts);
          setPrivatePosts(privatePosts);
          setCustomPosts(customPosts);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetUserPosts();
  }, []);

  const displayAllPosts = () => {
    return userPosts.map((post, index) => {
      const date = new Date(post.CreateAt);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      const contentLines = post.Content.replace(/\n/g, "<br>")
        .split("<br>")
        .map((line, index) => (
          <p key={index} style={{ whiteSpace: "pre-line" }}>
            {line}
          </p>
        ));

      return (
        <div
          key={`${post.PostID}-${index}`}
          className="bg-white p-4 rounded shadow mt-3"
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <img
                src={userInfo.avatar}
                alt="avatar"
                className="rounded-circle me-2"
              />
              <div>
                <p className="m-0 fw-bold">{props.userDisplayname}</p>
                <span className="text-muted fs-7">{formattedDate}</span>
                <span>{post.PostID}</span>
              </div>
            </div>
            <i
              className="fas fa-ellipsis-h"
              type="button"
              id="post1Menu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></i>
            <ul
              className="dropdown-menu border-0 shadow"
              aria-labelledby="post1Menu"
            >
              <li className="d-flex align-items-center">
                <a
                  className="dropdown-item d-flex justify-content-around align-items-center fs-7"
                  href="#"
                >
                  Edit Post
                </a>
              </li>
              <li className="d-flex align-items-center">
                <a
                  className="dropdown-item d-flex justify-content-around align-items-center fs-7"
                  href="#"
                >
                  Delete Post
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-3">
            <div>
              {contentLines}
              {post.Image && (
                <img
                  src={post.Image}
                  alt="post image"
                  className="img-fluid rounded"
                />
              )}
            </div>
            <CommentCard
              userDisplayname={props.userDisplayname}
              PostID={post.PostID}
            />
          </div>
        </div>
      );
    });
  };

  const allPosts = [
    ...(customPosts || []),
    ...(privatePosts || []),
    ...(publicPosts || []),
  ];

  const sortedPosts = allPosts.sort(
    (a, b) => new Date(a.CreateAt) - new Date(b.CreateAt)
  );

  const userPosts = sortedPosts.filter(
    (post) => post.UserName === userInfo.username
  );

  return <>{displayAllPosts()}</>;
}

export default PostCard;
