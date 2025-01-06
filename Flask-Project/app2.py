"""
Filename: app2.py
Author: Shujuan Ji
Date: Jan. 5, 2025
"""
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Route for rendering the HTML page
@app.route('/')
def home():
    return render_template('test2.html')

# API route for handling requests
@app.route('/process', methods=['POST'])
def process_values():
    data = request.get_json()
    value1 = float(data['value1'])
    value2 = int(data['value2'])
    # Backend logic: Example - Calculate sum and difference
    result_sum = value1 + value2
    result_diff = abs(value1 - value2)
    # Return the result as a response
    return jsonify(f"Sum: {result_sum}, Difference: {result_diff}")


if __name__ == '__main__':
    app.run(debug=True)