"""
Filename: models.py
Author: Shujuan Ji
Date: Jan. 5, 2025
"""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class MyUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class ImageData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mu = db.Column(db.Float, nullable=False)
    sigma = db.Column(db.Float, nullable=False)
    image_name = db.Column(db.String(200), nullable=False, unique=True)
    

