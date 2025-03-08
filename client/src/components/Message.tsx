import * as React from "react";

interface MessageProps {
    message: string;
    isUserMessage: boolean;
}

export const Message: React.FC<MessageProps> = ({ message, isUserMessage }) => {
    const text = message.replace(/^(user|bot):/, "");

    return (
        <div
            className={`message-bubble ${isUserMessage ? "user-message" : "bot-message"}`}
        >
            {text}
        </div>
    );
};
