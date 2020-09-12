import React, { useState, useEffect } from "react";
import "./chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from 'firebase'
import { Avatar, IconButton } from "@material-ui/core";
import { UseStateValue } from './StateProvider'
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";

function Chat() {
  const [seed, setSeed] = useState("");
  const [{user}, dispatch] = UseStateValue()
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const { roomsId } = useParams();

  useEffect(() => {
    if (roomsId) {
      db.collection("rooms")
        .doc(roomsId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomsId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessage(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomsId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  function inputHandler(e) {
    setInput(e.target.value);
    console.log(e.target.value);
  }

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('rooms').doc(roomsId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-header-info">
          <h3>{roomName}</h3>
  <p>Last seen {new Date(message[message.length - 1]?.timestamp?.toDate())
  .toUTCString()}</p>
        </div>
        <div className="chat-header-right">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {message &&
          message.map((msg) => {
            return <p className={`chat-message ${msg.name === user.displayName
            && "chat-receiver"}`}>
              <span className="chat-name">{msg.name}</span>
              {msg.message}
          <span className="chat-timestamp">{new Date(msg.timestamp
            ?.toDate()).toUTCString()}</span>
            </p>;
          })}
      </div>
      <div className="chat-footer">
        <EmojiEmotionsOutlinedIcon />
        <form>
          <input
            value={input}
            onChange={inputHandler}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send message
          </button>
        </form>
        <MicOutlinedIcon />
      </div>
    </div>
  );
}

export default Chat;
