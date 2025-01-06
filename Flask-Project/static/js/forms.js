/**
 * Filename: forms.js
 * Author: Shujuan Ji
 * Date: Jan. 5, 2025
 */

// Handler for Form 1
async function handleName(event) {
    event.preventDefault();
    console.log(event.target.type)
    const name = event.target.parentElement.querySelector('input[type="text"]').value;
    console.log(name)
    const response = await fetch('/name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    const result = await response.json();
    document.getElementById('responseMessage1').textContent = result.message;
}

// Handler for Form 2
async function handleLanguage(event) {
    event.preventDefault();
    const selectedLanguage = event.target.querySelector('input[name="language"]:checked').value;
    console.log(selectedLanguage)
    const response = await fetch('/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: selectedLanguage }),
    });
    const result = await response.json();
    document.getElementById('responseMessage2').textContent = result.message;
}

// Update displayed value dynamically
function updateValue(spanId, value) {
    document.getElementById(spanId).textContent = value;
}
// Submit values to the backend
async function processValues() {
    const slider1Value = document.getElementById('slider1').value;
    const slider2Value = document.getElementById('slider2').value;
    const response = await fetch('/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value1: slider1Value, value2: slider2Value })
    });
    const result = await response.text();
    document.getElementById('response').textContent = `Result: ${result}`;
}

// Handler for Form 4
// Function to fetch and display an individual image
async function fetchImage(imageName) {
    const displayedImageDiv = document.getElementById('displayed-image');
    try {
        const response = await fetch(`/image/${imageName}`)
        if (!response.ok) {
                throw new Error('Image not found');
        }
        const blob = await response.blob(); // Get the image as a Blob
        
        // Create a URL for the Blob and display the image
        const imgUrl = URL.createObjectURL(blob);
        displayedImageDiv.innerHTML = ""; // Clear the previous image
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = imageName;
        img.style.width = "300px"; // Optional: Adjust the size
        displayedImageDiv.appendChild(img);
    } catch(err) {
        console.error('Error fetching the image:', err);
        displayedImageDiv.textContent = 'Failed to load the image.';
    }
}   

async function displayImage(event) {
    event.preventDefault();
    console.log(event.target.type)
    const imageName = event.target.parentElement.querySelector('input[type="text"]').value;
    console.log(imageName)
    fetchImage(imageName)
}

// Fetch image metadata from Flask backend
async function fetchImages() {
    try {
        const response = await fetch('/image');
        const data = await response.json();
        const gallery = document.getElementById('gallery');
        for (const image of data.images) {
            const link = document.createElement('a');
            link.href = "#"; // Prevent page navigation
            link.textContent = image.name;
            link.style.display = "block"; // Each link on a new line
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                fetchImage(image.name); // Fetch and display the image
            });
            gallery.appendChild(link);
        }
    } catch(err) {
        console.error('Error fetching images:', err)
    }
}

// Handler for Form 6
async function fetchData() {
    try {
        const response = await fetch('/users');
        const data = await response.json();
        const dataList = document.getElementById('data-list');
        dataList.innerHTML = '';
        for (const item of data) {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${item.id}, Name: ${item.name}`;
            dataList.appendChild(listItem);
        }
    } catch(err) {
        console.error('Error fetching data: ', err)
    }
}

async function saveName() {
    const name = document.getElementById('nameInput').value;
    const response = await fetch('/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    const result = await response.json();
    document.getElementById('responseMessage').textContent = result.message;
}

// Handler for Form 7
// Function to fetch and display an individual image
async function fetchImage2(mu, sigma) {
    const imgElement = document.getElementById("generated-image");
    console.log(mu);
    console.log(sigma);
    try {
        const url = `/get_image?mu=${mu}&sigma=${sigma}`;
        console.log(url);
        const response = await fetch(url);
        if (!response.ok) {
                throw new Error('Image not found');
        }
        const blob = await response.blob(); // Get the image as a Blob
        
        // Create a URL for the Blob and display the image
        const imgUrl = URL.createObjectURL(blob);
        
        // Display the image
        imgElement.src = imgUrl;
        imgElement.style.display = "block";
                    
    } catch(err) {
        console.error('Error fetching the image:', err);
    }
}   

async function displayImage2(event) {
    event.preventDefault();
    console.log(event.target.type)
    const mu = document.getElementById("mu").value;
    const sigma = document.getElementById("sigma").value;
    console.log(mu);
    console.log(sigma);
    fetchImage2(mu, sigma)
}


document.addEventListener('DOMContentLoaded', () => {
    const pageName = document.body.getAttribute('data-page-name');
    console.log("name "+ pageName);
    if (pageName == 'test1.html') {
        document.getElementById('sendButton').addEventListener('click', handleName);
        document.getElementById('surveyForm').addEventListener('submit', handleLanguage);
    } else if (pageName == 'test2.html') {
        document.getElementById('slider1').addEventListener('value1', updateValue);
        document.getElementById('slider2').addEventListener('value2', updateValue);
        document.getElementById('submitValues').addEventListener('click', processValues);
    } else if (pageName == 'test4.html') {
        fetchImages();
        document.getElementById('sendButton').addEventListener('click', displayImage);
    } else if (pageName == 'test6.html') {
        fetchData();
        document.getElementById('sendButton').addEventListener('click', saveName);
    } else if (pageName == 'test7.html') {
        document.getElementById('generate-image').addEventListener('click', displayImage2);
    }
});