import React, { useState, useEffect } from 'react';
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { TrendingUp, Calendar, Info, ArrowUpRight } from 'lucide-react';
import { getForecast } from '../services/api';

const Forecasting = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getForecast().then(res => {
            setData(res.data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-8 text-center text-enterprise-500">Loading forecast...</div>;

    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-enterprise-900 font-sans">Revenue Forecasting</h2>
                    <p className="text-enterprise-500">Prophet-based 30-day projection model</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white px-4 py-2 rounded-enterprise shadow-enterprise border border-enterprise-100 flex items-center gap-2">
                        <span className="text-sm font-medium text-enterprise-500">Projected Growth:</span>
                        <span className="text-md font-bold text-accent-success flex items-center">
                            <ArrowUpRight size={16} /> {data.projectedGrowth}%
                        </span>
                    </div>
                    <div className="bg-accent-brand text-white px-4 py-2 rounded-enterprise shadow-enterprise flex items-center gap-2 font-medium">
                        <Calendar size={18} />
                        <span>Next 30 Days: ${data.next30DaysRevenue.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-enterprise shadow-enterprise border border-enterprise-100 min-h-[500px] flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="text-accent-brand" size={20} />
                    <h3 className="text-lg font-bold text-enterprise-900">Revenue Projection Model</h3>
                </div>

                <div className="flex-1 min-h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data.data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={v => `$${v}`} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)' }}
                                formatter={(value) => value ? [`$${value.toLocaleString()}`, ''] : [null, null]}
                            />
                            <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px' }} />

                            {/* Confidence interval area */}
                            <Area
                                type="monotone"
                                dataKey="upperBound"
                                stroke="none"
                                fill="#3b82f6"
                                fillOpacity={0.1}
                                name="Confidence Interval"
                                baseValue={(data) => data.lowerBound}
                            />

                            {/* Actual history */}
                            <Line
                                type="monotone"
                                dataKey="actualRevenue"
                                stroke="#1e293b"
                                strokeWidth={3}
                                dot={false}
                                name="Actual Revenue"
                                connectNulls
                            />

                            {/* Forecasted line */}
                            <Line
                                type="monotone"
                                dataKey="predictedRevenue"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                strokeDasharray="5 5"
                                dot={false}
                                name="Predicted Revenue"
                                connectNulls
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6 p-4 bg-enterprise-50 rounded-enterprise flex gap-3 text-sm text-enterprise-600 border border-enterprise-100">
                    <Info size={20} className="text-accent-brand flex-shrink-0" />
                    <p>
                        This model uses a <strong>fbProphet</strong> forecasting algorithm analyzing the last 18 months of historical seasonal data.
                        The shaded area represents the 95% confidence interval for future performance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Forecasting;
