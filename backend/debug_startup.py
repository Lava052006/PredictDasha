import traceback
import sys

try:
    print("Attempting to import models.schemas...")
    import models.schemas
    print("models.schemas imported successfully.")
    
    print("Attempting to import services.data_service...")
    import services.data_service
    print("services.data_service imported successfully.")
    
    print("Attempting to import api.endpoints...")
    import api.endpoints
    print("api.endpoints imported successfully.")
    
    print("Attempting to import main...")
    import main
    print("main imported successfully.")
    
except Exception:
    print("\n!!! IMPORT ERROR DETECTED !!!\n")
    traceback.print_exc()
    sys.exit(1)
