import os
from PIL import Image

folder = 'public/images/chinmaya/academics'
files = sorted([f for f in os.listdir(folder) if f.startswith('classroom_learning_') and f.endswith('.jpg')])

for f in files[:15]:
    path = os.path.join(folder, f)
    with Image.open(path) as img:
        print(f"{f}: size={img.size}, mode={img.mode}, exif={img.getexif().get(0x0112)}")
