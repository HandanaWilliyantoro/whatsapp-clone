import React, { useEffect, useState } from "react";
import db from "./firebase";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("")

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if(id) {
      db.collection('rooms').doc(id).collection
      ('messages').orderBy("timestamp", "desc").
      onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => {
          return doc.data()
        }))
      })
    }
  }, [id])

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className="sidebar-chats">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebar-chat-info">
        <h4>{name}</h4>
  <p>{messages[0]?.message}</p>
      </div>
    </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar-chats">
      <div className="sidebar-chat-info">
        <h4>Add new chat</h4>
      </div>
    </div>
  );
}

export default SidebarChat;
