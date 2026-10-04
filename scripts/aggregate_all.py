import os
import re
import json
from pathlib import Path
from collections import defaultdict

root = Path(r"c:\Users\USER\Downloads\zip-repl\zip-repl")

# Load categorized data and non-gallery summary
with open(root / "scripts" / "non_gallery_summary.json", "r", encoding="utf-8") as f:
    non_gallery = json.load(f)

with open(root / "scripts" / "check_gallery.py", "r", encoding="utf-8") as f:
    pass

# Read gallery.ts items
gal_txt = (root / "src/data/gallery.ts").read_text(encoding="utf-8", errors="ignore")
gal_matches = re.findall(r'id:\s*["\']([^"\']+)["\'].*?imageUrl:\s*["\']([^"\']+)["\'].*?category:\s*["\']([^"\']+)["\']', gal_txt, re.DOTALL)
print(f"Total parsed gallery items: {len(gal_matches)}")

# Print unique non-gallery items
print(f"Total non-gallery items: {len(non_gallery)}")
