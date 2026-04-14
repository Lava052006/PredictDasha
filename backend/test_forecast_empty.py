import sys
sys.path.append('.')
from services import data_service

print("Testing generate_revenue_forecast()...")
res = data_service.generate_revenue_forecast()
print(res)

print("Rows in DF:", len(data_service.df))
