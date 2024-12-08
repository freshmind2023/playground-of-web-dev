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
    }
});