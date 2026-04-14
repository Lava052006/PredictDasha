import random
from datetime import datetime, timedelta

def generate_kpis():
    return {
        "revenue": {"value": "$124,500", "change": 12.5, "isPositive": True},
        "spend": {"value": "$42,000", "change": -5.2, "isPositive": True},
        "cac": {"value": "$12.40", "change": 2.1, "isPositive": False},
        "roas": {"value": "2.96x", "change": 8.4, "isPositive": True}
    }

def generate_performance_data():
    data = []
    base_date = datetime.now() - timedelta(days=30)
    for i in range(30):
        current_date = base_date + timedelta(days=i)
        spend = random.uniform(1000, 2000)
        revenue = spend * random.uniform(2.0, 4.0)
        data.append({
            "date": current_date.strftime("%Y-%m-%d"),
            "revenue": round(revenue, 2),
            "spend": round(spend, 2)
        })
    return {"data": data}

def generate_campaigns():
    names = ["Q3 Summer Promo", "Retargeting AdRoll", "Google Search Branded", "FB Lookalike", "Email Newsletter Seq", "LinkedIn B2B LeadGen"]
    campaigns = []
    for i, name in enumerate(names):
        spend = random.uniform(5000, 15000)
        roas = random.uniform(1.5, 4.5)
        revenue = spend * roas
        cac = random.uniform(8.0, 25.0)
        campaigns.append({
            "id": f"CAMP-{i+1}",
            "name": name,
            "revenue": round(revenue, 2),
            "spend": round(spend, 2),
            "roas": round(roas, 2),
            "cac": round(cac, 2)
        })
    return campaigns

def generate_ai_insights():
    return {
        "healthScore": 86,
        "kpiInsights": [
            "Revenue is up 12.5% compared to the previous period.",
            "CAC has slightly increased but remains within acceptable bounds.",
            "ROAS shows strong performance in Google Search channels."
        ],
        "forecastSummary": "Expected 15% growth in the next 30 days based on current momentum.",
        "anomalyInsights": "Detected a drop in Facebook Lookalike conversions on recent days."
    }

def generate_forecast():
    data = []
    base_date = datetime.now() - timedelta(days=15)
    
    # Historical
    for i in range(15):
        current_date = base_date + timedelta(days=i)
        rev = random.uniform(3000, 5000)
        data.append({
            "date": current_date.strftime("%Y-%m-%d"),
            "actualRevenue": round(rev, 2),
            "predictedRevenue": None,
            "lowerBound": None,
            "upperBound": None
        })
        
    last_actual = data[-1]["actualRevenue"]
    
    # Forecast
    base_forecast_date = datetime.now()
    for i in range(30):
        current_date = base_forecast_date + timedelta(days=i)
        trend = last_actual + (i * 50)
        pred = trend + random.uniform(-200, 200)
        data.append({
            "date": current_date.strftime("%Y-%m-%d"),
            "actualRevenue": None,
            "predictedRevenue": round(pred, 2),
            "lowerBound": round(pred * 0.9, 2),
            "upperBound": round(pred * 1.1, 2)
        })
        
    return {
        "projectedGrowth": 15.2,
        "next30DaysRevenue": 145000.0,
        "data": data
    }

def generate_anomalies():
    return [
        {
            "date": (datetime.now() - timedelta(days=5)).strftime("%Y-%m-%d"),
            "metric": "CAC",
            "value": 35.50,
            "expectedValue": 15.00,
            "explanation": "Spike in CAC for FB Lookalike campaign due to algorithmic bidding changes."
        },
        {
            "date": (datetime.now() - timedelta(days=12)).strftime("%Y-%m-%d"),
            "metric": "Revenue",
            "value": 1200.00,
            "expectedValue": 4500.00,
            "explanation": "Significant drop in revenue due to tracking pixel outage."
        }
    ]
