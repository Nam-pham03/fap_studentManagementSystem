import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/auth/InputField";
import axios from "axios";
import "../../../styles/auth.css";

const ResetPass = () => {
    const [old, setOld] = useState("");
    const [current, setCurrent] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!old || !current || !confirm) {
            setMessage("Old password, new password and confirm password cannot be empty");
            return;
        }

        try {

            const response = await axios.post("http://localhost:8080/fap/reset-pass", {
                old: old,
                current: current,
                confirm: confirm,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            const data = response.data;
            setMessage(data.message || "Reset password successful");

            if (data.redirect) {
                window.location.href = data.redirect;
            }
        } catch (error) {
            const errorData = error.response?.data;
            setMessage(errorData?.error || "Reset password failed");
        }
    };

    return (
        <div className="login-container">
            <h2 className="form-title">Reset Password</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <InputField
                    type="password"
                    placeholder="Old Password"
                    icon="lock"
                    value={old}
                    onChange={(e) => setOld(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="New Password"
                    icon="lock"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Confirm Password"
                    icon="lock"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />
                {/*<a href="/forgot_pass" className="forgot-password-link">Reset Password?</a>*/}
                <button type="submit" className="login-button">Reset Password</button>
            </form>
            {message && <p>{message}</p>} {/* Hiển thị thông báo */}
            <p className="signup-prompt">
                 <a href="#" onClick={() => navigate("/fap")}>Cancel</a>
            </p>
        </div>
    );
};

export default ResetPass;