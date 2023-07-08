import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import CommentCard from './CommentCard';

function GroupPostCard(props) {
  const [groupPosts, setGroupPosts] = useState([]);
  const mygroups = useSelector((state) => state.myGroups);
  console.log("mygroups useselector ", mygroups)
  useEffect(() => {
    const displayGroupPosts = async () => {
     
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");
      const url = window.location.href;
      const groupID = url.substring(url.lastIndexOf('/') + 1);
      try {
        const res = await fetch(`http://localhost:8080/getgroupposts?groupID=${groupID}`, {
          method: "GET",
          headers: headers,
        });
        if (res.ok) {
          const data = await res.json();
          console.log("data singlegroup post", data);
          
          if (data.groupPosts !== null) {
            const updatedData = data.groupPosts.map((post) => {
              const group = mygroups.find((group) => group.GroupID === post.groupID);
              const groupName = group ? group.GroupName : "";
              return { ...post, groupName };
            });
            setGroupPosts(updatedData);
            console.log("updatedData", updatedData)
          }


        } else {
          throw new Error("Error occurred while getting the posts");
        }
      }
      catch (error) {
        console.log("error", error);
      }
    }
    displayGroupPosts();
  }, []);

  return (
    <div>
      {groupPosts.map((post, index) => (
        <div className="bg-white p-4 rounded shadow mt-3" key={`${ post.groupID}-${index}`}>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="rounded-circle p-1 bg-gray d-flex align-items-center justify-content-center mx-2" >
                  <i className="fas fa-users"></i>
              </div>
              <div>
                <p className="m-0 fw-bold">{post.groupName}</p>
                <span className="text-muted fs-7">
                  {new Date(post.createAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="post image" className="img-fluid rounded" />}
            </div>
            <CommentCard userDisplayname={props.userDisplayname} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupPostCard;