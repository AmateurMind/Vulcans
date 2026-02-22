from PIL import Image
import os
import shutil

input_folder = r"f:\Vulcans\public\frames"
output_folder = r"f:\Vulcans\public\frames_cropped"

os.makedirs(output_folder, exist_ok=True)

crop_left = 314
crop_right = 307

total = 0
for filename in os.listdir(input_folder):
    if filename.lower().endswith((".jpg", ".png", ".jpeg")):
        img_path = os.path.join(input_folder, filename)
        img = Image.open(img_path)

        width, height = img.size
        
        cropped = img.crop((crop_left, 0, width - crop_right, height))

        cropped.save(os.path.join(output_folder, filename))
        total += 1

print(f"All {total} images cropped to 3219 x 2160 successfully!")
