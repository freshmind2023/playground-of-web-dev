"""
Filename: app6.py
Author: Shujuan Ji
Date: Jan. 5, 2025
"""

from flask import Flask, jsonify, render_template, request
from flask_sqlalchemy import SQLAlchemy
from config import Config
from models import db, MyUser

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
    return render_template('test6.html')

@app.route('/user', methods=['POST'])

def save_user():
    data = request.get_json()
    name= data['name']
    print(name)
    new_user = MyUser(name=name)
    db.session.add(new_user)
    db.session.commit()
    response = {"message": f"Saved {data['name']}!"}
    return jsonify(response)


@app.route('/users', methods=['GET'])
def get_users():
    users = MyUser.query.all()
    return jsonify([{"id": user.id, "name": user.name} for user in users])


if __name__ == '__main__':
    app.run(debug=True)

