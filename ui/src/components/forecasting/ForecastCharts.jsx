import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar,
    Legend, Cell
} from 'recharts';

export const RevenueForecastChart = ({ data, loading }) => {
    if (loading) return <div className="h-[450px] flex items-center justify-center bg-enterprise-50 rounded-enterprise animate-pulse font-medium text-enterprise-400">Modeling Prediction...</div>;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-enterprise-100 shadow-xl rounded-xl">
                    <p className="text-sm font-bold text-enterprise-900 mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs font-semibold py-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                            <span className="text-enterprise-500 capitalize">{entry.name}:</span>
                            <span className="text-enterprise-900">${entry.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-8 rounded-enterprise border border-enterprise-100 shadow-enterprise h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-enterprise-900">Revenue Forecast vs Historical</h3>
                    <p className="text-sm text-enterprise-500 mt-1">Next 30 days Prophet prediction with 80% confidence interval</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-0.5 bg-enterprise-300"></div>
                        <span className="text-xs font-bold text-enterprise-500">Historical</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-0.5 bg-accent-brand"></div>
                        <span className="text-xs font-bold text-enterprise-500">Forecast</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 11 }}
                            tickFormatter={(val) => {
                                const d = new Date(val);
                                return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                            }}
                            minTickGap={30}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 11 }}
                            tickFormatter={(val) => `$${val >= 1000 ? (val / 1000).toFixed(0) + 'K' : val}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="upper"
                            stroke="none"
                            fill="#3b82f6"
                            fillOpacity={0.05}
                            baseValue="lower"
                            name="Confidence Band"
                        />
                        <Area
                            type="monotone"
                            dataKey="lower"
                            stroke="none"
                            fill="none"
                        />
                        <Line
                            type="monotone"
                            dataKey="actual"
                            stroke="#cbd5e1"
                            strokeWidth={2}
                            dot={false}
                            name="Historical"
                        />
                        <Line
                            type="monotone"
                            dataKey="forecast"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={false}
                            name="Forecast"
                            strokeDasharray="5 5"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export const TrendComponentChart = ({ data, loading }) => {
    if (loading) return <div className="h-[300px] flex items-center justify-center bg-enterprise-50 rounded-enterprise animate-pulse font-medium text-enterprise-400">Loading Trend...</div>;

    return (
        <div className="bg-white p-6 rounded-enterprise border border-enterprise-100 shadow-enterprise h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-enterprise-900 mb-6">Long-term Trend</h3>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 11 }}
                            tickFormatter={(val) => val.split('-').slice(1).join('/')}
                            minTickGap={50}
                        />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            formatter={(val) => [`$${val.toLocaleString()}`, 'Trend Line']}
                        />
                        <Line type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export const WeeklySeasonalityChart = ({ data, loading }) => {
    if (loading) return <div className="h-[300px] flex items-center justify-center bg-enterprise-50 rounded-enterprise animate-pulse font-medium text-enterprise-400">Loading Seasonality...</div>;

    return (
        <div className="bg-white p-6 rounded-enterprise border border-enterprise-100 shadow-enterprise h-[400px] flex flex-col">
            <h3 className="text-lg font-bold text-enterprise-900 mb-6">Weekly Seasonality</h3>
            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                        <YAxis axisLine={false} tickLine={false} hide />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            formatter={(val) => [`${val > 0 ? '+' : ''}$${val.toLocaleString()}`, 'Impact']}
                        />
                        <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={40}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.value >= 0 ? '#10b981' : '#f43f5e'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
