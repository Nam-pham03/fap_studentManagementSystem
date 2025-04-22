import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SocialLogin = () => {
    const navigate = useNavigate();

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {

                const userInfoResponse = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                        },
                    }
                );

                const email = userInfoResponse.data.email;
                console.log("Google email:", email);


                const response = await axios.post(
                    "http://localhost:8080/fap/google-login",
                    {
                        email: email,
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    },

            );

                const data = response.data;

                if (data.message === "Google login successful") {
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    } else {
                        console.log("Đăng nhập thành công, không có redirect");
                    }
                } else {
                    alert("Đăng nhập Google thất bại: " + data.error);
                }
            } catch (error) {
                const errorMessage =
                    error.response?.data?.error || "Không thể kết nối đến server";
                alert("Lỗi đăng nhập: " + errorMessage);
            }
        },
        onError: () => {
            alert("Đăng nhập Google thất bại");
        },
        scope: "email profile openid",
    });

    return (
        <div className="social-login">
            <button className="social-button" onClick={() => loginWithGoogle()}>
                <img src="google.svg" alt="Google" className="social-icon" />
                Google
            </button>
            <button
                className="social-button"
                onClick={() => navigate("/fap/FeidLogin")}
            >
                <img src="icons8-microsoft.svg" alt="Microsoft" className="social-icon" />
                FeID
            </button>
        </div>
    );
};

export default SocialLogin;