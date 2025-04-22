import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/auth/InputField";
import axios from "axios";
import "../../../styles/auth.css";

const ForgotPass = () => {
    const [feId, setFeId] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feId ) {
            setMessage("FeID cannot be empty");
            return;
        }

        try {

            const response = await axios.post("http://localhost:8080/fap/forgot-pass", {
                feId: feId,
              
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            const data = response.data;
            setMessage(data.message || "Send OTP successful");

            if (data.redirect) {
                window.location.href = data.redirect;
            }
        } catch (error) {
            const errorData = error.response?.data;
            setMessage(errorData?.error || "Send OTP failed");
        }
    };

    return (
        <div className="login-container">
            <h2 className="form-title">Forgot Password</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <InputField
                    type="text"
                    placeholder="FeID or Email"
                    icon="mail"
                    value={feId}
                    onChange={(e) => setFeId(e.target.value)}
                />
                <button type="submit" className="login-button">Reset Password</button>
            </form>
            {message && <p>{message}</p>} {}
            <p className="signup-prompt">
                Back to <a href="#" onClick={() => navigate("/fap")}>Login</a>
            </p>
        </div>
    );
};

export default ForgotPass;