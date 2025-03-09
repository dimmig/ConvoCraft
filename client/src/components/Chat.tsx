import React, {useEffect, useRef, useState} from "react";
import { Button, Input } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Message } from "./Message";
import { motion } from "framer-motion";
import "./styles/chat.css";

export const Chat = () => {
  const messageContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false)

  useEffect(() => {
        const container = messageContainerRef.current;

        if (!container) return;

        const handleScroll = () => {
            const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 20;
            setIsUserScrolling(!isAtBottom);
        };

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

      useEffect(() => {
        if (!isUserScrolling || loading) {
            messageContainerRef.current?.scrollTo({
                top: messageContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, loading]);

  const handleSubmit = () => {
  if (!userInput.trim()) return;

  setMessages((prev) => [...prev, { text: userInput, isUserMessage: true }]);
  setLoading(true);

  let currentAssistantMessage = "";

  const eventSource = new EventSource(
    `http://localhost:2024/generate?user_input=${encodeURIComponent(userInput)}`
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    currentAssistantMessage += data.message;

    setMessages((prevMessages: {text: string, isUserMessage: boolean}[]) => {
      if (prevMessages.length === 0) return prevMessages;

      const lastMessage = prevMessages[prevMessages.length - 1];

      if (lastMessage.isUserMessage) {
        return [...prevMessages, { text: currentAssistantMessage, isUserMessage: false }];
      } else {
        return [
          ...prevMessages.slice(0, -1),
          { ...lastMessage, text: currentAssistantMessage },
        ];
      }
    });
  };

  eventSource.onerror = (error) => {
    console.error("SSE error:", error);
    eventSource.close();
    setLoading(false);
  };

  eventSource.addEventListener("end", () => {
    setLoading(false);
    eventSource.close();
  });

  setUserInput("");
};

  return (
    <div className="chat-container">
      <div ref={messageContainerRef} className="message-container">
        {messages.length === 0 && (
          <h2 style={{ display: "flex", justifySelf: "center", alignSelf: "center" }}>
            Ask everything you want!
          </h2>
        )}

        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: msg.isUserMessage ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Message message={msg.text} isUserMessage={msg.isUserMessage} />
          </motion.div>
        ))}
      </div>

      <div className="input-container">
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Write your prompt here..."
          className="chat-input"
          onPressEnter={handleSubmit}
          disabled={loading}
        />
        <Button
          icon={<ArrowUpOutlined />}
          size="large"
          className="send-button"
          onClick={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};
