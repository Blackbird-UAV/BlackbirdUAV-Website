from PIL import Image
import os

# Set the folder where your images are stored
folder_path = "path/to/your/image/folder"

# Define the new size
new_size = (n, m)

# Iterate over all files in the folder
for filename in os.listdir(folder_path):
    if filename.endswith((".png", ".jpg", ".jpeg")): 
        # Open an image file
        img_path = os.path.join(folder_path, filename)
        with Image.open(img_path) as img:
            # Resize image
            img_resized = img.resize(new_size)
            new_file_path = os.path.join(folder_path, f"resized_{filename}")
            img_resized.save(new_file_path, quality=85, optimize=True)

            print(f"Resized and saved: {new_file_path}")
