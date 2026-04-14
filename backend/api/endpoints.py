from fastapi import APIRouter, Query
from typing import Optional, List
from models.schemas import (
    KPIResponse, PerformanceChartResponse, CampaignResponse, 
    AIInsightResponse, AnomalyResponse,
    CampaignTrendResponse, AICampaignInsightsResponse,
    CampaignRevenuePoint, SegmentContributionPoint, CampaignROIPoint,
    RevenueForecastResponse, ForecastComponentsResponse, AIForecastInsightsResponse
)
from services import data_service

router = APIRouter()

@router.get("/kpis", response_model=KPIResponse)
def get_kpis(
    days: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_kpis(days, campaign_type, region, channel, segment)

@router.get("/charts/performance", response_model=PerformanceChartResponse)
def get_performance_chart(
    days: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_performance_data(days, campaign_type, region, channel, segment)

@router.get("/campaign-performance", response_model=List[CampaignResponse])
def get_campaign_performance(
    days: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_campaign_performance(days, campaign_type, region, channel, segment)

@router.get("/campaign-revenue", response_model=List[CampaignRevenuePoint])
def get_campaign_revenue(
    days: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_campaign_revenue(days, campaign_type, region, channel, segment)

@router.get("/channel-contribution", response_model=List[dict])
def get_channel_contribution(
    days: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_channel_contribution(days, campaign_type, region, channel, segment)

@router.get("/segment-contribution", response_model=List[SegmentContributionPoint])
def get_segment_contribution(
    days: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_segment_contribution(days, campaign_type, region, channel, segment)

@router.get("/campaign-roi", response_model=List[CampaignROIPoint])
def get_campaign_roi(
    days: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_campaign_roi(days, campaign_type, region, channel, segment)

@router.get("/revenue-trend", response_model=CampaignTrendResponse)
def get_revenue_trend(
    days: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_revenue_trend(days, campaign_type, region, channel, segment)

@router.get("/ai-campaign-insights", response_model=AICampaignInsightsResponse)
def get_ai_campaign_insights(
    days: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_ai_campaign_insights(days, campaign_type, region, channel, segment)

@router.get("/ai/insights", response_model=AIInsightResponse)
def get_ai_insights(
    days: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_ai_insights(days, campaign_type, region, channel, segment)

@router.get("/revenue-forecast", response_model=RevenueForecastResponse)
def get_revenue_forecast(
    horizon: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_revenue_forecast(horizon, campaign_type, region, channel, segment)

@router.get("/forecast-components", response_model=ForecastComponentsResponse)
def get_forecast_components(
    horizon: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_forecast_components(horizon, campaign_type, region, channel, segment)

@router.get("/ai-forecast-insights", response_model=AIForecastInsightsResponse)
def get_ai_forecast_insights(
    horizon: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_ai_forecast_insights(horizon, campaign_type, region, channel, segment)

@router.get("/anomalies", response_model=List[AnomalyResponse])
def get_anomalies(
    days: int = Query(30),
    campaign_type: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    channel: Optional[str] = Query(None),
    segment: Optional[str] = Query(None)
):
    return data_service.generate_anomalies(days, campaign_type, region, channel, segment)
