import React, { useState, useEffect } from 'react';
import {
    getKPIs,
    getCampaignPerformance,
    getCampaignRevenue,
    getChannelContribution,
    getSegmentContribution,
    getCampaignROI,
    getRevenueTrend,
    getAICampaignInsights
} from '../services/api';
import CampaignKPIs from '../components/campaigns/CampaignKPIs';
import CampaignTable from '../components/campaigns/CampaignTable';
import {
    CampaignRevenueChart,
    PerformanceTrendChart,
    ChannelContributionChart,
    SegmentPieChart,
    ROIHBarChart
} from '../components/campaigns/CampaignCharts';
import AICampaignPanel from '../components/campaigns/AICampaignPanel';
import { Loader2, RefreshCw } from 'lucide-react';

const CampaignAnalytics = ({ filters }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        kpis: null,
        performance: [],
        revenue: [],
        channels: [],
        segments: [],
        roi: [],
        trend: null,
        insights: null
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [
                kpiRes, perfRes, revRes, chanRes, segRes, roiRes, trendRes, insightsRes
            ] = await Promise.all([
                getKPIs(filters),
                getCampaignPerformance(filters),
                getCampaignRevenue(filters),
                getChannelContribution(filters),
                getSegmentContribution(filters),
                getCampaignROI(filters),
                getRevenueTrend(filters),
                getAICampaignInsights(filters)
            ]);

            setData({
                kpis: kpiRes.data,
                performance: perfRes.data,
                revenue: revRes.data,
                channels: chanRes.data,
                segments: segRes.data,
                roi: roiRes.data,
                trend: trendRes.data,
                insights: insightsRes.data
            });
        } catch (error) {
            console.error("Error fetching campaign analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters]);

    if (loading && !data.kpis) {
        return (
            <div className="flex-1 flex items-center justify-center bg-enterprise-50">
                <div className="text-center">
                    <Loader2 className="animate-spin text-accent-brand mx-auto mb-4" size={48} />
                    <h2 className="text-xl font-bold text-enterprise-900">Processing Analytics Data</h2>
                    <p className="text-enterprise-500 mt-2">Aggregating live campaign intelligence...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-enterprise-50 p-6 md:p-8 overflow-y-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-enterprise-900 tracking-tight">Campaign Intelligence</h2>
                    <p className="text-enterprise-500 mt-1">Advanced aggregated performance and ROI analytics</p>
                </div>
                <button
                    onClick={fetchData}
                    className="flex items-center gap-2 text-sm font-semibold text-enterprise-600 bg-white px-4 py-2 rounded-enterprise border border-enterprise-100 hover:bg-enterprise-50 transition-all shadow-sm"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    Refresh Intelligence
                </button>
            </div>

            {/* Top Row: KPIs */}
            <div className="mb-8">
                <CampaignKPIs kpis={data.kpis} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8 items-start">
                <div className="xl:col-span-3 space-y-8">
                    {/* Row 1: Main Revenue & Trends */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <CampaignRevenueChart data={data.revenue} loading={loading} />
                        <PerformanceTrendChart
                            data={data.trend?.data || []}
                            campaigns={data.trend?.campaigns || []}
                            loading={loading}
                        />
                    </div>

                    {/* Row 2: Composition Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <ChannelContributionChart data={data.channels} loading={loading} />
                        <SegmentPieChart data={data.segments} loading={loading} />
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        <ROIHBarChart data={data.roi} loading={loading} />
                    </div>

                    {/* Row 3: Full Table */}
                    <CampaignTable campaigns={data.performance} loading={loading} />
                </div>

                {/* AI Panel Column */}
                <div className="xl:col-span-1 h-full sticky top-24">
                    <AICampaignPanel insights={data.insights} loading={loading} />
                </div>
            </div>
        </div>
    );
};

export default CampaignAnalytics;
