
import { AuthStore } from "../store/auth";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
import "../styles/_profile.scss";
import Icon from "@mdi/react";
import { mdiAccountDetails, mdiTextBox, mdiAccountCircle } from "@mdi/js";

export const ProfilePage = () => {
    const { authUser } = AuthStore();
    if (!authUser) {
        return;
    }

    return (
        <section id="profile-card" className="center column">
            <p>Your profile information</p>
            <section id="profile-user-info-main" className="center column">
                <img id="profile-user-avatar" src={authUser.profilePic || "/avatar.jpg"} alt="Profile avatar" />
            </section>
            <section id="profile-user-info">
                <div className="form-entry different">
                    <label htmlFor="Name"><Icon path={mdiAccountDetails} size={0.8} /> Name</label>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        placeholder={authUser.name}
                        value={authUser.name}
                    />
                </div>
                <div className="form-entry different">
                    <label htmlFor="username"><Icon path={mdiAccountCircle} size={0.8} /> Username</label>
                    <input
                        type="username"
                        name="username"
                        id="username"
                        placeholder={authUser.username}
                        value={authUser.username}
                    />
                </div>
                <div className="form-entry different">
                    <label htmlFor="description"><Icon path={mdiTextBox} size={0.8} /> Description</label>
                    <input
                        type="description"
                        name="description"
                        id="description"
                        placeholder={authUser.description}
                        value={authUser.description}
                    />
                </div>

                <button type="submit" className="form-button-submit">Update Profile</button>
            </section>
        </section>
    );
};
