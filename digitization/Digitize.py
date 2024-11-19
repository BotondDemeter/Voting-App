import os
from PIL import Image
import pytesseract
import cv2
import numpy as np

# Print OpenCV version
print(cv2.__version__)

# Path to Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Get the directory of the current script (which is now in the digitization folder)
script_dir = os.path.dirname(os.path.abspath(__file__))

# Define paths for input image and output text file
input_image_path = os.path.join(script_dir, 'test.png')  # Path to test.png in the same directory
output_text_path = os.path.join(script_dir, 'output.txt')  # Path for output.txt in the same directory

# Debugging: Print constructed paths
print("Input Image Path:", input_image_path)
print("Output Text Path:", output_text_path)

# Check if the input image exists before trying to open it
if not os.path.exists(input_image_path):
    print(f"Error: The file {input_image_path} does not exist.")
else:
    # Load the image using PIL
    im = Image.open(input_image_path)

    # Convert the image to a NumPy array (required for OpenCV)
    img = np.array(im)

    # Check the number of channels in the image
    if len(img.shape) == 2:  # Grayscale image (already 1 channel)
        gray = img
    elif len(img.shape) == 3 and img.shape[2] == 4:  # RGBA image (4 channels)
        img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    else:  # Assume BGR image (3 channels)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Apply thresholding to convert the grayscale image to a binary image
    _, binary_img = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)

    # Display the binary image to see if text is isolated properly
    cv2.imshow('Binary Image', binary_img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # Perform OCR on the preprocessed image in Romanian
    text = pytesseract.image_to_string(binary_img, lang='ron')

    # Output the extracted text to a text file
    with open(output_text_path, 'w', encoding='utf-8') as file:
        file.write(text)

    # Optional: Also print the text to console
    print("Text successfully extracted and saved to output.txt")