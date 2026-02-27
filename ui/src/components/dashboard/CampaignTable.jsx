import React from 'react';
import { ArrowUpDown, ExternalLink, MoreVertical } from 'lucide-react';

const CampaignTable = ({ campaigns }) => {
    return (
        <div className="bg-white rounded-enterprise shadow-enterprise border border-enterprise-100 overflow-hidden">
            <div className="p-6 border-b border-enterprise-50 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-enterprise-900">Campaign Performance</h3>
                    <p className="text-sm text-enterprise-400">Detailed breakdown of active marketing efforts</p>
                </div>
                <button className="text-accent-brand text-sm font-semibold hover:underline flex items-center gap-1">
                    View All <ExternalLink size={14} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-enterprise-50 text-enterprise-500 uppercase text-[10px] font-bold tracking-wider">
                            <th className="px-6 py-4 border-b border-enterprise-100">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-enterprise-800">
                                    Campaign <ArrowUpDown size={12} />
                                </div>
                            </th>
                            <th className="px-6 py-4 border-b border-enterprise-100 text-right">
                                <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-enterprise-800">
                                    Revenue <ArrowUpDown size={12} />
                                </div>
                            </th>
                            <th className="px-6 py-4 border-b border-enterprise-100 text-right">
                                <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-enterprise-800">
                                    Spend <ArrowUpDown size={12} />
                                </div>
                            </th>
                            <th className="px-6 py-4 border-b border-enterprise-100 text-right">
                                <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-enterprise-800">
                                    ROAS <ArrowUpDown size={12} />
                                </div>
                            </th>
                            <th className="px-6 py-4 border-b border-enterprise-100 text-right">
                                <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-enterprise-800">
                                    CAC <ArrowUpDown size={12} />
                                </div>
                            </th>
                            <th className="px-6 py-4 border-b border-enterprise-100"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-enterprise-50">
                        {campaigns.map((camp) => (
                            <tr key={camp.id} className="hover:bg-enterprise-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="text-sm font-bold text-enterprise-900">{camp.name}</p>
                                        <p className="text-[10px] text-enterprise-400">{camp.id}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-sm font-medium text-enterprise-800">${camp.revenue.toLocaleString()}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-sm text-enterprise-600">${camp.spend.toLocaleString()}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`text-sm font-bold ${camp.roas >= 3 ? 'text-green-600' : camp.roas >= 2 ? 'text-blue-600' : 'text-enterprise-800'}`}>
                                        {camp.roas}x
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-sm text-enterprise-600">${camp.cac}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-enterprise-400 hover:text-enterprise-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CampaignTable;
