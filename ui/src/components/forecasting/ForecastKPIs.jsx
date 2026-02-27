import React from 'react';
import { TrendingUp, TrendingDown, Target, Zap, BarChart2 } from 'lucide-react';

const ForecastKPIs = ({ kpis }) => {
    if (!kpis) return null;

    const cards = [
        {
            title: 'Predicted Revenue',
            value: kpis.totalPredictedRevenue,
            subtitle: 'Next 30 Days',
            icon: Target,
            color: 'text-accent-brand',
            bgColor: 'bg-blue-50'
        },
        {
            title: 'Expected Growth',
            value: `${kpis.expectedGrowth >= 0 ? '+' : ''}${kpis.expectedGrowth}%`,
            subtitle: 'vs Last 30 Days',
            icon: kpis.expectedGrowth >= 0 ? TrendingUp : TrendingDown,
            color: kpis.expectedGrowth >= 0 ? 'text-green-600' : 'text-red-600',
            bgColor: kpis.expectedGrowth >= 0 ? 'bg-green-50' : 'bg-red-50'
        },
        {
            title: 'Avg Daily Revenue',
            value: kpis.avgDailyForecast,
            subtitle: 'Projected Daily Average',
            icon: Zap,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            title: 'Peak Predicted Day',
            value: kpis.peakDay,
            subtitle: 'Highest Sales Projection',
            icon: BarChart2,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        },
        {
            title: 'Lowest Predicted Day',
            value: kpis.troughDay,
            subtitle: 'Anticipated Sales Floor',
            icon: TrendingDown,
            color: 'text-enterprise-400',
            bgColor: 'bg-enterprise-50'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {cards.map((card, index) => (
                <div key={index} className="bg-white p-6 rounded-enterprise border border-enterprise-100 shadow-enterprise transition-all hover:shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-2.5 ${card.bgColor} rounded-lg`}>
                            <card.icon className={card.color} size={20} />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-enterprise-500 mb-1 leading-tight">{card.title}</p>
                        <h4 className={`text-xl font-bold ${card.color} tracking-tight break-words`} title={card.value}>{card.value}</h4>
                        <p className="text-xs text-enterprise-400 mt-2 font-medium leading-tight">{card.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ForecastKPIs;
