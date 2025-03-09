import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MessageProps {
    message: string;
    isUserMessage: boolean;
}

export const Message: React.FC<MessageProps> = ({ message, isUserMessage }) => {
    return (
        <div className={`message-bubble ${isUserMessage ? "user-message" : "bot-message"}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
                    h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
                    h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
                    table: ({ children }) => <table className="markdown-table">{children}</table>,
                    th: ({ children }) => <th className="markdown-th">{children}</th>,
                    td: ({ children }) => <td className="markdown-td">{children}</td>,
                    blockquote: ({ children }) => <blockquote className="markdown-blockquote">{children}</blockquote>,
                    code: ({ className, children }) => <code className={`inline-code ${className}`}>{children}</code>,
                    strong: ({ children }) => <strong className="bold-text">{children}</strong>,
                    em: ({ children }) => <em className="italic-text">{children}</em>,
                    ul: ({ children }) => <ul className="markdown-list">{children}</ul>,
                    ol: ({ children }) => <ol className="markdown-list">{children}</ol>,
                    li: ({ children }) => <li className="markdown-list-item">{children}</li>,
                    img: ({ src, alt }) => <img src={src} alt={alt} className="markdown-image" />,
                }}
            >
                {message}
            </ReactMarkdown>
        </div>
    );
};
