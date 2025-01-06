"""
Filename: config.py
Author: Shujuan Ji
Date: Jan. 5, 2025
"""
import os
class Config:
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://postgres:0000@localhost/mytest"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False