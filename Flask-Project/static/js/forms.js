// Handler for Form 1
async function handleName(event) {
    console.log("here")
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
    console.log("here1")
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



document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendButton').addEventListener('click', handleName);
    document.getElementById('surveyForm').addEventListener('submit', handleLanguage);
});