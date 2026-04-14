import requests
import json

BASE_URL = "http://localhost:8000/api"

endpoints = [
    "/kpis",
    "/charts/performance",
    "/campaign-performance",
    "/ai-campaign-insights",
    "/ai/insights"
]

for ep in endpoints:
    print(f"Testing {ep}...")
    try:
        r = requests.get(f"{BASE_URL}{ep}", params={"days": 30})
        print(f"Status: {r.status_code}")
        if r.status_code != 200:
            print(f"Error: {r.text}")
        else:
            print(f"Success: {json.dumps(r.json(), indent=2)[:200]}...")
    except Exception as e:
        print(f"FAILED: {e}")

# Test forecasting too
print("Testing /revenue-forecast...")
try:
    r = requests.get(f"{BASE_URL}/revenue-forecast", params={"horizon": 7})
    print(f"Status: {r.status_code}")
    if r.status_code != 200:
        print(f"Error: {r.text}")
    else:
        print(f"Success: {json.dumps(r.json(), indent=2)[:200]}...")
except Exception as e:
    print(f"FAILED: {e}")
