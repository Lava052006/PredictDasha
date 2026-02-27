import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import CampaignAnalytics from './pages/CampaignAnalytics';
import RevenueForecasting from './pages/RevenueForecasting';
import Anomalies from './pages/Anomalies';

// Campaigns component replaced by CampaignAnalytics page

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState({
    days: 30,
    campaign: 'All',
    segment: 'All',
    region: 'Global',
    channel: 'All'
  });

  return (
    <Router>
      <div className="flex h-screen bg-enterprise-50 font-sans text-enterprise-900 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0">
          <Header filters={filters} setFilters={setFilters} />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-enterprise-50">
            <div className="animate-in fade-in duration-500">
              <Routes>
                <Route path="/" element={<Dashboard filters={filters} />} />
                <Route path="/campaigns" element={<CampaignAnalytics filters={filters} />} />
                <Route path="/forecasting" element={<RevenueForecasting filters={filters} />} />
                <Route path="/anomalies" element={<Anomalies />} />
                <Route path="*" element={<Dashboard filters={filters} />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
