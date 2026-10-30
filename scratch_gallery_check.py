import os
from PIL import Image

# Let's inspect images in chinmaya/academics
files = sorted(os.listdir('public/images/chinmaya/academics'))
print(f"Files in chinmaya/academics: {len(files)}")
for f in files[:30]:
    if f.endswith('.jpg'):
        p = os.path.join('public/images/chinmaya/academics', f)
        with Image.open(p) as img:
            print(f"{f}: size={img.size}")
