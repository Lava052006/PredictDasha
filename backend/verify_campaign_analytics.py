import requests
import json

BASE_URL = "http://127.0.0.1:8000/api"

def test_endpoint(endpoint, params=None):
    url = f"{BASE_URL}{endpoint}"
    print(f"Testing {url} with params {params}...")
    try:
        response = requests.get(url, params=params)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"Count: {len(data)}")
                if len(data) > 0:
                    print(f"First item: {json.dumps(data[0], indent=2)}")
            else:
                print(f"Response: {json.dumps(data, indent=2)[:500]}...")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Connection failed: {e}")
    print("-" * 30)

if __name__ == "__main__":
    # Test new endpoints
    test_endpoint("/campaign-performance", {"days": 30})
    test_endpoint("/revenue-trend", {"days": 30, "campaign_type": "social_media"})
    test_endpoint("/ai-campaign-insights", {"days": 30, "channel": "facebook"})
    
    # Test Dashboard endpoints
    test_endpoint("/kpis", {"days": 30, "channel": "google ads"})
    test_endpoint("/charts/performance", {"days": 30, "region": "North"})
    test_endpoint("/ai/insights", {"days": 30})
