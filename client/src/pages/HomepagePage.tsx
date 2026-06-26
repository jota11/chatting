import { ChatStore } from "../store/chat";
import { Sidebar } from "../components/Sidebar";
import { NoChatSelected } from "../components/NoChatSelected";
import { ChatContainer } from "../components/ChatContainer";

export const HomepagePage = () => {
    const { selectedUser } = ChatStore();
    return (
        <section id="main-homepage" className="center">
            <Sidebar/>
            {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
        </section>
    );
};
