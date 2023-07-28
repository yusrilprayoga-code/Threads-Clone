/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import moment from "moment";

const Thread = ({ user, setOpenPopUp, setInteractingThread, getThreads, filteredThread }) => {
  const [replyLength, setReplyLength] = useState(null)
  
  const timePassed = moment().startOf("day").fromNow(filteredThread.timestamp);
  const handleClick = () => {
    setOpenPopUp(true)
    setInteractingThread(filteredThread)
  }

  const postLike = async () => {
  const hasBeenLikedByUser = filteredThread.likes.some( like => like.user_uuid === user.user_uuid)
  if(!hasBeenLikedByUser) {
    filteredThread.likes.push({user_uuid: user.user_uuid})
    try {
      const response = await fetch(`http://localhost:3000/threads/${filteredThread.id}`, 
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filteredThread)
      }
      )
      const result = await response.json()
      console.log("Successfully", result)
      getThreads()
    } catch (error) {
      console.error(error)
    }
    
  }
  }

  const getReplies = async () => {
    try {
     const response = await fetch(`http://localhost:3000/threads?reply_to=${filteredThread.id}`)
     const data = await response.json()
     setReplyLength(data.length)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getReplies()
  }, [filteredThread])
  
  
  return (
    <article className="feed-card">
      <div className="text-container">
        <div>
          <div className="img-container">
            <img src={user.img} alt="profile avatar" />
          </div>
          <div>
            <p>
              <strong>{user.handle}</strong>
            </p>
            <p>{filteredThread.text}</p>
          </div>
        </div>
        <p className="sub-text">{timePassed}</p>
      </div>
      <div className="icons">
        <svg
          onClick={postLike}
          clip-rule="evenodd"
          width="24"
          height="24"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z"
            fill-rule="nonzero"
          />
        </svg>
        <svg
          onClick={handleClick}
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007m0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M5 10v7h10.797l1.594 2h-14.391v-9h-3l4-5 4 5h-3zm14 4v-7h-10.797l-1.594-2h14.391v9h3l-4 5-4-5h3z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" />
        </svg>
      </div>
      <p>
        <span onClick={handleClick}>{replyLength} replies</span> • {" "}
        <span>{filteredThread.likes.length} likes</span>
      </p>
    </article>
  );
};

export default Thread;
