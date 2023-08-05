import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CommentCard from './CommentCard';


function OthersPostCard(props) {
  const clickedProfileInfo = useSelector((state) => state.clickedProfileInfo); // Get the user info from redux store
 const username = clickedProfileInfo.UserName;
  const [publicPosts, setPublicPosts] = useState([]);
  const [privatePosts, setPrivatePosts] = useState([]);
  const [customPosts, setCustomPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState([]); // State for expanded posts

  useEffect(() => {
    const GetUserPosts = async (e) => {
      const token = localStorage.getItem("token");
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      headers.append("Content-Type", "application/json");
      try {
        const res = await fetch(`http://localhost:8080/getpostsbyusername?username=${username}`, {
          method: "GET",
          headers: headers,
        });
        
        if (res.ok) {
          const data = await res.json();
          // get all posts of that matched with userID
          const publicPosts = data.publicPosts ;
          const privatePosts = data.privatePosts;
          const customPosts = data.customPosts;
          setPublicPosts(publicPosts);
          setPrivatePosts(privatePosts);
          setCustomPosts(customPosts);
        } else {
          console.log("error");
        }
      }
      catch (error) {
        // Handle error
        console.log(error);
      }
     
    };
    GetUserPosts();
  }, [clickedProfileInfo.UserName]);


  const handleShowMore = (postId) => {
    // Toggle the expanded state of a post
    setExpandedPosts((prevExpandedPosts) => {
      if (prevExpandedPosts.includes(postId)) {
        return prevExpandedPosts.filter((id) => id !== postId);
      } else {
        return [...prevExpandedPosts, postId];
      }
    });
  };

  const isPostExpanded = (postId) => {
    // Check if a post is expanded
    return expandedPosts.includes(postId);
  };

  const truncateContent = (content, maxLength) => {
    // Truncate the content of a post and add ellipsis if it exceeds maxLength
    if (content.length <= maxLength) {
      return content;
    }

    const truncatedContent = content.slice(0, maxLength);
    const lastLineBreakIndex = truncatedContent.lastIndexOf("<br>");

    // Find the last complete line before the truncation point
    const truncatedText = truncatedContent.slice(
      0,
      lastLineBreakIndex !== -1 ? lastLineBreakIndex : undefined
    );

    // Remove trailing <br> tags
    const trimmedContent = truncatedText.replace(/<br>$/, "");

    const contentLines = trimmedContent.split("<br>").map((line, index) => (
      <p key={index}>
        {line}
        <br />
      </p>
    ));

    return <>{contentLines}</>;
  };

  const allPosts = [
    ...(customPosts || []),
    ...(privatePosts || []),
    ...(publicPosts || []),
  ];

  const sortedPosts = allPosts.sort(
    (a, b) => new Date(a.CreateAt) - new Date(b.CreateAt)
  );

  const displayAllPosts = () => {
    // display all posts of that matched with userID
    
    return allPosts.map((post) => {
      // format createAt 2023-06-20T13:13:30.343Z to 20 Jun 2023 13:13
      const date = new Date(post.CreateAt);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });

      const content = post.Content;
      const truncatedContent = truncateContent(content, 300);
      const shouldShowMoreButton = content.length > 300;

      const contentLines = post.Content.split("<br>").map((line, index) => (
        <p key={index}>
          {line}
          <br />
        </p>
      ));

      const isExpanded = isPostExpanded(post.PostID);
      return (
        <div key={`${post.Privacy + post.PostID}`} className="bg-white p-4 rounded shadow mt-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <img src={clickedProfileInfo.Avatar} alt="avatar" className="rounded-circle me-2"/>
              <div>
                <p className="m-0 fw-bold">{clickedProfileInfo.FirstName + " " + clickedProfileInfo.LastName}</p>
                <span className="text-muted fs-7">{formattedDate}</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div>
              {isExpanded ? contentLines : truncatedContent}
              {shouldShowMoreButton && (
                <button
                  onClick={() => handleShowMore(post.PostID)}
                  className="btn btn-link p-0 ms-1"
                >
                  {isExpanded ? "See less" : "See more"}
                </button>
              )}
            </div>
            {post.Image && (
              <img
                src={post.Image}
                alt="post image"
                className="img-fluid rounded"
              />
            )}
            <CommentCard
              userDisplayname={props.userDisplayname}
              PostID={post.PostID}
            />
          </div>
        </div>
      )
    })
  }

    return(
      <>
        {displayAllPosts()}
      </>
      )
}

export default OthersPostCard;