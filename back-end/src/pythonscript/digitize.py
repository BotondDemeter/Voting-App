import sys
import os
import json
import re
import pytesseract
import cv2
import numpy as np

# Define patterns to extract fields
patterns = {
    "cnp": r'(\d{13})\s*Nume',
    "id_number": r'\b([A-Z]{2})\s*(?:[a-z]+\s+)?([\d]{6})\b',
    # "nationality": r'([A-Za-z]{3,})\s*(?:\W*\s*)*Loc',
    "county": r'(?:\b([A-Z]{2})\b)\s*(?=Mun|Ors|Orș|Sat)',
    "city": r'Address(?:[\s\S]*?)(?:Jud\.[A-Za-z]+.*?)(?:Mun|Ors|Orș|Sat)\.([^\n]+)',
    "issue_date": r'(\d{2}\.\d{2}\.\d{2})',
    "expiration_date": r'(\d{2}\.\d{2}\.\d{4})'
}

# Image preprocessing function
def preprocess_image(img, config):
    """Preprocess the image using the given configuration."""
    resized_img = cv2.resize(img, (1600, 1050))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.convertScaleAbs(gray, alpha=config['alpha'], beta=config['beta'])
    blurred = cv2.GaussianBlur(gray, (config['blur_kernel'], config['blur_kernel']), 0)
    _, binary_img = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    kernel = np.ones((config['kernel_size'], config['kernel_size']), np.uint8)
    processed_img = cv2.morphologyEx(binary_img, cv2.MORPH_CLOSE, kernel, iterations=config['iterations'])
    return processed_img

# Functions to extract names
def extract_first_name(text):
    """Extract the first name from text based on the label row."""
    lines = text.splitlines()
    for i, line in enumerate(lines):
        if re.search(r'(Prenume|Prenom|First\s*name)(?:/[Pp]renume|/[Pp]renom|/[Ff]irst\s*[Nn]ame)?', line, re.IGNORECASE):
            for subsequent_line in lines[i + 1:]:
                if subsequent_line.strip():
                    first_name_match = re.match(r'([\w-]+)', subsequent_line.strip())
                    if first_name_match:
                        return first_name_match.group(1).strip()
    return None

def extract_last_name(text):
    """Extract the last name from text based on the label row of 'First Name'."""
    lines = text.splitlines()
    for i, line in enumerate(lines):
        if re.search(r'(Prenume|Prenom|First\s*name)(?:/[Pp]renume|/[Pp]renom|/[Ff]irst\s*[Nn]ame)?', line, re.IGNORECASE):
            for preceding_line in reversed(lines[:i]):
                if preceding_line.strip():
                    last_name_match = re.match(r'([\w-]+)', preceding_line.strip())
                    if last_name_match:
                        return last_name_match.group(1).strip()
    return None

def extract_id_number(text):
    lines = text.splitlines('\n')
    for line in lines:
        cleaned_line = re.sub(r'[^A-Z0-9]', ' ', line.upper())
        match = re.match(r'([A-Z]{2})([0-9]{6})', cleaned_line)
        if match:
           return f"{match.group(1)}{match.group(2)}"
    return None
        
# Function to check completeness of extracted data
def is_data_complete(data):
    required_fields = ["cnp", "id_number", "last_name", "first_name", "nationality", "county", "city", "issue_date", "expiration_date"]
    return all(data.get(field) for field in required_fields)

# Configurations for image processing
configurations = [
    {"alpha": 1, "beta": 30, "blur_kernel": 3, "kernel_size": 2, "iterations": 2},
    {"alpha": 2, "beta": 50, "blur_kernel": 3, "kernel_size": 2, "iterations": 1},
    {"alpha": 1.5, "beta": 40, "blur_kernel": 5, "kernel_size": 3, "iterations": 2},
    {"alpha": 1.2, "beta": 30, "blur_kernel": 7, "kernel_size": 4, "iterations": 3},
    {"alpha": 2.5, "beta": 70, "blur_kernel": 5, "kernel_size": 2, "iterations": 2},
    {"alpha": 3, "beta": 100, "blur_kernel": 5, "kernel_size": 3, "iterations": 3},
    {"alpha": 0.8, "beta": 20, "blur_kernel": 3, "kernel_size": 2, "iterations": 1},
    {"alpha": 1, "beta": 10, "blur_kernel": 3, "kernel_size": 3, "iterations": 2},
    {"alpha": 1.8, "beta": 40, "blur_kernel": 3, "kernel_size": 1, "iterations": 4},
    {"alpha": 2, "beta": 60, "blur_kernel": 5, "kernel_size": 3, "iterations": 5},
    {"alpha": 1.5, "beta": 30, "blur_kernel": 7, "kernel_size": 5, "iterations": 1},
    {"alpha": 2.5, "beta": 50, "blur_kernel": 7, "kernel_size": 6, "iterations": 3}
]

try:
    # Read image data from stdin
    image_data = sys.stdin.buffer.read()
    nparr = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("Invalid image data received. Cannot decode.")

    partial_extracted_data = {}

    # Process image with multiple configurations
    for config in configurations:
        processed_img = preprocess_image(img, config)
        text = pytesseract.image_to_string(processed_img, lang='hun+ron')

        # Extract fields
        if "first_name" not in partial_extracted_data:
            partial_extracted_data["first_name"] = extract_first_name(text)

        if "last_name" not in partial_extracted_data:
            partial_extracted_data["last_name"] = extract_last_name(text)

        if "id_number" not in partial_extracted_data:
            partial_extracted_data["id_number"] = extract_id_number(text)

        for key, pattern in patterns.items():
            if key not in partial_extracted_data:
                match = re.search(pattern, text, re.IGNORECASE)
                if match:
                    partial_extracted_data[key] = match.group(1).strip()
                    
                    
        # Check for issue and expiration dates
        validity_match = re.search(r'(\d{2}\.\d{2}\.\d{2})\s*-\s*(\d{2}\.\d{2}\.\d{4})\s*\n*\s*IDROU', text)
        if validity_match:
            partial_extracted_data["issue_date"] = validity_match.group(1).strip()
            partial_extracted_data["expiration_date"] = validity_match.group(2).strip()

        # Break if all data is complete
        if is_data_complete(partial_extracted_data):
            break

    # Output the extracted data
    print(json.dumps(partial_extracted_data, ensure_ascii=False, indent=4))

except Exception as e:
    print(json.dumps({"error": str(e)}, ensure_ascii=False, indent=4))
