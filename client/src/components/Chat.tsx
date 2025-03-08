import React, { useState } from "react";
import { Button, Input, Spin } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import axios from "axios";
import { Message } from "./Message";
import { motion } from "framer-motion";
import "./styles/chat.css"

export const Chat = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!userInput.trim()) return;
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:2024/generate?user_input=${userInput}`);
            if (response.status === 200) {
                console.log(response)
                const messages = response.data.trim().split("\n").map(JSON.parse).map(e => `${e.message}`);
                setMessages(prev => [...prev, ...messages]);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
            setUserInput("");
        }
    };

    return (
        <div className="chat-container">
            <div className="message-container">
                {messages.length === 0 && (
                    <h2
                        style={{ display: "flex", justifySelf: 'center', alignSelf: 'center' }}>
                        Ask everything you want!
                    </h2>
                )}
                {messages.map((message, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: message.startsWith("user:") ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Message message={message} isUserMessage={messages.indexOf(message) % 2 === 0} />
                    </motion.div>
                ))}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="loading-indicator"
                    >
                        <Spin /> <span>Bot is typing...</span>
                    </motion.div>
                )}
            </div>

            <div className="input-container">
                <Input
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
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
