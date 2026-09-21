from PIL import Image, ImageFilter

def remove_black_bg(input_path, output_path, threshold=40):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Calculate perceived brightness or just use max RGB
        max_val = max(item[0], item[1], item[2])
        if max_val < threshold:
            # Smoothly transition alpha
            alpha = int((max_val / threshold) * 255)
            newData.append((item[0], item[1], item[2], alpha))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_black_bg("ramo.jpg", "ramo.png", threshold=50)
