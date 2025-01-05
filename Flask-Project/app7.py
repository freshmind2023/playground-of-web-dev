from flask import Flask, jsonify, render_template, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from config import Config
from models import db, ImageData
from logic.graph_utils import generate_image, LOCAL_IMAGE_PATH

def create_app():
    print("here")
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    try:
        with app.app_context():
            db.create_all()
        print("db created")
    except Exception as e:
        print(f"Error creating tables: {e}")
    return app

app = create_app()

# Route for rendering the HTML page
@app.route('/')
def home():
    print("home")
    return render_template('test7.html')

@app.route('/get_image', methods=['GET'])
def get_image():
    # Get parameters from the request
    mu = float(request.args.get('mu'))
    sigma = float(request.args.get('sigma'))
    print("mu: ", mu)
    print("sigma: ", sigma)
    # Check if the image already exists in the database
    existing_image = ImageData.query.filter_by(mu=mu, sigma=sigma).first()
    
    if existing_image:
        # If the image exists, return it
        return send_from_directory(LOCAL_IMAGE_PATH, existing_image.image_name)
    else:
        # If the image does not exist, generate a new one
        image_name = generate_image(mu, sigma)
        
        # Save the new image data to the database
        image_data = ImageData(mu=mu, sigma=sigma, image_name=image_name)
        db.session.add(image_data)
        db.session.commit()
        
        # Return the newly generated image
        return send_from_directory(LOCAL_IMAGE_PATH, image_data.image_name)


if __name__ == '__main__':
    app.run(debug=True)
    