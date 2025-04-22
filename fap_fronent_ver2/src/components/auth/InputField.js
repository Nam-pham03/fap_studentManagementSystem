import React, { useState } from "react";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

const InputField = ({ type, placeholder, icon, value, onChange }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const iconMap = {
        mail: <MdEmail />,
        lock: <MdLock />,
    };

    return (
        <div className="input-wrapper">
            <input
                type={isPasswordShown ? "text" : type}
                placeholder={placeholder}
                className="input-field"
                value={value}
                onChange={onChange}
                required
            />
            <i className="icon">{iconMap[icon]}</i>
            {type === "password" && (
                <i onClick={() => setIsPasswordShown(prevState => !prevState)} className="eye-icon">
                    {isPasswordShown ? <MdVisibility /> : <MdVisibilityOff />}
                </i>
            )}
        </div>
    );
};

export default InputField;