import json
import re
import sys
import pytesseract
import cv2
import numpy as np
from io import BytesIO

# Set the Tesseract command
pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'

# Check if data is being passed through stdin
if sys.stdin.isatty():
    print("Error: No image data provided.", file=sys.stderr)
    sys.exit(1)

try:
    # Read binary image data from stdin
    image_data = sys.stdin.buffer.read()

    # Decode the binary data to an OpenCV image
    image_array = np.frombuffer(image_data, dtype=np.uint8)
    img = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if img is None:
        print("Error: Could not decode the image.", file=sys.stderr)
        sys.exit(1)

    # Preprocess the image
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.convertScaleAbs(gray, alpha=1, beta=30)
    blurred = cv2.GaussianBlur(gray, (3, 3), 0)
    _, binary_img = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    kernel = np.ones((2, 2), np.uint8)
    processed_img = cv2.morphologyEx(binary_img, cv2.MORPH_CLOSE, kernel, iterations=2)

    # Perform OCR
    text = pytesseract.image_to_string(processed_img, lang='hun+ron')

    # Define patterns to extract data
    patterns = {
        "cnp": r'(\d{13})\s*Nume',
        "id_number": r'\b([A-Z]{1,2})\s*(\d{6})\b',
        "last_name": r'(\w+)\s*Prenume',
        "first_name": r'First name\s*([\w-]+)',
        "nationality": r'([A-Za-z\s]+)\s*Loc',
        "sex": r'Sex Sexe:\s*([MF])',
    }

    extracted_data = {}

    # Extract data using patterns
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

    # Extract validity dates
    validity_match = re.search(r'(\d{2}\.\d{2}\.\d{2})\s*-\s*(\d{2}\.\d{2}\.\d{4})\s*\n*\s*IDROU', text)
    if validity_match:
        extracted_data["issue_date"] = validity_match.group(1).strip()
        extracted_data["expiration_date"] = validity_match.group(2).strip()

    # Output the extracted data as JSON
    print(json.dumps(extracted_data, ensure_ascii=False, indent=4))

except Exception as e:
    print(f"Error processing the image: {e}", file=sys.stderr)
    sys.exit(1)