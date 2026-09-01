import { ChatStore } from "../store/chat"
import { AuthStore } from "../store/auth";
import { useEffect, useState } from "react";
import { mdiChat } from "@mdi/js";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import "../styles/_sidebar.scss";
import { SidebarSkeleton } from "./skeletons/SidebarSkeleton";
import { ChatSidebarContact } from "./ChatSidebarContact";
import { AccountNavbarMenu } from "./AccountNavbarMenu";

export const Sidebar = () => {
    const { users, getUsers, isUsersLoading, setSelectedUser } = ChatStore();
    const { onlineUsers } = AuthStore();

    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(() => {
        getUsers()
    }, [getUsers]);

    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(String(user.id))) : users;
    // console.log("FilteredUsers: ", filteredUsers);

    if (isUsersLoading) {
        return <SidebarSkeleton/>;
    }

    return (
        <aside id="sidebar">
            <section id="sidebar-info">
                <Link to="/">
                    <div id="main-logo" className="center">
                        <Icon path={mdiChat} size={1.5} />
                        <h1>Chatting</h1>
                    </div>
                </Link>
                <AccountNavbarMenu/>
            </section>
            {filteredUsers.map((user) => (
                <ChatSidebarContact
                    keyKey={user.userId}
                    onClickFunc={() => setSelectedUser(user)}
                    contactName={user.name}
                    contactUserId={onlineUsers.includes(String(user.id))}
                />
            ))}
            <section id="sidebar-bottom">
                <div className="center">
                    <span>Hide offline users</span>
                    <input
                        type="checkbox"
                        checked={showOnlineOnly}
                        onChange={(e) => setShowOnlineOnly(e.target.checked)}
                    />
                </div>
            </section>
        </aside>
    );
};
