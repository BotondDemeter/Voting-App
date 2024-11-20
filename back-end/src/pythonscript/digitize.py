import os
import json
import re
import sys
import pytesseract
import cv2
import numpy as np

pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'

# Get image path from command-line argument
if len(sys.argv) < 2:
    print("Error: No input image provided.")
    sys.exit(1)

input_image_path = sys.argv[1]
output_json_path = os.path.splitext(input_image_path)[0] + '_output.json'

if not os.path.exists(input_image_path):
    print(f"Error: The file {input_image_path} does not exist.")
    sys.exit(1)

img = cv2.imread(input_image_path)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = cv2.convertScaleAbs(gray, alpha=1, beta=30)
blurred = cv2.GaussianBlur(gray, (3, 3), 0)
_, binary_img = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

kernel = np.ones((2, 2), np.uint8)
processed_img = cv2.morphologyEx(binary_img, cv2.MORPH_CLOSE, kernel, iterations=2)

text = pytesseract.image_to_string(processed_img, lang='hun+ron')

patterns = {
    "cnp": r'(\d{13})\s*Nume',
    "id_number": r'\b([A-Z]{1,2})\s*(\d{6})\b',
    "last_name": r'(\w+)\s*Prenume',
    "first_name": r'First name\s*([\w-]+)',
    "nationality": r'([A-Za-z\s]+)\s*Loc',
    "sex": r'Sex Sexe:\s*([MF])',
}

extracted_data = {}

for key, pattern in patterns.items():
    match = re.search(pattern, text)
    if match:
        if key == "id_number":
            extracted_data[key] = ''.join(match.groups()).strip()
        else:
            cleaned_value = re.sub(r'[^A-Za-zÀ-ÿ\s-]', '', match.group(1)).strip()
            extracted_data[key] = cleaned_value

        if key == "cnp":
            extracted_data[key] = match.group(1).strip()

validity_match = re.search(r'(\d{2}\.\d{2}\.\d{2})\s*-\s*(\d{2}\.\d{2}\.\d{4})\s*\n*\s*IDROU', text)
if validity_match:
    extracted_data["issue_date"] = validity_match.group(1).strip()
    extracted_data["expiration_date"] = validity_match.group(2).strip()

with open(output_json_path, 'w', encoding='utf-8') as json_file:
    json.dump(extracted_data, json_file, ensure_ascii=False, indent=4)

print(json.dumps(extracted_data, ensure_ascii=False, indent=4))