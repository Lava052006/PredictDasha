import React from 'react';
import { Calendar, Filter, Download, ChevronDown, Bell, Search } from 'lucide-react';

const Header = ({ filters, setFilters }) => {
    const handleChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <header className="h-16 bg-white border-b border-enterprise-100 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-4 shrink-0 mr-4">
                <h1 className="text-xl font-bold text-enterprise-900 leading-tight">AI Marketing Intelligence System</h1>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center bg-enterprise-50 border border-enterprise-200 rounded-enterprise px-3 py-1.5 gap-2 text-enterprise-600 text-sm hover:bg-enterprise-100 transition-colors">
                    <Calendar size={16} />
                    <select
                        value={filters.days}
                        onChange={(e) => handleChange('days', e.target.value)}
                        className="bg-transparent border-none focus:outline-none cursor-pointer appearance-none pr-4"
                    >
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                        <option value="90">Last 90 Days</option>
                    </select>
                    <ChevronDown size={14} className="-ml-4 pointer-events-none" />
                </div>

                <div className="hidden lg:flex items-center bg-enterprise-50 border border-enterprise-200 rounded-enterprise px-3 py-1.5 gap-2 text-enterprise-600 text-sm hover:bg-enterprise-100 transition-colors">
                    <Filter size={16} />
                    <select
                        value={filters.campaign}
                        onChange={(e) => handleChange('campaign', e.target.value)}
                        className="bg-transparent border-none focus:outline-none cursor-pointer appearance-none pr-4"
                    >
                        <option value="All">All Campaigns</option>
                        <option value="email">Email Marketing</option>
                        <option value="social_media">Social Media</option>
                        <option value="influencer">Influencer</option>
                        <option value="referral">Referral</option>
                        <option value="display">Display Ads</option>
                        <option value="website">Website</option>
                    </select>
                    <ChevronDown size={14} className="-ml-4 pointer-events-none" />
                </div>

                <div className="hidden lg:flex items-center bg-enterprise-50 border border-enterprise-200 rounded-enterprise px-3 py-1.5 gap-2 text-enterprise-600 text-sm hover:bg-enterprise-100 transition-colors">
                    <Search size={16} />
                    <select
                        value={filters.channel}
                        onChange={(e) => handleChange('channel', e.target.value)}
                        className="bg-transparent border-none focus:outline-none cursor-pointer appearance-none pr-4"
                    >
                        <option value="All">All Channels</option>
                        <option value="email">Email</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="tiktok">TikTok</option>
                        <option value="twitter">Twitter</option>
                        <option value="google ads">Google Ads</option>
                    </select>
                    <ChevronDown size={14} className="-ml-4 pointer-events-none" />
                </div>

                <div className="hidden lg:flex items-center bg-enterprise-50 border border-enterprise-200 rounded-enterprise px-3 py-1.5 gap-2 text-enterprise-600 text-sm hover:bg-enterprise-100 transition-colors">
                    <Filter size={16} />
                    <select
                        value={filters.segment}
                        onChange={(e) => handleChange('segment', e.target.value)}
                        className="bg-transparent border-none focus:outline-none cursor-pointer appearance-none pr-4"
                    >
                        <option value="All">All Segments</option>
                        <option value="fashionistas">Fashionistas</option>
                        <option value="foodies">Foodies</option>
                        <option value="outdoor adventurers">Outdoor Adventurers</option>
                        <option value="tech enthusiasts">Tech Enthusiasts</option>
                        <option value="health & wellness">Health & Wellness</option>
                    </select>
                    <ChevronDown size={14} className="-ml-4 pointer-events-none" />
                </div>

                <div className="hidden lg:flex items-center bg-enterprise-50 border border-enterprise-200 rounded-enterprise px-3 py-1.5 gap-2 text-enterprise-600 text-sm hover:bg-enterprise-100 transition-colors">
                    <Filter size={16} />
                    <select
                        value={filters.region}
                        onChange={(e) => handleChange('region', e.target.value)}
                        className="bg-transparent border-none focus:outline-none cursor-pointer appearance-none pr-4"
                    >
                        <option value="Global">Global Region</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                    </select>
                    <ChevronDown size={14} className="-ml-4 pointer-events-none" />
                </div>

                <div className="h-8 w-px bg-enterprise-200 mx-1"></div>

                <button className="p-2 rounded-full hover:bg-enterprise-100 text-enterprise-500 relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-danger rounded-full border-2 border-white"></span>
                </button>

                <button className="flex items-center gap-2 bg-accent-brand text-white px-4 py-2 rounded-enterprise font-medium hover:bg-blue-600 transition-colors shadow-sm">
                    <Download size={18} />
                    <span>Export</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
