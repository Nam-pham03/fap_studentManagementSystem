import React from 'react';
import Sidebar from '../../components/sys_admin/Sidebar';
import TopNav from '../../components/sys_admin/TopNav';
import TableStudent from '../../components/sys_admin/TableStudent';
import TableFinanceAdmin from '../../components/sys_admin/TableFinanceAdmin';
import TableHrAdmin from '../../components/sys_admin/TableHrAdmin';
import TableAcademicAdmin from '../../components/sys_admin/TableAcademicAdmin';

const SysAdminAccountManage = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navigation */}
                <TopNav />

                {/* Table Content */}
                <div className="p-6 flex-1 overflow-auto space-y-6">
                    <TableStudent />
                    <TableFinanceAdmin />
                    <TableHrAdmin />
                    <TableAcademicAdmin />
                </div>
            </div>
        </div>
    );
};

export default SysAdminAccountManage;