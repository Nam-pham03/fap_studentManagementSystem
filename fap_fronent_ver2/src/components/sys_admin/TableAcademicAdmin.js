import React, { useState, useMemo } from 'react';

const TableAcademicAdmin = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const tableData = [
        { account_id: 101, email: 'finance.john@example.com', fe_id: 'FA001', full_name: 'John Finance', status: 1 },
        { account_id: 102, email: 'finance.mary@example.com', fe_id: 'FA002', full_name: 'Mary Johnson', status: 0 },
        { account_id: 103, email: 'finance.peter@example.com', fe_id: 'FA003', full_name: 'Peter Brown', status: 1 },
        { account_id: 104, email: 'finance.lisa@example.com', fe_id: 'FA004', full_name: 'Lisa Davis', status: 1 },
        { account_id: 105, email: 'finance.mark@example.com', fe_id: 'FA005', full_name: 'Mark Wilson', status: 0 },
        { account_id: 106, email: 'finance.emma@example.com', fe_id: 'FA006', full_name: 'Emma Taylor', status: 1 },
        { account_id: 107, email: 'finance.james@example.com', fe_id: 'FA007', full_name: 'James Anderson', status: 0 },
        { account_id: 108, email: 'finance.sophia@example.com', fe_id: 'FA008', full_name: 'Sophia Martinez', status: 1 },
        { account_id: 109, email: 'finance.william@example.com', fe_id: 'FA009', full_name: 'William Garcia', status: 1 },
        { account_id: 110, email: 'finance.olivia@example.com', fe_id: 'FA010', full_name: 'Olivia Lee', status: 0 },
    ];

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        let sortableData = [...tableData];
        if (sortConfig.key) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [tableData, sortConfig]);

    const totalEntries = sortedData.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentEntries = sortedData.slice(startIndex, startIndex + entriesPerPage);

    const handleEntriesChange = (e) => {
        setEntriesPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleDownload = () => {
        const csvContent = [
            ['Account ID', 'Full Name', 'Email', 'FE ID', 'Status'],
            ...tableData.map((entry) => [
                entry.account_id,
                entry.full_name,
                entry.email,
                entry.fe_id,
                entry.status === 1 ? 'Active' : 'Unactive',
            ]),
        ]
            .map((row) => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'academic_admins.csv';
        link.click();
    };

    const handleRowSelect = (account_id) => {
        setSelectedRows((prev) =>
            prev.includes(account_id)
                ? prev.filter((id) => id !== account_id)
                : [...prev, account_id]
        );
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            setSelectedRows(currentEntries.map((entry) => entry.account_id));
        }
        setSelectAll(!selectAll);
    };

    return (
        <div className="p-6 flex-1 overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Academic Admin Management</h2>

                {/* Table Controls */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <label className="text-gray-600">Show</label>
                        <select
                            value={entriesPerPage}
                            onChange={handleEntriesChange}
                            className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <span className="text-gray-600">entries</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="border rounded-lg p-2 hover:bg-gray-100">
                            <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={handleDownload}
                            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 flex items-center"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                            Download
                        </button>
                        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 mr-2"
                            >
                                <path
                                    d="M10 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM16.25 5.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z"
                                />
                            </svg>
                            Academic Admin
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                            </th>
                            {[
                                { key: 'account_id', label: 'Account ID' },
                                { key: 'full_name', label: 'Full Name' },
                                { key: 'email', label: 'Email' },
                                { key: 'fe_id', label: 'FE ID' },
                                { key: 'status', label: 'Status' },
                            ].map((col) => (
                                <th
                                    key={col.key}
                                    className="border border-gray-300 p-2 text-left text-gray-700 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSort(col.key)}
                                >
                                    <div className="flex items-center">
                                        {col.label}
                                        <svg
                                            className={`w-4 h-4 ml-1 ${
                                                sortConfig.key === col.key
                                                    ? sortConfig.direction === 'asc'
                                                        ? 'text-blue-500'
                                                        : 'text-blue-500 rotate-180'
                                                    : 'text-gray-400'
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                            />
                                        </svg>
                                    </div>
                                </th>
                            ))}
                            <th className="border border-gray-300 p-2 text-left text-gray-700">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentEntries.map((entry) => (
                            <tr key={entry.account_id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 p-2 align-middle">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(entry.account_id)}
                                        onChange={() => handleRowSelect(entry.account_id)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2 align-middle">{entry.account_id}</td>
                                <td className="border border-gray-300 p-2 align-middle">{entry.full_name}</td>
                                <td className="border border-gray-300 p-2 align-middle">{entry.email}</td>
                                <td className="border border-gray-300 p-2 align-middle">{entry.fe_id}</td>
                                <td className="border border-gray-300 p-2 align-middle">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm ${
                                                entry.status === 1
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                            }`}
                                        >
                                            {entry.status === 1 ? 'Active' : 'Unactive'}
                                        </span>
                                </td>
                                <td className="border border-gray-300 p-2 align-middle">
                                    <div className="flex items-center space-x-2">
                                        <button className="text-gray-600 hover:text-blue-600">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>
                                        <button className="text-gray-600 hover:text-red-600">
                                            {entry.status === 1 ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-600">
                        Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries}{' '}
                        entries
                    </p>
                    <div className="flex space-x-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="border border-gray-300 rounded-lg px-4 py-1 hover:bg-gray-100 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button className="border border-gray-300 rounded-lg px-4 py-1 bg-blue-50 text-blue-600">
                            {currentPage}
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="border border-gray-300 rounded-lg px-4 py-1 hover:bg-gray-100 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableAcademicAdmin;