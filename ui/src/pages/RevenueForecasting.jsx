import React, { useState, useEffect } from 'react';
import {
    getRevenueForecast,
    getForecastComponents,
    getAIForecastInsights
} from '../services/api';
import ForecastKPIs from '../components/forecasting/ForecastKPIs';
import {
    RevenueForecastChart,
    TrendComponentChart,
    WeeklySeasonalityChart
} from '../components/forecasting/ForecastCharts';
import { Loader2, RefreshCw, Calendar, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const RevenueForecasting = ({ filters }) => {
    const [loading, setLoading] = useState(true);
    const [horizon, setHorizon] = useState(30);
    const [data, setData] = useState({
        forecast: null,
        components: null,
        insights: []
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [forecastRes, componentsRes, insightsRes] = await Promise.all([
                getRevenueForecast(filters, horizon),
                getForecastComponents(filters, horizon),
                getAIForecastInsights(filters, horizon)
            ]);

            setData({
                forecast: forecastRes.data,
                components: componentsRes.data.components,
                insights: insightsRes.data.insights
            });
        } catch (error) {
            console.error("Error fetching forecast data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters, horizon]);

    if (loading && !data.forecast) {
        return (
            <div className="flex-1 flex items-center justify-center bg-enterprise-50">
                <div className="text-center">
                    <Loader2 className="animate-spin text-accent-brand mx-auto mb-4" size={48} />
                    <h2 className="text-xl font-bold text-enterprise-900">Training Prediction Models</h2>
                    <p className="text-enterprise-500 mt-2">Prophet AI is analyzing historical trends and seasonality...</p>
                </div>
            </div>
        );
    }

    const trend = data.forecast?.kpis?.trendStatus || 'stable';

    return (
        <div className="flex-1 bg-enterprise-50 p-6 md:p-8 overflow-y-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-enterprise-900 tracking-tight">Revenue Forecasting</h2>
                    <p className="text-enterprise-500 mt-1">Prophet-powered predictive intelligence for business planning</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select
                            className="appearance-none bg-white border border-enterprise-200 rounded-enterprise px-4 py-2 pr-10 text-sm font-semibold text-enterprise-700 outline-none focus:ring-2 focus:ring-accent-brand/20 shadow-sm shadow-enterprise-100"
                            value={horizon}
                            onChange={(e) => setHorizon(Number(e.target.value))}
                        >
                            <option value={7}>Next 7 Days</option>
                            <option value={30}>Next 30 Days</option>
                            <option value={60}>Next 60 Days</option>
                            <option value={90}>Next 90 Days</option>
                        </select>
                        <Calendar size={16} className="absolute right-3.5 top-2.5 text-enterprise-400 pointer-events-none" />
                    </div>
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 text-sm font-semibold text-enterprise-600 bg-white px-4 py-2 rounded-enterprise border border-enterprise-100 hover:bg-enterprise-50 transition-all shadow-sm"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                        Re-train Models
                    </button>
                </div>
            </div>

            {/* Top Row: KPIs */}
            <div className="mb-8">
                <ForecastKPIs kpis={data.forecast?.kpis} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8 items-start">
                <div className="xl:col-span-3 space-y-8">
                    {/* Main Forecast Chart */}
                    <RevenueForecastChart data={data.forecast?.data || []} loading={loading} />

                    {/* Breakdown Components */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <TrendComponentChart data={data.components?.trend || []} loading={loading} />
                        <WeeklySeasonalityChart data={data.components?.weekly || []} loading={loading} />
                    </div>
                </div>

                {/* AI Insights & Trend Column */}
                <div className="xl:col-span-1 space-y-6 sticky top-24">
                    {/* Trend Status Card */}
                    <div className={`p-6 rounded-enterprise border ${trend === 'growth' ? 'bg-green-50 border-green-100' :
                            trend === 'decline' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'
                        } shadow-sm`}>
                        <div className="flex items-center gap-3 mb-3">
                            {trend === 'growth' ? <TrendingUp className="text-green-600" /> :
                                trend === 'decline' ? <TrendingDown className="text-red-600" /> : <Minus className="text-blue-600" />}
                            <h4 className={`font-bold ${trend === 'growth' ? 'text-green-800' :
                                    trend === 'decline' ? 'text-red-800' : 'text-blue-800'
                                }`}>
                                {trend === 'growth' ? 'Growth Expected' :
                                    trend === 'decline' ? 'Decline Expected' : 'Stable Trend'}
                            </h4>
                        </div>
                        <p className={`text-sm ${trend === 'growth' ? 'text-green-700' :
                                trend === 'decline' ? 'text-red-700' : 'text-blue-700'
                            }`}>
                            Prophet models indicate a {trend} period ahead. Adjusting resources is recommended.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-enterprise border border-enterprise-100 shadow-enterprise">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="text-accent-brand" size={18} />
                            <h3 className="font-bold text-enterprise-900">Forecast Intelligence</h3>
                        </div>
                        <div className="space-y-4">
                            {data.insights.map((insight, idx) => (
                                <div key={idx} className={`p-4 rounded-xl border-l-4 ${insight.type === 'success' ? 'border-green-500 bg-green-50/50' :
                                        insight.type === 'warning' ? 'border-red-500 bg-red-50/50' : 'border-blue-500 bg-blue-50/50'
                                    }`}>
                                    <h5 className="text-sm font-bold text-enterprise-900 mb-1">{insight.title}</h5>
                                    <p className="text-xs text-enterprise-600 leading-relaxed font-medium">
                                        {insight.description}
                                    </p>
                                </div>
                            ))}
                            {data.insights.length === 0 && (
                                <div className="text-center py-8">
                                    <div className="bg-enterprise-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Sparkles className="text-enterprise-300" size={20} />
                                    </div>
                                    <p className="text-sm text-enterprise-400 font-medium">No tactical insights for this horizon</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueForecasting;
