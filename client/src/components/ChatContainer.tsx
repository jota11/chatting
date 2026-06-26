import "../styles/_chatContainer.scss";
import { ChatStore } from "../store/chat"
import { AuthStore } from "../store/auth"
import { useEffect, useRef } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatBottom } from "./ChatBottom";
import { MessageSkeleton } from "./skeletons/MessageSkeleton";
import { Message } from "./Message";

export const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = ChatStore();
    const { authUser } = AuthStore();
    const messageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!selectedUser || !authUser ) return;
        getMessages(selectedUser.id);
        subscribeToMessages();

        return unsubscribeFromMessages;
    }, [selectedUser, authUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    // console.log("who?" + selectedUser.id);

    useEffect(() => {
        if (messages?.length > 0) {
            messageEndRef.current?.scrollIntoView();
        }
    }, [messages]);

    if (!selectedUser || !authUser) return;

    if (isMessagesLoading) {
        return (
            <main id="chat-container">
                <ChatHeader/>
                <MessageSkeleton/>
                <ChatBottom/>
            </main>
        )
    }

    return (
        <main id="chat-container">
            <ChatHeader/>
            <section id="chat-window">
                {messages.map((message) => (
                    <Message
                        messageRef={messageEndRef}
                        messageKey={message.messageId}
                        authorId={message.authorId}
                        receiverId={authUser.id}
                        createdAt={message.createdAt}
                        content={message.content}/>
                ))}
            </section>
            <ChatBottom/>
        </main>
    );
};
