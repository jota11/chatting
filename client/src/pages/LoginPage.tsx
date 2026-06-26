import { useState } from "react";
import { AuthStore } from "../store/auth";
import { Form } from "../components/AccountForm";
import toast from "react-hot-toast";
import { CoolBg } from "../components/CoolBg";

export const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { login } = AuthStore();

    const validateForm = () => {
        if (!formData.email.trim() || !formData.password.trim()) {
            return toast.error("All fields must be filled");
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
            login(formData);
        }
    }

    return (
        <main className="center">
            <CoolBg/>
            <Form
                formTitle={"Sign in to your account"}
                formDescription={"Get started by signing in to chat"}
                isUserSigningUp={false}
                formAction={handleSubmit}
                email={formData.email}
                emailAction={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                password={formData.password}
                passwordAction={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
            />
        </main>
    );
};
