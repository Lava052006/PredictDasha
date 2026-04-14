import traceback
import sys

with open("debug_out.txt", "w", encoding="utf-8") as f:
    try:
        f.write("Importing api.endpoints...\n")
        import api.endpoints
        f.write("Success!\n")
    except Exception as e:
        f.write("Error occurred:\n")
        traceback.print_exc(file=f)
