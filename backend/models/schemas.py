from pydantic import BaseModel
from typing import List, Optional

class KPIItem(BaseModel):
    value: str
    change: float
    isPositive: bool

class KPIResponse(BaseModel):
    revenue: KPIItem
    spend: KPIItem
    cac: KPIItem
    roas: KPIItem
    top_performer: str

class ChartDataPoint(BaseModel):
    date: str
    revenue: float
    spend: float

class PerformanceChartResponse(BaseModel):
    data: List[ChartDataPoint]

class CampaignResponse(BaseModel):
    id: str
    name: str # maps to campaign_type
    channel: str # maps to channel_used
    segment: str # maps to customer_segment
    revenue: float
    spend: float
    conversions: int
    roas: float
    cac: float

class CampaignRevenuePoint(BaseModel):
    campaign: str
    revenue: float

class ChannelContributionPoint(BaseModel):
    campaign: str
    # Note: Using extra fields for dynamic channels is tricky in Pydantic, 
    # but for visualization we often return a dict or a list. 
    # For now, we'll use a dynamic dict approach or a flexible schema.
    # Actually, let's keep it simple for the bar chart.
    data: dict 

class SegmentContributionPoint(BaseModel):
    segment: str
    revenue: float

class CampaignROIPoint(BaseModel):
    campaign: str
    roas: float

class CampaignTrendPoint(BaseModel):
    date: str
    campaign: str
    revenue: float

class CampaignTrendResponse(BaseModel):
    data: List[CampaignTrendPoint]
    campaigns: List[str]

class AICampaignInsight(BaseModel):
    type: str # 'success', 'warning', 'info', 'danger'
    title: str
    description: str
    icon: str # lucide icon name

class AICampaignInsightsResponse(BaseModel):
    insights: List[AICampaignInsight]

class AIInsightResponse(BaseModel):
    healthScore: int
    kpiInsights: List[str]
    forecastSummary: str
    anomalyInsights: str

class ForecastPoint(BaseModel):
    date: str
    actual: Optional[float] = None
    forecast: Optional[float] = None
    lower: Optional[float] = None
    upper: Optional[float] = None

class ForecastKPIs(BaseModel):
    totalPredictedRevenue: str
    expectedGrowth: float
    avgDailyForecast: str
    peakDay: str
    troughDay: str
    trendStatus: str # 'growth', 'decline', 'stable'

class ForecastComponentPoint(BaseModel):
    name: str # e.g., 'Monday', 'Jan 1'
    value: float

class ForecastComponents(BaseModel):
    trend: List[ForecastPoint]
    weekly: List[ForecastComponentPoint]
    yearly: Optional[List[ForecastComponentPoint]] = None

class AIForecastInsight(BaseModel):
    title: str
    description: str
    type: str # 'info', 'success', 'warning'

class RevenueForecastResponse(BaseModel):
    kpis: ForecastKPIs
    data: List[ForecastPoint]

class ForecastComponentsResponse(BaseModel):
    components: ForecastComponents

class AIForecastInsightsResponse(BaseModel):
    insights: List[AIForecastInsight]

class AnomalyResponse(BaseModel):
    date: str
    metric: str
    value: float
    expectedValue: float
    explanation: str
