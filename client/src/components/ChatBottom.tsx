import { useState } from "react";
import { ChatStore } from "../store/chat"
import "../styles/_chatContainer.scss";
import { mdiSendCircle } from "@mdi/js";
import Icon from "@mdi/react";

export const ChatBottom = () => {
    const [ text, setText ] = useState("");
    const { sendMessage } = ChatStore();

    const handleSendMessage = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim()) {
            return;
        }
        try {
            await sendMessage({
                text: text.trim()
            });
            setText("");
        } catch (err) {
            console.error("Error to send message:", err);
        }
    }
    return (
        <section id="chat-bottom" className="center">
            <form id="message-box" className="center" onSubmit={handleSendMessage}>
                <textarea placeholder="Type something!" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                <button type="submit" disabled={!text.trim()}><Icon path={mdiSendCircle} size={2} /></button>
            </form>
        </section>
    );
};
