document.getElementById('detectBtn').addEventListener('click', async () => {
    const messageInput = document.getElementById('messageInput');
    const resultBox = document.getElementById('result');
    const resultTitle = document.getElementById('resultTitle');
    const resultDetails = document.getElementById('resultDetails');
    const detectBtn = document.getElementById('detectBtn');

    const message = messageInput.value.trim();

    if (!message) {
        alert('Please enter a message to scan.');
        return;
    }

    // Update UI state
    detectBtn.disabled = true;
    detectBtn.innerText = 'Analyzing...';
    resultBox.classList.add('hidden');

    try {
        const response = await fetch('/detect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        // Update result UI
        resultBox.className = 'result-box ' + data.status;
        resultTitle.innerText = data.message;
        resultDetails.innerText = data.details;
        resultBox.classList.remove('hidden');

    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    } finally {
        detectBtn.disabled = false;
        detectBtn.innerText = 'Check Message';
    }
});
