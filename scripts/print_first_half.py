import json

with open("scripts/non_gallery_summary.json", "r", encoding="utf-8") as f:
    items = json.load(f)

for idx, it in enumerate(items[:61], 1):
    comps = [c.split("/")[-1] for c in it["used_in"]]
    print(f"{idx:3d}. {it['url']} | Dims: {it['current_dims']} | Size: {it['size_kb']} | Files: {', '.join(comps[:3])}")
