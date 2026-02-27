import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

const buildParams = (filters) => {
    const params = {};
    if (filters) {
        if (filters.days) params.days = filters.days;
        if (filters.campaign && filters.campaign !== 'All') params.campaign_type = filters.campaign;
        if (filters.region && filters.region !== 'Global') params.region = filters.region;
        if (filters.channel && filters.channel !== 'All') params.channel = filters.channel;
        if (filters.segment && filters.segment !== 'All') params.segment = filters.segment;
    }
    return params;
};

export const getKPIs = (filters) => api.get('/kpis', { params: buildParams(filters) });
export const getCampaigns = (filters) => api.get('/campaign-performance', { params: buildParams(filters) }); // Dashboard uses this for its table
export const getPerformanceChart = (filters) => api.get('/charts/performance', { params: buildParams(filters) });
export const getCampaignPerformance = (filters) => api.get('/campaign-performance', { params: buildParams(filters) });
export const getCampaignRevenue = (filters) => api.get('/campaign-revenue', { params: buildParams(filters) });
export const getChannelContribution = (filters) => api.get('/channel-contribution', { params: buildParams(filters) });
export const getSegmentContribution = (filters) => api.get('/segment-contribution', { params: buildParams(filters) });
export const getCampaignROI = (filters) => api.get('/campaign-roi', { params: buildParams(filters) });
export const getRevenueTrend = (filters) => api.get('/revenue-trend', { params: buildParams(filters) });
export const getAICampaignInsights = (filters) => api.get('/ai-campaign-insights', { params: buildParams(filters) });
export const getAIInsights = (filters) => api.get('/ai/insights', { params: buildParams(filters) });
export const getAnomalies = (filters) => api.get('/anomalies', { params: buildParams(filters) });

// New Forecasting Endpoints
export const getRevenueForecast = (filters, horizon = 30) => api.get('/revenue-forecast', { params: { ...buildParams(filters), horizon } });
export const getForecastComponents = (filters, horizon = 30) => api.get('/forecast-components', { params: { ...buildParams(filters), horizon } });
export const getAIForecastInsights = (filters, horizon = 30) => api.get('/ai-forecast-insights', { params: { ...buildParams(filters), horizon } });

export default api;
