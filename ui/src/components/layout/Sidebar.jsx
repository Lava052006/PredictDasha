import React, { useState } from 'react';
import {
    LayoutDashboard,
    BarChart3,
    TrendingUp,
    AlertCircle,
    FileText,
    Download,
    ChevronLeft,
    ChevronRight,
    Menu
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { name: 'Campaign Analytics', icon: <BarChart3 size={20} />, path: '/campaigns' },
        { name: 'Forecasting', icon: <TrendingUp size={20} />, path: '/forecasting' },
        { name: 'Anomaly Detection', icon: <AlertCircle size={20} />, path: '/anomalies' },
        { name: 'AI Intelligence', icon: <FileText size={20} />, path: '/ai-intelligence' },
        { name: 'Reports Export', icon: <Download size={20} />, path: '/reports' },
    ];

    return (
        <aside
            className={`bg-white border-r border-enterprise-200 transition-all duration-300 ease-in-out z-30 flex flex-col h-screen shrink-0 ${isOpen ? 'w-64 min-w-[250px]' : 'w-20'}`}
        >
            <div className="p-4 flex items-center justify-between border-b border-enterprise-100">
                <div className={`flex items-center gap-2 overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-8 h-8 bg-accent-brand rounded-lg flex items-center justify-center text-white font-bold">M</div>
                    <span className="font-bold text-enterprise-800 whitespace-nowrap">Marketing AI</span>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-lg hover:bg-enterprise-100 text-enterprise-500"
                >
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-2">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `
                  flex items-center gap-3 p-3 rounded-enterprise transition-colors duration-200
                  ${isActive
                                        ? 'bg-enterprise-100 text-accent-brand border-l-4 border-accent-brand'
                                        : 'text-enterprise-500 hover:bg-enterprise-50 hover:text-enterprise-700'}
                  ${!isOpen && 'justify-center p-3'}
                `}
                            >
                                <div className={`${!isOpen && 'min-w-[20px]'}`}>{item.icon}</div>
                                {isOpen && <span className="font-medium truncate">{item.name}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-enterprise-100">
                <div className={`flex items-center gap-3 overflow-hidden ${!isOpen && 'justify-center'}`}>
                    <div className="w-8 h-8 rounded-full bg-enterprise-200 flex items-center justify-center text-enterprise-600 font-medium">DB</div>
                    {isOpen && (
                        <div className="text-sm">
                            <p className="font-medium text-enterprise-800">Darsh Borse</p>
                            <p className="text-enterprise-500 text-xs truncate">dars@example.com</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
