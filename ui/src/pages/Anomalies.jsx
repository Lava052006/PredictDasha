import React, { useState, useEffect } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    ReferenceDot
} from 'recharts';
import { AlertTriangle, Info, ShieldAlert, Activity } from 'lucide-react';
import { getAnomalies, getPerformanceChart } from '../services/api';

const Anomalies = () => {
    const [anomalies, setAnomalies] = useState([]);
    const [performance, setPerformance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getAnomalies(), getPerformanceChart()]).then(([anRes, perfRes]) => {
            setAnomalies(anRes.data);
            setPerformance(perfRes.data.data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-8 text-center text-enterprise-500">Detecting anomalies...</div>;

    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-enterprise-900">Anomaly Detection</h2>
                    <p className="text-enterprise-500">Uncovering irregular patterns in marketing performance</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-red-50 text-accent-danger px-4 py-2 rounded-enterprise border border-red-100 flex items-center gap-2 font-medium">
                        <AlertTriangle size={18} />
                        <span>{anomalies.length} Critical Issues Detected</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-enterprise shadow-enterprise border border-enterprise-100 min-h-[400px]">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="text-accent-brand" size={20} />
                        <h3 className="text-lg font-bold text-enterprise-900">Performance Outliers</h3>
                    </div>

                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={performance}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="revenue" stroke="#e2e8f0" strokeWidth={2} dot={false} />

                                {anomalies.map((an, i) => (
                                    <ReferenceDot
                                        key={i}
                                        x={an.date}
                                        y={an.value}
                                        r={6}
                                        fill="#ef4444"
                                        stroke="#fff"
                                        strokeWidth={2}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-4 overflow-y-auto max-h-[400px] pr-2">
                    {anomalies.map((an, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-enterprise shadow-enterprise border-l-4 border-l-accent-danger border-enterprise-100">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h4 className="font-bold text-enterprise-900 flex items-center gap-2">
                                        <ShieldAlert size={16} className="text-accent-danger" />
                                        {an.metric} Anomaly
                                    </h4>
                                    <p className="text-[10px] text-enterprise-400 font-medium uppercase tracking-wider">{an.date}</p>
                                </div>
                                <div className="bg-red-50 text-accent-danger text-xs font-bold px-2 py-0.5 rounded">
                                    Critical
                                </div>
                            </div>
                            <p className="text-sm text-enterprise-600 mb-3">{an.explanation}</p>
                            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-enterprise-50">
                                <div>
                                    <p className="text-[10px] text-enterprise-400 uppercase font-bold">Observed</p>
                                    <p className="text-md font-bold text-accent-danger">${an.value.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-enterprise-400 uppercase font-bold">Expected</p>
                                    <p className="text-md font-bold text-enterprise-400">${an.expectedValue.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-enterprise shadow-enterprise border border-enterprise-100">
                <h3 className="text-lg font-bold text-enterprise-900 mb-4 flex items-center gap-2">
                    <Info size={20} className="text-accent-brand" />
                    Technical Analysis
                </h3>
                <div className="prose prose-sm text-enterprise-600 max-w-none">
                    <p>
                        Our anomaly detection engine utilizes <strong>Isolation Forest</strong> and <strong>STL Decomposition</strong> to identify
                        performance metrics that deviate significantly from historical moving averages.
                        All highlighted points have a z-score greater than 2.5, indicating a high probability of non-random variance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Anomalies;
