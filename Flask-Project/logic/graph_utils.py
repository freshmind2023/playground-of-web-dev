"""
Filename: graph_utils.py
Author: Shujuan Ji
Date: Jan. 5, 2025
"""
import numpy as np
import matplotlib.pyplot as plt
import scipy.stats as sp
import os
import uuid

LOCAL_IMAGE_PATH = './static/uploads'
def generate_image(mu, sigma):
    x = np.linspace(mu - 3*sigma, mu + 3*sigma, 1000)
    y = sp.norm.pdf(x, mu, sigma)
    plt.plot(x, y, 'b--')
    plt.xlabel('x-axis')
    plt.ylabel('y-axis')
    plt.title(f"Normal Ditribution with mu = {mu} and sigma = {sigma}")

    # Create a unique ID for the image and save it
    image_id = str(uuid.uuid4())
    image_name = f"{image_id}.png"
    image_path = os.path.join(LOCAL_IMAGE_PATH, image_name)

    os.makedirs(LOCAL_IMAGE_PATH, exist_ok=True)

    # Save the image
    plt.savefig(image_path)
    plt.close()
    
    return image_name


