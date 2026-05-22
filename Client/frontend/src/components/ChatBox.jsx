import React, { useState } from "react";

const ChatBox = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "😊Hello! Welcome UP50 Tattoo Studio 🖤\nHow can I help you?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.success) {
        const botMsg = {
          id: Date.now() + 1,
          text: data.reply,
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="fixed bottom-24 right-5 w-80 md:w-96 h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
      style={{
        animation: "slideUp 0.3s ease-out",
      }}
    >
      {/* Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
            <span className="text-lg">
              <img src="./Logo1.png" alt="" />
            </span>
          </div>
          <div>
            <h3 className="font-bold">UP 50</h3>
            <p className="text-xs text-red-500">Always here for you</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-black text-white rounded-br-md"
                  : "bg-gray-200 text-gray-800 rounded-bl-md"
              }`}
            >
              {/* ✅ HTML RENDER KARO - Yeh change kiya! */}
              <span dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-red-500 focus:outline-none focus:border-black transition"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
