import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLock } from 'react-icons/fa';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); // New state for password modal
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        ethnicity: '',
        nationality: '',
        placeBirth: '',
        addressCurrent: '',
        idNumber: '',
        dob: '',
        gender: ''
    });
    const [passwordFormData, setPasswordFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/fap/user-info', {
                    withCredentials: true,
                });
                setUser(response.data);
                setFormData({
                    firstName: response.data.name ? response.data.name.split(' ')[0] : '',
                    lastName: response.data.name ? response.data.name.split(' ').slice(1).join(' ') : '',
                    email: response.data.email || '',
                    phone: response.data.phone || '',
                    ethnicity: response.data.ethnicity || '',
                    nationality: response.data.nationality || '',
                    placeBirth: response.data.placeBirth || '',
                    addressCurrent: response.data.addressCurrent || '',
                    idNumber: response.data.idNumber || '',
                    dob: response.data.dob || '',
                    gender: response.data.gender !== undefined ? parseInt(response.data.gender) : 0
                });
                setLoading(false);
            } catch (err) {
                setError('Không thể lấy thông tin người dùng');
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'gender' ? parseInt(value) : value
        }));
    };

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await axios.post(
                'http://localhost:8080/fap/update-user-profile',
                {
                    ...formData,
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    gender: parseInt(formData.gender)
                },
                {
                    withCredentials: true
                }
            );

            setUser((prev) => ({
                ...prev,
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                phone: formData.phone,
                ethnicity: formData.ethnicity,
                nationality: formData.nationality,
                placeBirth: formData.placeBirth,
                addressCurrent: formData.addressCurrent,
                idNumber: formData.idNumber,
                dob: formData.dob,
                gender: parseInt(formData.gender)
            }));
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error updating user info:', err);
            alert('Failed to update user information');
        }
    };

    const handleChangePassword = async () => {
        if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }

        try {
            await axios.post(
                'http://localhost:8080/fap/change-password',
                {
                    oldPassword: passwordFormData.oldPassword,
                    newPassword: passwordFormData.newPassword,
                    confirmPassword: passwordFormData.confirmPassword
                },
                {
                    withCredentials: true
                }
            );
            setIsPasswordModalOpen(false);
            setPasswordFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            alert('Password changed successfully');
        } catch (err) {
            console.error('Error changing password:', err);
            alert('Failed to change password');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const maxSizeInMB = 5;
        if (file && file.size > maxSizeInMB * 1024 * 1024) {
            alert(`Tệp quá lớn! Vui lòng chọn tệp nhỏ hơn ${maxSizeInMB}MB.`);
            return;
        }
        setSelectedFile(file);
    };

    const handleUploadFile = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        const uploadFormData = new FormData();
        uploadFormData.append('file', selectedFile);

        try {
            const response = await axios.post(
                'http://localhost:8080/fap/upload-profile-image',
                uploadFormData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setUser((prev) => ({
                ...prev,
                img: response.data.filePath
            }));
            setIsUploadModalOpen(false);
            setSelectedFile(null);
            alert('File uploaded successfully');
        } catch (err) {
            console.error('Error uploading file:', err);
            alert('Failed to upload file');
        }
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const getRoleName = (roleId) => {
        switch (roleId) {
            case 1: return 'System Admin';
            case 2: return 'Academy Admin';
            case 3: return 'HR Admin';
            case 4: return 'Finace Admin';
            case 5: return 'Lecture';
            case 6: return 'Student';
            default: return 'Unknown';
        }
    };

    const getGender = (genderId) => {
        switch (genderId) {
            case 0: return 'Female';
            case 1: return 'Male';
            default: return 'Unknown';
        }
    };

    return (
        <div className="p-6">
            <div className="text-sm text-gray-500 mb-4">
                Home > Profile
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={user.img || "https://placehold.co/80x80"}
                            alt="Profile"
                            className="w-20 h-20 rounded-full"
                            onError={(e) => { e.target.src = "https://placehold.co/80x80"; }}
                        />
                        <div>
                            <h2 className="text-xl font-bold">{user.name || 'Tên Người Dùng'}</h2>
                            <p className="text-gray-600">{getRoleName(user.role)} | {user.feId}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setIsPasswordModalOpen(true)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path fillRule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clipRule="evenodd"/>
                            </svg>
                        </button>
                        <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path d="M7.25 10.25a.75.75 0 0 0 1.5 0V4.56l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l2.22-2.22v5.69Z"/>
                                <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z"/>
                            </svg>
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Personal Information</h3>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center space-x-1 text-gray-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        <span>Edit</span>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <p className="text-gray-500">Date of birth</p>
                        <p className="font-medium">{user.dob}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Gender</p>
                        <p className="font-medium">{getGender(user.gender)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Email address</p>
                        <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Ethnicity</p>
                        <p className="font-medium">{user.ethnicity}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Identification Information</h3>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center space-x-1 text-gray-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        <span>Edit</span>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <p className="text-gray-500">Nationality</p>
                        <p className="font-medium">{user.nationality}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Place of Birth</p>
                        <p className="font-medium">{user.placeBirth}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Address Current</p>
                        <p className="font-medium">{user.addressCurrent}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Identity Number</p>
                        <p className="font-medium">{user.idNumber}</p>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Edit Profile Information</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-500 mb-6">Update your details to keep your profile up-to-date.</p>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Gender</label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="1"
                                                checked={formData.gender === 1}
                                                onChange={handleInputChange}
                                                className="mr-2"
                                            />
                                            Male
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="0"
                                                checked={formData.gender === 0}
                                                onChange={handleInputChange}
                                                className="mr-2"
                                            />
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Ethnicity</label>
                                    <input
                                        type="text"
                                        name="ethnicity"
                                        value={formData.ethnicity}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Identification Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Nationality</label>
                                    <input
                                        type="text"
                                        name="nationality"
                                        value={formData.nationality}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Place of Birth</label>
                                    <input
                                        type="text"
                                        name="placeBirth"
                                        value={formData.placeBirth}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Address Current</label>
                                    <input
                                        type="text"
                                        name="addressCurrent"
                                        value={formData.addressCurrent}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Identity Number</label>
                                    <input
                                        type="text"
                                        name="idNumber"
                                        value={formData.idNumber}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSaveChanges}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isUploadModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Upload Profile Image</h2>
                            <button
                                onClick={() => setIsUploadModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-500 mb-6">Upload a new profile image.</p>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Select File</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsUploadModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleUploadFile}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isPasswordModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Change Password</h2>
                            <button
                                onClick={() => setIsPasswordModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-500 mb-6">Enter your old password and new password to update.</p>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Old Password</label>
                            <input
                                type="password"
                                name="oldPassword"
                                value={passwordFormData.oldPassword}
                                onChange={handlePasswordInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordFormData.newPassword}
                                onChange={handlePasswordInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordFormData.confirmPassword}
                                onChange={handlePasswordInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsPasswordModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleChangePassword}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;