import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { HomepagePage } from "./pages/HomepagePage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
// import { SettingsPage } from "./pages/SettingsPage";
import { ProfilePage } from "./pages/ProfilePage";

import { AuthStore } from "./store/auth";
// import { ChatStore } from "./store/chat";

function App() {
    const { authUser, checkAuth, isCheckingAuth } = AuthStore();
    // const { authUser, checkAuth, isCheckingAuth, onlineUsers, isLoggingIn, isSigningUp } = AuthStore();
    // const { selectedUser } = ChatStore();

    // if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    //     console.group("[DEV] The following are a few variables just so we can see if they are right:");
    //     console.info("At first, the default values should be: onlineUsers: Array[] // authUser: null // isCheckingAuth: false // isLoggingIn: false // isSigningUp: false // selectedUser: null");
    //     console.log("onlineUsers", onlineUsers);
    //     console.log("authUser", authUser);
    //     console.log("isCheckingAuth:", isCheckingAuth);
    //     console.log("isLoggingIn", isLoggingIn);
    //     console.log("isSigningUp", isSigningUp);
    //     console.log("selectedUser", selectedUser);
    //     console.groupEnd();
    // }

    useEffect(() => {
        checkAuth();
    }, []);

    if (isCheckingAuth && !authUser) return (
        <h1>LOADING...</h1>
    )

    return (
        <>
            <Routes>
                <Route path="/" element={authUser ? <HomepagePage/> : <Navigate to="/login"/>}/>
                <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/"/>}/>
                <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
                {/*<Route path="/settings" element={authUser ? <SettingsPage/> : <Navigate to="/login"/>}/>*/}
                <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
            </Routes>
            <Toaster/>
        </>
    )
}

export default App;
