"""
Filename: app5.py
Author: Shujuan Ji
Date: Jan. 5, 2025
"""
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Route for rendering the HTML page
@app.route('/')
def home():
    return render_template('test5.html')

if __name__ == '__main__':
    app.run(debug=True)