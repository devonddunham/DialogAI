import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/context.jsx";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const cardClick = async (prompt) => {
    setInput("");
    await onSent(prompt);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>DialogAI</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello,</span>
                <p>How can I help you today?</p>
              </p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() => cardClick("Suggest places for a road trip")}
              >
                <p>Suggest places for a road trip</p>
                <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div
                className="card"
                onClick={() => cardClick("Briefly summarize 'urban planning'")}
              >
                <p>Briefly summarize 'urban planning'</p>
                <img src={assets.bulb_icon} alt="Lightbulb" />
              </div>
              <div
                className="card"
                onClick={() => cardClick("Brainstorm team bonding ideas")}
              >
                <p>Brainstorm team bonding ideas</p>
                <img src={assets.message_icon} alt="Message" />
              </div>
              <div
                className="card"
                onClick={() => cardClick("What is ReactJS")}
              >
                <p>What is ReactJS</p>
                <img src={assets.code_icon} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a message here..."
            />
            <div>
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
