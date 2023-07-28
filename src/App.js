/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Feed from "./components/Feed";
import WriteIcon from "./components/WriteIcon";
import PopUp from "./components/PopUp";

function App() {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState(null);
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
  const [filteredThreads, setFilteredThreads] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [interactingThread, setInteractingThread] = useState(null);
  const [popUpFeedThreads, setPopUpFeedThreads] = useState(null);
  const [text, setText] = useState("");

  const userId = "866a694b-d947-4dd7-8605-8a72808f6268";

  const handleClick = () => {
    setPopUpFeedThreads(null)
    setInteractingThread(null)
    setOpenPopUp(true)
  }

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${userId}`
      );
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getThreads = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?thread+from=${userId}`
      );
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getThreadsFeed = () => {
    if (viewThreadsFeed) {
      const standAloneThreads = threads?.filter(
        (thread) => thread.reply_to === null
      );
      setFilteredThreads(standAloneThreads);
    }
    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter(
        (thread) => thread.reply_to !== null
      );
      setFilteredThreads(replyThreads);
    }
  };

  const getReplies = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?reply-to=${interactingThread.id}`
      );
      const data = await response.json();
      setPopUpFeedThreads(data);
    } catch (error) {
      console.error(error);
    }
  };

  const postThread = async () => {
    const thread = {
        "timestamp": new Date(),
        "thread_from": user.user_uuid,
        "thread_to": user.user_uuid || null,
        "reply_to": interactingThread?.id || null,
        "text": text,
        "likes": []
    }
    try {
      const response = await fetch(`http://localhost:3000/threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(thread)
      })
      const result = await response.json()
      console.log("success", result)
      getThreads()
      getReplies()
      setText("")
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
    getThreads();
  }, []);

  useEffect(() => {
    getThreadsFeed();
  }, [user, threads, viewThreadsFeed]);

  useEffect(() => {
    getReplies();
  }, [interactingThread]);

  console.log('interacting thread', interactingThread);

  return (
    <>
      {user && (
        <div className="App">
          <Navbar url={user.instagram_url} />
          <Header
            user={user}
            viewThreadsFeed={viewThreadsFeed}
            setViewThreadsFeed={setViewThreadsFeed}
          />
          <Feed
            user={user}
            setOpenPopUp={setOpenPopUp}
            filteredThreads={filteredThreads}
            getThreads={getThreads}
            setInteractingThread={setInteractingThread}
          />
          {openPopUp && (
            <PopUp
              user={user}
              setOpenPopUp={setOpenPopUp}
              popUpFeedThreads={popUpFeedThreads}
              text={text}
              setText={setText}
              postThread={postThread}
            />
          )}
          <div onClick={handleClick}>
            <WriteIcon />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
