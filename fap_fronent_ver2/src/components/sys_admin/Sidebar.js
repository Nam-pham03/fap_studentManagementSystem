import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 bg-white shadow-md h-screen">
            {/* Logo */}
            <div className="p-4">
                <h1 className="text-2xl font-bold text-blue-600">FPT</h1>
            </div>

            {/* Menu */}
            <div className="mt-4">
                <p className="text-xs text-gray-500 px-4 mb-2 uppercase">Menu</p>
                <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                        <span className="text-gray-700">Dashboard</span>
                    </li>
                    {/*<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">*/}
                    {/*    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />*/}
                    {/*    </svg>*/}
                    {/*    <span className="text-gray-700">Calendar</span>*/}
                    {/*</li>*/}
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                        <Link to="/fap/SysAdmin/Profile" className="flex items-center w-full">
                            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-gray-700">User Profile</span>
                        </Link>
                    </li>
                    {/*<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">*/}
                    {/*    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />*/}
                    {/*    </svg>*/}
                    {/*    <span className="text-gray-700">Task</span>*/}
                    {/*</li>*/}
                    {/*<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">*/}
                    {/*    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />*/}
                    {/*    </svg>*/}
                    {/*    <span className="text-gray-700">Forms</span>*/}
                    {/*</li>*/}
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                        <Link to="/fap/SysAdmin/AccountManage" className="flex items-center w-full">
                            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-700">Account Management</span>
                        </Link>
                    </li>
                    {/*<li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">*/}
                    {/*    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />*/}
                    {/*    </svg>*/}
                    {/*    <span className="text-gray-700">Pages</span>*/}
                    {/*</li>*/}
                </ul>
            </div>

            {/* Support */}
            <div className="mt-4">
                <p className="text-xs text-gray-500 px-4 mb-2 uppercase">Support</p>
                <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-gray-700">Chat</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700">Email</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;