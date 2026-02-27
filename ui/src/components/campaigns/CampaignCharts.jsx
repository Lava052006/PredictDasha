import React, { useState } from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { ChevronDown } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const CampaignRevenueChart = ({ data, loading }) => {
    if (loading) return <div className="h-[350px] flex items-center justify-center bg-enterprise-50 rounded-enterprise animate-pulse font-medium text-enterprise-400">Loading Revenue Data...</div>;

    return (
        <div className="bg-white p-6 rounded-enterprise border border-enterprise-100 shadow-enterprise h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-enterprise-900 mb-6">Revenue by Campaign</h3>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="campaign" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `$${val >= 1000 ? (val / 1000).toFixed(1) + 'K' : val}`} />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export const PerformanceTrendChart = ({ data, campaigns, loading }) => {
    const [selectedCampaign, setSelectedCampaign] = useState('All');

    if (loading) return <div className="h-[350px] flex items-center justify-center bg-enterprise-50 rounded-enterprise animate-pulse font-medium text-enterprise-400">Loading Trends...</div>;

    const filteredData = selectedCampaign === 'All'
        ? Object.values(data.reduce((acc, curr) => {
            if (!acc[curr.date]) acc[curr.date] = { date: curr.date, revenue: 0 };
            acc[curr.date].revenue += curr.revenue;
            return acc;
        }, {})).sort((a, b) => new Date(a.date) - new Date(b.date))
        : data.filter(item => item.campaign === selectedCampaign).sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="bg-white p-6 rounded-enterprise border border-enterprise-100 shadow-enterprise h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-enterprise-900">Revenue Trend</h3>
                <div className="relative">
                    <select
                        className="appearance-none bg-enterprise-50 border border-enterprise-200 rounded-enterprise px-3 py-1.5 pr-8 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-accent-brand text-enterprise-600 cursor-pointer"
                        value={selectedCampaign}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                    >
                        <option value="All">All Campaigns</option>
                        {campaigns.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-2.5 text-enterprise-400 pointer-events-none" />
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={(val) => val.split('-').slice(1).join('/')} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={(val) => `$${val / 1000}K`} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export const ChannelContributionChart = ({ data, loading }) => {
    if (loading) return <div className="h-[350px] flex items-center justify-center bg-enterprise-50 rounded-enterprise animate-pulse font-medium text-enterprise-400">Loading Channel Data...</div>;

    const channels = data.length > 0 ? Object.keys(data[0]).filter(k => k !== 'campaign') : [];

    return (
        <div className="bg-white p-6 rounded-enterprise border border-enterprise-100 shadow-enterprise h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-enterprise-900 mb-6">Channel Contribution</h3>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="campaign" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `$${val / 1000}K`} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                        {channels.map((channel, index) => (
                            <Bar key={channel} dataKey={channel} stackId="a" fill={COLORS[index % COLORS.length]} barSize={40} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export const SegmentPieChart = ({ data, loading }) => {
    if (loading) return <div className="h-[350px] flex items-center justify-center bg-enterprise-50 rounded-enterprise animate-pulse font-medium text-enterprise-400">Loading Segments...</div>;

    return (
        <div className="bg-white p-6 rounded-enterprise border border-enterprise-100 shadow-enterprise h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-enterprise-900 mb-6">Segment Contribution</h3>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="revenue"
                            nameKey="segment"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            layout="horizontal"
                            iconType="circle"
                            formatter={(value) => <span className="text-[12px] font-medium text-enterprise-600 capitalize px-2">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export const ROIHBarChart = ({ data, loading }) => {
    if (loading) return <div className="h-[350px] flex items-center justify-center bg-enterprise-50 rounded-enterprise animate-pulse font-medium text-enterprise-400">Loading ROI Data...</div>;

    return (
        <div className="bg-white p-6 rounded-enterprise border border-enterprise-100 shadow-enterprise h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-enterprise-900 mb-6">Campaign ROAS</h3>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis dataKey="campaign" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} width={110} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} formatter={(val) => [`${val}x`, 'ROAS']} />
                        <Bar dataKey="roas" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
