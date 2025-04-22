import React, { useState } from "react";
import axios from "axios";
import SocialLogin from "../../../components/auth/SocialLogin";
import InputField from "../../../components/auth/InputField";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage("Email and password cannot be empty");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/fap/login", {
                email: email,
                password: password,
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            const data = response.data;
            setMessage(data.message || "Login successful");

            if (data.redirect) {
                window.location.href = data.redirect;
            }
        } catch (error) {
            const errorData = error.response?.data;
            setMessage(errorData?.error || "Login failed");
        }
    };


    return (
        <div className="login-container">
            <h2 className="form-title">Log in with</h2>
            <SocialLogin />
            <p className="separator"><span>or</span></p>
            <form onSubmit={handleSubmit} className="login-form">
                <InputField
                    type="mail"
                    placeholder="Email"
                    icon="mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    icon="lock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <a href="/fap/ForgotPass" className="forgot-password-link">Forgot password?</a>
                <button type="submit" className="login-button">Log In</button>
            </form>
            {message && <p>{message}</p>} {/* Hiển thị thông báo */}
          
        </div>
    );
};

export default Login;