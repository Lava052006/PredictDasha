import React from 'react';
import { DollarSign, TrendingUp, Target, BarChart3, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const CampaignKPIs = ({ kpis, loading }) => {
    if (loading || !kpis) return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-white p-6 rounded-enterprise border border-enterprise-100 shadow-enterprise animate-pulse h-32"></div>
            ))}
        </div>
    );

    const kpiData = [
        {
            title: "Total Revenue",
            value: kpis.revenue.value,
            change: kpis.revenue.change,
            isPositive: kpis.revenue.isPositive,
            icon: <DollarSign className="text-blue-600" size={24} />,
            bg: "bg-blue-50"
        },
        {
            title: "Total Spend",
            value: kpis.spend.value,
            change: kpis.spend.change,
            isPositive: !kpis.spend.isPositive,
            icon: <BarChart3 className="text-purple-600" size={24} />,
            bg: "bg-purple-50"
        },
        {
            title: "Avg ROAS",
            value: kpis.roas.value,
            change: kpis.roas.change,
            isPositive: kpis.roas.isPositive,
            icon: <TrendingUp className="text-green-600" size={24} />,
            bg: "bg-green-50"
        },
        {
            title: "Avg CAC",
            value: kpis.cac.value,
            change: kpis.cac.change,
            isPositive: kpis.cac.isPositive,
            icon: <Target className="text-orange-600" size={24} />,
            bg: "bg-orange-50"
        },
        {
            title: "Top Performer",
            value: kpis.top_performer || "N/A",
            isStatic: true,
            icon: <Award className="text-amber-600" size={24} />,
            bg: "bg-amber-50"
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {kpiData.map((kpi, idx) => (
                <div key={idx} className="bg-white p-6 rounded-enterprise border border-enterprise-100 shadow-enterprise transition-all hover:shadow-lg flex flex-col h-full group">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-enterprise ${kpi.bg}`}>
                            {kpi.icon}
                        </div>
                        {!kpi.isStatic && (
                            <div className={`flex items-center gap-1 text-sm font-bold ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {kpi.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                {Math.abs(kpi.change)}%
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-enterprise-400">{kpi.title}</p>
                        <h3 className="text-xl font-bold text-enterprise-900 mt-1 break-words">{kpi.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CampaignKPIs;
