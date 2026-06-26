import "../styles/_chatContainer.scss";
import { AuthStore } from "../store/auth"

export const SettingsContainer = () => {
    const { authUser } = AuthStore();
    if (!authUser) return;

    return (
        <main id="chat-container">
            <h1>Settings</h1>
        </main>
    );
};
