import json
from pathlib import Path

root = Path(r"c:\Users\USER\Downloads\zip-repl\zip-repl")
with open(root / "scripts" / "non_gallery_summary.json", "r", encoding="utf-8") as f:
    items = json.load(f)

print(f"Total non-gallery items: {len(items)}\n")
for idx, it in enumerate(items, 1):
    comps = [c.split("/")[-1] for c in it["used_in"]]
    print(f"{idx:3d}. {it['url']} | Dims: {it['current_dims']} | Size: {it['size_kb']} | Files: {', '.join(comps[:3])}")
