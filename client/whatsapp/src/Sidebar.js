import React, { useState, useEffect } from "react";
import SidebarChat from "./SidebarChat";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import db from "./firebase";
import { UseStateValue } from "./StateProvider";
import "./Sidebar.css";

function Sidebar() {
  const [room, setRoom] = useState([]);
  const [{ user }, dispatch] = UseStateValue();

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setRoom(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src={user?.photoURL } />
        <div className="sidebar-header-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar-chat">
        <SidebarChat addNewChat />
        {room &&
          room.map((rooms) => {
            return (
              <SidebarChat
                key={rooms.id}
                id={rooms.id}
                name={rooms.data.name}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Sidebar;
