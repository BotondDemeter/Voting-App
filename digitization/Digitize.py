import os
import json
import re
import pytesseract
import cv2
import numpy as np

script_dir = os.path.dirname(os.path.abspath(__file__))
input_image_path = os.path.join(script_dir, 'test2.png')
output_json_path = os.path.join(script_dir, 'output.json')
output_text_path = os.path.join(script_dir, 'output.txt')


if not os.path.exists(input_image_path):
    print(f"Error: The file {input_image_path} does not exist.")
else:
    patterns = {
        "cnp": r'(\d{13})\s*Nume',
        "id_number": r'\b([A-Z]{2})\s*(?:[a-z]+\s+)?([\d]{6})\b',
        "last_name": r'(\w+)\s*Prenume',
        "first_name": r'First name\s*([\w-]+)',
        "nationality": r'([A-Za-z\s]+)\s*Loc',
        "birth_county": r'Jud\.([A-Z]{2})\s*Mun\.',
        "birth_city": r'(?:Mun|Ors|Orș)\.([^\n]+)',
        "county": r'Address\s*(?:\n\s*)*Jud\.([A-Z]{2})',
        "city": r'Address(?:[\s\S]*?)(?:Jud\.[A-Za-z]+.*?)(?:Mun|Ors|Orș)\.([^\n]+)',
        "issue_date": r'(\d{2}\.\d{2}\.\d{2})',
        "expiration_date": r'(\d{2}\.\d{2}\.\d{4})'
    }

    def preprocess_image(img, config):
        resized_img = cv2.resize(img, (1600, 1050))
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray = cv2.convertScaleAbs(gray, alpha=config['alpha'], beta=config['beta'])
        blurred = cv2.GaussianBlur(gray, (config['blur_kernel'], config['blur_kernel']), 0)
        _, binary_img = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        kernel = np.ones((config['kernel_size'], config['kernel_size']), np.uint8)
        processed_img = cv2.morphologyEx(binary_img, cv2.MORPH_CLOSE, kernel, iterations=config['iterations'])
        return processed_img

    def is_data_complete(extracted_data):
        required_keys = patterns.keys()
        return all(key in extracted_data and extracted_data[key] for key in required_keys)

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

    img = cv2.imread(input_image_path)
    extracted_data = {}

    for config in configurations:
        processed_img = preprocess_image(img, config)
        text = pytesseract.image_to_string(processed_img, lang='hun+ron')

        with open(output_text_path, 'w', encoding='utf-8') as text_file:
            text_file.write(text)

        extracted_data = {}
        for key, pattern in patterns.items():
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                if key == "id_number":
                    extracted_data[key] = ''.join(match.groups()).strip()
                else:
                    extracted_data[key] = match.group(1).strip()

        validity_match = re.search(r'(\d{2}\.\d{2}\.\d{2})\s*-\s*(\d{2}\.\d{2}\.\d{4})\s*\n*\s*IDROU', text)
        if validity_match:
            extracted_data["issue_date"] = validity_match.group(1).strip()
            extracted_data["expiration_date"] = validity_match.group(2).strip()

        if is_data_complete(extracted_data):
            break

    if not is_data_complete(extracted_data):
        raise ValueError("Incomplete data extracted. Please retake the picture.")
    else:
        with open(output_json_path, 'w', encoding='utf-8') as json_file:
            json.dump(extracted_data, json_file, ensure_ascii=False, indent=4)
        print("Data successfully extracted and saved to output.json and output.txt")
