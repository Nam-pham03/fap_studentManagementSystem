import React from 'react';
import Sidebar from '../../components/sys_admin/Sidebar';
import TopNav from '../../components/sys_admin/TopNav';
import Profile from '../../components/sys_admin/Profile';

const sysAdminProfile = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navigation */}
                <TopNav />

                {/* Profile Content */}
                <Profile />
            </div>
        </div>
    );

};

export default sysAdminProfile;





