import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/auth/InputField";
import axios from "axios";
import "../../../styles/auth.css";

const CheckOtp = () => {
    const [OTP, setOTP] = useState("");
    const [message, setMessage] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);
    const [isExpired, setIsExpired] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);


            return () => clearInterval(timer);
        } else {
            setIsExpired(true);
            setMessage("OTP has expired. Please resend a new OTP.");
        }
    }, [timeLeft]);

    const handleResendOTP = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/fap/resend-otp",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            const data = response.data;
            setMessage(data.message || "Resend OTP successful");
            setTimeLeft(60);
            setIsExpired(false);

            if (data.redirect) {
                window.location.href = data.redirect;
            }
        } catch (error) {
            const errorData = error.response?.data;
            setMessage(errorData?.error || "Resend OTP failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!OTP) {
            setMessage("OTP cannot be empty");
            return;
        }
        if (isExpired) {
            setMessage("OTP has expired. Please resend a new OTP.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/fap/check-otp",
                {
                    OTP: OTP,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            const data = response.data;
            setMessage(data.message || "Check OTP successful");

            if (data.redirect) {
                window.location.href = data.redirect;
            }
        } catch (error) {
            const errorData = error.response?.data;
            setMessage(errorData?.error || "Check OTP failed");
        }
    };

    return (
        <div className="login-container">
            <h2 className="form-title">Check OTP</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <InputField
                    type="text"
                    placeholder="OTP"
                    icon="mail"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                />
                {/* Hiển thị bộ đếm ngược */}
                <p className="countdown">
                    {isExpired ? "OTP has expired" : `Time left: ${timeLeft}s`}
                </p>
                <button
                    type="submit"
                    className="login-button"
                    disabled={isExpired} 
                >
                    Check OTP
                </button>
            </form>
            {message && <p>{message}</p>}
            <p className="signup-prompt">
                Resend OTP{" "}
                <a href="#" onClick={handleResendOTP}>
                    Send
                </a>
            </p>
        </div>
    );
};

export default CheckOtp;