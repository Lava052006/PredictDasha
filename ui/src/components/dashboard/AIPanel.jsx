import React from 'react';
import { Sparkles, Brain, ArrowRight, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

const AIPanel = ({ insights }) => {
    if (!insights) return null;

    return (
        <div className="bg-enterprise-900 text-white p-6 rounded-enterprise shadow-lg flex flex-col h-full overflow-hidden relative">
            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-brand opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-accent-brand" size={20} />
                    <h3 className="font-bold text-lg">AI Intelligence Report</h3>
                </div>
                <div className="px-3 py-1 bg-accent-brand/20 border border-accent-brand/30 rounded-full flex items-center gap-1.5">
                    <Brain size={14} className="text-accent-brand" />
                    <span className="text-xs font-bold text-accent-brand">Score: {insights.healthScore}</span>
                </div>
            </div>

            <div className="space-y-6 relative z-10 flex-1">
                <section>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-enterprise-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-accent-success" />
                        Key Insights
                    </h4>
                    <ul className="space-y-2">
                        {insights.kpiInsights.map((insight, idx) => (
                            <li key={idx} className="text-sm text-enterprise-200 flex gap-2">
                                <span className="text-accent-brand">•</span>
                                {insight}
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-enterprise-400 mb-3 flex items-center gap-2">
                        <TrendingUp size={12} className="text-accent-brand" />
                        Forecast Summary
                    </h4>
                    <p className="text-sm text-enterprise-200 leading-relaxed italic border-l-2 border-accent-brand/30 pl-3">
                        "{insights.forecastSummary}"
                    </p>
                </section>

                <section>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-enterprise-400 mb-3 flex items-center gap-2">
                        <AlertTriangle size={12} className="text-accent-danger" />
                        Anomaly Insights
                    </h4>
                    <p className="text-sm text-enterprise-200">
                        {insights.anomalyInsights}
                    </p>
                </section>
            </div>

            <button className="mt-8 group flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-enterprise transition-all text-sm font-semibold relative z-10">
                Review Full Report
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default AIPanel;
