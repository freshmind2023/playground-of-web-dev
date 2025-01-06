"""
Filename: app3.py
Author: Shujuan Ji
Date: Jan. 5, 2025
"""
from flask import Flask, render_template, send_from_directory, jsonify, url_for
import os

app = Flask(__name__)


# Local file storage setup (if using local storage for images)
LOCAL_IMAGE_PATH = './static/images'
EXTENTIONS = [".jpg", ".jpeg", ".png", ".gif", ".bmp"]

# Route to render the home page
@app.route('/')
def index():
    return render_template('test3.html')


## Retrieve all images from a local directory.

def get_images_from_directory(directory):
    """
    Retrieve all images from a local directory.
    """
    extensions = [ext.lower() for ext in EXTENTIONS]
    image_files = []
    for file in os.listdir(directory):
        if os.path.splitext(file)[1].lower() in EXTENTIONS:
            image_url = url_for('get_image', image_name=file, _external=True)
            image = {"name": file, "url": image_url}
            print(image)
            image_files.append(image)
    return image_files



@app.route('/image/<image_name>', methods=['GET'])
def get_image(image_name):
    # Sanitize or validate image_name to ensure it's safe to use
    try:
        return send_from_directory(LOCAL_IMAGE_PATH, image_name)
    except FileNotFoundError:
        abort(404, description="Image not found")


# Route to retrieve image metadata
@app.route('/image', methods=['GET'])
def get_images():
    # Retrieve all image metadata from MongoDB
    try:
        images = get_images_from_directory(LOCAL_IMAGE_PATH)
        return jsonify({"images": images})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


# Route to upload an image (for example)
@app.route('/upload_image', methods=['POST'])
def upload_image():
    # This is where you handle image upload and metadata insertion
    pass  # Implement image upload logic here (either to S3 or local)

if __name__ == '__main__':
    app.run(debug=True)
