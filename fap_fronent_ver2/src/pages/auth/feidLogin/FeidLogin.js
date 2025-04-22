import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/auth/InputField";
import axios from "axios";
import "../../../styles/auth.css";

const FeidLogin = () => {
    const [feId, setFeId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feId || !password) {
            setMessage("FeID and password cannot be empty");
            return;
        }

        try {
            
            const response = await axios.post("http://localhost:8080/fap/feid-login", {
                feId: feId,
                password: password,
            }, {
                headers: {
                    "Content-Type": "application/json",
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
            <h2 className="form-title">Login By FeID</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <InputField
                    type="text"
                    placeholder="FeID"
                    icon="mail" 
                    value={feId}
                    onChange={(e) => setFeId(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    icon="lock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <a href="/fap/ForgotPass" className="forgot-password-link">Forgot password?</a>
                <button type="submit" className="login-button">Login</button>
            </form>
            {message && <p>{message}</p>} {/* Hiển thị thông báo */}
            <p className="signup-prompt">
                Back to <a href="#" onClick={() => navigate("/fap")}>Login</a>
            </p>
        </div>
    );
};

export default FeidLogin;