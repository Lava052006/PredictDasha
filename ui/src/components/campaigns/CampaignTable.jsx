import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

const CampaignTable = ({ campaigns, loading }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'revenue', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    if (loading) return <div className="h-64 flex items-center justify-center bg-white rounded-enterprise border border-enterprise-100 shadow-enterprise animate-pulse font-bold text-enterprise-300">Loading Table Data...</div>;
    if (!campaigns || campaigns.length === 0) return <div className="p-12 text-center bg-white rounded-enterprise border border-enterprise-100 shadow-enterprise text-enterprise-400 italic">No data available for the selected filters.</div>;

    // Filter
    const filteredCampaigns = campaigns.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.segment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort
    const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedCampaigns.length / itemsPerPage);
    const currentItems = sortedCampaigns.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const SortIcon = ({ column }) => {
        if (sortConfig.key !== column) return <ChevronDown size={14} className="opacity-20" />;
        return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
    };

    const getROASColor = (roas) => {
        if (roas > 3) return 'text-green-600 font-bold';
        if (roas < 2) return 'text-red-600 font-bold';
        return 'text-enterprise-900';
    };

    return (
        <div className="bg-white rounded-enterprise border border-enterprise-100 shadow-enterprise overflow-hidden mb-8">
            <div className="p-6 border-b border-enterprise-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-enterprise-900">Campaign Performance Details</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-enterprise-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search campaigns, channels or segments..."
                        className="pl-10 pr-4 py-2 bg-enterprise-50 border border-enterprise-200 rounded-enterprise focus:outline-none focus:ring-2 focus:ring-accent-brand w-full md:w-80 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-enterprise-50 text-enterprise-500 text-xs uppercase tracking-wider font-semibold">
                        <tr>
                            {[
                                { key: 'name', label: 'Campaign' },
                                { key: 'channel', label: 'Channel' },
                                { key: 'segment', label: 'Segment' },
                                { key: 'revenue', label: 'Revenue' },
                                { key: 'spend', label: 'Spend' },
                                { key: 'conversions', label: 'Conversions' },
                                { key: 'roas', label: 'ROAS' },
                                { key: 'cac', label: 'CAC' }
                            ].map((col) => (
                                <th
                                    key={col.key}
                                    className="px-6 py-4 cursor-pointer hover:text-enterprise-900 transition-colors whitespace-nowrap"
                                    onClick={() => handleSort(col.key)}
                                >
                                    <div className="flex items-center gap-1">
                                        {col.label}
                                        <SortIcon column={col.key} />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-enterprise-100">
                        {currentItems.map((c) => (
                            <tr key={c.id} className="hover:bg-enterprise-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-enterprise-900 text-sm">{c.name}</td>
                                <td className="px-6 py-4 text-enterprise-600 text-sm">
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-xs font-semibold uppercase">
                                        {c.channel}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-enterprise-600 text-sm italic">{c.segment}</td>
                                <td className="px-6 py-4 text-enterprise-900 font-medium text-sm">${c.revenue.toLocaleString()}</td>
                                <td className="px-6 py-4 text-enterprise-600 text-sm whitespace-nowrap">${c.spend.toLocaleString()}</td>
                                <td className="px-6 py-4 text-enterprise-900 text-sm">{c.conversions.toLocaleString()}</td>
                                <td className={`px-6 py-4 text-sm ${getROASColor(c.roas)}`}>{c.roas.toFixed(2)}x</td>
                                <td className="px-6 py-4 text-enterprise-600 text-sm font-semibold">${c.cac.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="p-4 border-t border-enterprise-100 flex items-center justify-between bg-enterprise-50">
                    <p className="text-sm text-enterprise-500 font-medium">
                        Showing <span className="text-enterprise-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-enterprise-900">{Math.min(currentPage * itemsPerPage, filteredCampaigns.length)}</span> of <span className="text-enterprise-900">{filteredCampaigns.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="px-4 py-2 bg-white border border-enterprise-200 rounded-enterprise text-sm font-semibold text-enterprise-600 hover:bg-enterprise-100 hover:text-enterprise-900 disabled:opacity-50 shadow-sm transition-all"
                        >
                            Previous
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="px-4 py-2 bg-white border border-enterprise-200 rounded-enterprise text-sm font-semibold text-enterprise-600 hover:bg-enterprise-100 hover:text-enterprise-900 disabled:opacity-50 shadow-sm transition-all"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignTable;
