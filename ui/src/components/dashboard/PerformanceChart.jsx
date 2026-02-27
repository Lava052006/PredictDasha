import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const PerformanceChart = ({ data }) => {
    const [toggle, setToggle] = useState('daily');

    if (!data || !data.data) return null;

    const chartData = data.data;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-enterprise-100 shadow-soft rounded-enterprise">
                    <p className="text-sm font-semibold text-enterprise-900 mb-2">{label}</p>
                    <div className="space-y-1">
                        <p className="text-xs text-blue-600 flex justify-between gap-4">
                            <span>Revenue:</span>
                            <span className="font-bold">${payload[0].value.toLocaleString()}</span>
                        </p>
                        <p className="text-xs text-enterprise-400 flex justify-between gap-4">
                            <span>Spend:</span>
                            <span className="font-bold">${payload[1].value.toLocaleString()}</span>
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-enterprise shadow-enterprise border border-enterprise-100 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-enterprise-900">Revenue vs Spend</h3>
                    <p className="text-sm text-enterprise-400">Time-series performance overview</p>
                </div>

                <div className="flex bg-enterprise-50 p-1 rounded-lg">
                    {['daily', 'weekly', 'monthly'].map((period) => (
                        <button
                            key={period}
                            onClick={() => setToggle(period)}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${toggle === period
                                    ? 'bg-white text-accent-brand shadow-sm'
                                    : 'text-enterprise-500 hover:text-enterprise-700'
                                }`}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            name="Revenue"
                        />
                        <Line
                            type="monotone"
                            dataKey="spend"
                            stroke="#94a3b8"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                            name="Spend"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceChart;
