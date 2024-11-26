import os
import json
import re
import pytesseract
import cv2
import numpy as np

# Paths setup
script_dir = os.path.dirname(os.path.abspath(__file__))
input_image_path = os.path.join(script_dir, 'test.png')
output_json_path = os.path.join(script_dir, 'output.json')
output_text_path = os.path.join(script_dir, 'output.txt')

# Check if input image exists
if not os.path.exists(input_image_path):
    print(f"Error: The file {input_image_path} does not exist.")
else:
    # Load and preprocess the image
    img = cv2.imread(input_image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.convertScaleAbs(gray, alpha=1, beta=30)
    blurred = cv2.GaussianBlur(gray, (3, 3), 0)
    _, binary_img = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    kernel = np.ones((2, 2), np.uint8)
    processed_img = cv2.morphologyEx(binary_img, cv2.MORPH_CLOSE, kernel, iterations=2)

    # Extract text using Tesseract
    text = pytesseract.image_to_string(processed_img, lang='hun+ron')

    # Save OCR text to a file
    with open(output_text_path, 'w', encoding='utf-8') as text_file:
        text_file.write(text)

    # Regex patterns for extraction
    patterns = {
        "cnp": r'(\d{13})\s*Nume',
        "id_number": r'\b([A-Z]{2})\s*(?:[a-z]+\s+)?([\d]{6})\b',
        "last_name": r'(\w+)\s*Prenume',
        "first_name": r'First name\s*([\w-]+)',
        "nationality": r'([A-Za-z\s]+)\s*Loc',
        "birth_county": r'Jud\.([A-Z]{2})\s*Mun\.',
        "birth_city": r'Mun\.([^\n]+)',
        "county": r'Address\s*(?:\n\s*)*Jud\.([A-Z]{2})',
        "city": r'Address(?:[\s\S]*?)Jud\.[A-Za-z]+.*?Mun\.([^\n]+)',
        "issue_date": r'(\d{2}\.\d{2}\.\d{2})',
        "expiration_date": r'(\d{2}\.\d{2}\.\d{4})'
}

    extracted_data = {}

    # Match patterns in text
    for key, pattern in patterns.items():
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            if key == "id_number":
                extracted_data[key] = ''.join(match.groups()).strip()
            else:
                extracted_data[key] = match.group(1).strip()

    # Extract validity dates
    validity_match = re.search(r'(\d{2}\.\d{2}\.\d{2})\s*-\s*(\d{2}\.\d{2}\.\d{4})\s*\n*\s*IDROU', text)
    if validity_match:
        extracted_data["issue_date"] = validity_match.group(1).strip()
        extracted_data["expiration_date"] = validity_match.group(2).strip()

    # Write extracted data to output.json
    with open(output_json_path, 'w', encoding='utf-8') as json_file:
        json.dump(extracted_data, json_file, ensure_ascii=False, indent=4)

    print("Data successfully extracted and saved to output.json and output.txt")
