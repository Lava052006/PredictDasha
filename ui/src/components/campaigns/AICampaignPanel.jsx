import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, DollarSign, Info, Target } from 'lucide-react';

const AICampaignPanel = ({ insights }) => {
    if (!insights || !insights.insights) return null;

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'TrendingUp': return <TrendingUp size={20} />;
            case 'AlertTriangle': return <AlertTriangle size={20} />;
            case 'DollarSign': return <DollarSign size={20} />;
            case 'Target': return <Target size={20} />;
            default: return <Info size={20} />;
        }
    };

    const getTypeStyles = (type) => {
        switch (type) {
            case 'success': return 'bg-green-50 text-green-700 border-green-100';
            case 'warning': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'danger': return 'bg-red-50 text-red-700 border-red-100';
            case 'info': return 'bg-blue-50 text-blue-700 border-blue-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    return (
        <div className="bg-white rounded-enterprise border border-enterprise-100 shadow-enterprise h-full flex flex-col">
            <div className="p-6 border-b border-enterprise-100 flex items-center gap-3">
                <div className="p-2 bg-accent-brand/10 rounded-lg text-accent-brand">
                    <Sparkles size={20} />
                </div>
                <h3 className="text-lg font-bold text-enterprise-900">Campaign Intelligence</h3>
            </div>

            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                {insights.insights.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-enterprise-400 text-sm italic">No specific insights for the selected filters.</p>
                    </div>
                ) : (
                    insights.insights.map((insight, idx) => (
                        <div
                            key={idx}
                            className={`p-4 rounded-enterprise border ${getTypeStyles(insight.type)} flex gap-4 transition-all hover:scale-[1.02]`}
                        >
                            <div className="shrink-0 mt-1">
                                {getIcon(insight.icon)}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm mb-1">{insight.title}</h4>
                                <p className="text-xs leading-relaxed opacity-90">{insight.description}</p>
                            </div>
                        </div>
                    ))
                )}

                <div className="mt-6 p-4 bg-enterprise-50 rounded-enterprise border border-dashed border-enterprise-200">
                    <h5 className="text-[10px] uppercase tracking-wider font-bold text-enterprise-400 mb-2">Automated Optimization</h5>
                    <p className="text-xs text-enterprise-600 italic">
                        "Models suggest increasing LinkedIn spend by 12% to capture rising demand in the North region."
                    </p>
                </div>
            </div>

            <div className="p-4 bg-enterprise-50/50 border-t border-enterprise-100">
                <button className="w-full py-2 bg-white border border-enterprise-200 text-enterprise-600 text-xs font-bold rounded-enterprise hover:bg-enterprise-50 transition-colors">
                    Generate Deep Report
                </button>
            </div>
        </div>
    );
};

export default AICampaignPanel;
