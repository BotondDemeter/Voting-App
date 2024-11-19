import os
from PIL import Image
import pytesseract
import cv2
import numpy as np

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

script_dir = os.path.dirname(os.path.abspath(__file__))

input_image_path = os.path.join(script_dir, 'test.png')
output_text_path = os.path.join(script_dir, 'output.txt')

if not os.path.exists(input_image_path):
    print(f"Error: The file {input_image_path} does not exist.")
else:
    img = cv2.imread(input_image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.convertScaleAbs(gray, alpha=1, beta=30)
    cv2.imshow("Grayed Image", gray)

    blurred = cv2.GaussianBlur(gray, (3, 3), 0)
    
    _, binary_img = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    kernel = np.ones((2, 2), np.uint8)
    processed_img = cv2.morphologyEx(binary_img, cv2.MORPH_CLOSE, kernel, iterations=2)
    cv2.imshow("Processed Image", processed_img)

    scale_factor = 1
    resized_img = cv2.resize(processed_img, None, fx=scale_factor, fy=scale_factor, interpolation=cv2.INTER_CUBIC)
    cv2.imshow("Resized Image", resized_img)

    cv2.waitKey(0)
    cv2.destroyAllWindows()

    text = pytesseract.image_to_string(processed_img, lang='hun+ron')
    with open(output_text_path, 'w', encoding='utf-8') as file:
        file.write(text)

    if text.strip():
        print("Text successfully extracted and saved to output.txt")
    else:
        print("No text extracted. Verify OCR settings or preprocessing steps.")
