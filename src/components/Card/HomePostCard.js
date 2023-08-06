import React, { useState, useEffect } from "react";
import CommentCard from "../Card/CommentCard";
import { useSelector } from "react-redux";

function HomePostCard() {
  const allUsers = useSelector((state) => state.allUsers);
  const [allMyPosts, setAllMyPosts] = useState([]);

  useEffect(() => {
    const getPublicPosts = async () => {

      try {
        const token = localStorage.getItem("token");
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json");
        const res = await fetch("http://localhost:8080/getAllMyPosts", {
          method: "GET",
          headers: headers,
        });

        if (res.ok) {
          const data = await res.json();  
          console.log(data);          
          setAllMyPosts(data);
        } else {
          console.log("Failed to fetch public posts");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPublicPosts();
  }, []);

  const getUserAvatar = (userName) => {
    const user = allUsers?.find((user) => user.UserName === userName);
    return user ? user.Avatar : "";
  };

  return (
    <div>
      {allMyPosts?.map((post) => (
        <div key={post.PostID} className="bg-white p-4 rounded shadow mt-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <img src={getUserAvatar(post.UserName)} alt="avatar" className="rounded-circle me-2" />
              <div>
                <p className="fw-bold mb-0">{allUsers?.find((user) => user.UserName === post.UserName)?.FirstName + " " + allUsers?.find((user) => user.UserName === post.UserName)?.LastName}</p>
                <span className="text-muted fs-7">{post.CreateAt}</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p>{post.Content}</p>
            {post.Image && (
              <img src={post.Image} alt="post image" className="img-fluid rounded" />
            )}
            <CommentCard userDisplayname={post.UserName} PostID={post.PostID} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePostCard;