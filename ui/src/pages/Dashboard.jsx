import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Users, Zap } from 'lucide-react';
import { getKPIs, getPerformanceChart, getAIInsights, getCampaigns } from '../services/api';
import KPICards from '../components/dashboard/KPICards';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import CampaignTable from '../components/dashboard/CampaignTable';
import AIPanel from '../components/dashboard/AIPanel';

const Dashboard = ({ filters }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        kpis: null,
        performance: null,
        ai: null,
        campaigns: []
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [kpisRes, perfRes, aiRes, campRes] = await Promise.all([
                    getKPIs(filters),
                    getPerformanceChart(filters),
                    getAIInsights(filters),
                    getCampaigns(filters)
                ]);

                setData({
                    kpis: kpisRes.data,
                    performance: perfRes.data,
                    ai: aiRes.data,
                    campaigns: campRes.data
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-brand"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[1600px] mx-auto space-y-6">
            {/* SECTION 1: KPI Cards */}
            <KPICards kpis={data.kpis} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* SECTION 2: Time-Series Performance Chart */}
                <div className="lg:col-span-2">
                    <PerformanceChart data={data.performance} />
                </div>

                {/* SECTION 4: AI Intelligence Panel */}
                <div className="lg:col-span-1">
                    <AIPanel insights={data.ai} />
                </div>
            </div>

            {/* SECTION 3: Campaign Performance Table */}
            <CampaignTable campaigns={data.campaigns} />
        </div>
    );
};

export default Dashboard;
