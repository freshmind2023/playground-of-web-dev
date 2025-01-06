"""
Filename: app1.py
Author: Shujuan Ji
Date: Jan. 5, 2025
"""

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Route for rendering the HTML page
@app.route('/')
def home():
    return render_template('test1.html')

# API route for handling requests
@app.route('/name', methods=['POST'])
def api_data():
    data = request.get_json()
    response = {"message": f"Received {data['name']}!"}
    return jsonify(response)

@app.route('/survey', methods=['POST'])
def submit_survey():
    data = request.get_json()  # Parse JSON data sent from the client
    language = data.get('language')
    return jsonify({"message": f"Thank you! Your favorite language is {language}."})

if __name__ == '__main__':
    app.run(debug=True)