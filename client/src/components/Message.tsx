import "../styles/_message.scss";
import { type RefObject } from "react";

interface ISingleMessage {
    messageRef: RefObject<HTMLDivElement | null>;
    messageKey: string;
    authorId: number;
    receiverId: number;
    createdAt: string;
    content: string;
}

export const Message: React.FC<ISingleMessage> = ({ messageRef, messageKey, authorId, receiverId, createdAt, content }) => {
    return (
        <div ref={messageRef} key={messageKey} className={`chat-message ${authorId === receiverId ? "yours" : "notyours"}`}>
            {content}
            <time dateTime={createdAt.slice(0, 16)}>{createdAt.slice(11, 16)}</time>
        </div>
    );
};
