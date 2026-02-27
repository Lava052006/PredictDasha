import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const KPIItem = ({ title, value, change, isPositive, icon: Icon }) => (
    <div className="bg-white p-6 rounded-enterprise shadow-enterprise border border-enterprise-100 transition-all hover:shadow-soft flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-enterprise-50 text-enterprise-500">
                <Icon size={22} />
            </div>
            <div className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {isPositive ? <ArrowUpRight size={14} className="mr-0.5" /> : <ArrowDownRight size={14} className="mr-0.5" />}
                {Math.abs(change)}%
            </div>
        </div>

        <div>
            <p className="text-enterprise-500 text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-enterprise-900 mt-1">{value}</h3>
        </div>

        <div className="mt-4 pt-4 border-t border-enterprise-50 flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-enterprise-400">vs previous period</span>
        </div>
    </div>
);

const KPICards = ({ kpis }) => {
    if (!kpis) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPIItem
                title="Total Revenue"
                value={kpis.revenue.value}
                change={kpis.revenue.change}
                isPositive={kpis.revenue.isPositive}
                icon={TrendingUp}
            />
            <KPIItem
                title="Total Spend"
                value={kpis.spend.value}
                change={kpis.spend.change}
                isPositive={kpis.spend.isPositive}
                icon={TrendingDown}
            />
            <KPIItem
                title="Average CAC"
                value={kpis.cac.value}
                change={kpis.cac.change}
                isPositive={kpis.cac.isPositive}
                icon={TrendingUp}
            />
            <KPIItem
                title="Average ROAS"
                value={kpis.roas.value}
                change={kpis.roas.change}
                isPositive={kpis.roas.isPositive}
                icon={TrendingUp}
            />
        </div>
    );
};

export default KPICards;
