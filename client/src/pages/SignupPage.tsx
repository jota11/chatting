import { useState } from "react";
import { AuthStore } from "../store/auth";
import { Form } from "../components/AccountForm";
import { CoolBg } from "../components/CoolBg";
import toast from "react-hot-toast";

export const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
    });

    const { signup } = AuthStore();

    const validateForm = () => {
        if (!formData.username.trim() ||
            !formData.name.trim ||
            !formData.email.trim() ||
            !formData.password.trim()
        ) {
            return toast.error("All fields must be filled.");
        }
        if (formData.password.length < 8) {
            return toast.error("Password must have at least 8 characters");
        }
        return true;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = validateForm();

        if (success) {
            signup(formData);
        }
    }

    return (
        <main className="center">
            <CoolBg/>
            <Form
                formTitle={"Create your account"}
                formDescription={"Get started by signing up to use Chatting"}
                isUserSigningUp={true}
                formAction={handleSubmit}
                email={formData.email}
                emailAction={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                name={formData.name}
                nameAction={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                username={formData.username}
                usernameAction={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, username: e.target.value })}
                password={formData.password}
                passwordAction={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
            />
        </main>
    );
};
