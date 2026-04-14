import requests
import json

base_url = "http://localhost:8000/api"

endpoints = ["/kpis", "/charts/performance", "/campaigns", "/ai/insights", "/forecast", "/anomalies"]

for ep in endpoints:
    try:
        # Test with filters
        params = "?days=7&campaign_type=social_media&region=north"
        r = requests.get(base_url + ep + params)
        print(f"Endpoint: {ep}{params}")
        print(f"Status: {r.status_code}")
        if r.status_code == 200:
            print(f"Content: {json.dumps(r.json(), indent=2)[:200]}...")
        else:
            print(f"Error: {r.text}")
        print("-" * 20)
    except Exception as e:
        print(f"Failed to connect to {ep}: {e}")
