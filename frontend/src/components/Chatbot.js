import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(true); // Manage chat visibility
  const messagesEndRef = useRef(null);

  const gemini = async (userQuestion) => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyDhiQ6NBSbzNP4dEWMKyzaE97oVdeASbO0");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are a highly knowledgeable assistant for the Star Light Tracker project. A user has asked the following question about astronomy or star tracking: "${userQuestion}". Provide a clear, concise, and accurate response.`;

      const result = await model.generateContent(prompt);
      setAiResponse(result ? result.response.text : "No response received.");
    } catch (error) {
      console.error("Error with Gemini API:", error);
      setAiResponse("Sorry, there was an error while fetching the response.");
    }
  };

  const handleSend = async () => {
    if (!userInput.trim()) {
      return;
    }

    const newUserMessage = { type: "user", text: userInput };
    setMessages((prev) => [...prev, newUserMessage]);

    setUserQuestion(userInput);
    setUserInput("");
  };

  useEffect(() => {
    if (userQuestion.trim()) {
      gemini(userQuestion);
    }
  }, [userQuestion]);

  useEffect(() => {
    if (aiResponse.trim()) {
      const newBotMessage = { type: "bot", text: aiResponse };
      setMessages((prev) => [...prev, newBotMessage]);
      setAiResponse("");
    }
  }, [aiResponse]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {isChatOpen ? (
        <div id="chat-widget" className="chat-widget chat-open">
          <div className="chat-window">
            <div className="chat-header">
              <button
                onClick={() => setMessages([])}
                className="new-chat-btn"
                title="Start New Chat"
              >
                🔄
              </button>
              <h2>Star Light Tracker Chatbot</h2>
              <button
                onClick={() => setIsChatOpen(false)} // Close the chat
                className="close-chat-btn"
                title="Close Chat"
              >
                ✖
              </button>
            </div>

            <div className="chat-body">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-footer">
              <input
                type="text"
                placeholder="Ask about stars, planets, or astronomy..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="chat-input"
              />
              <button onClick={handleSend} className="send-btn">
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsChatOpen(true)} className="open-chat-btn">
          
        </button>
      )}
    </div>
  );
};

export default Chatbot;
