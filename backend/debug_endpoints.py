import traceback
import sys

try:
    print("Importing api.endpoints...")
    import api.endpoints
    print("Success!")
except Exception:
    traceback.print_exc()
    sys.exit(1)
