import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, previousPrompts, setRecentPrompt, newChat } =
    useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={() => setExtended((previous) => !previous)}
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {previousPrompts.map((item, index) => {
              return (
                <div className="recent-entry" onClick={() => loadPrompt(item)}>
                  <img src={assets.message_icon} alt="Message" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
