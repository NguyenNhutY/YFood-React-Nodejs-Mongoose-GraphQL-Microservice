import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { dbChatBoxSteps } from "../../types"; // Ensure that dbChatBoxSteps is properly typed
import "./chatBotBtn.scss";
import imgChatBot from "../../assets/frontend_assets/robot.png"; // Ensure correct path

const ChatBotBtn: React.FC = () => {
  const [showChatBot, setShowChatBot] = useState<boolean>(false);

  return (
    <div className='chatbot-container'>
      <button
        onClick={() => setShowChatBot((prev) => !prev)}
        className='toggle-btn'
      >
        <img
          className='img-chatbot'
          src={imgChatBot}
          alt='Chatbot Toggle Button'
        />
      </button>
      {showChatBot && (
        <div className='chatbot-widget'>
          <ChatBot className='chatbot' steps={dbChatBoxSteps} />
        </div>
      )}
    </div>
  );
};

export default ChatBotBtn;
