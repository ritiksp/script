// Function to log the name of the clicked HTML element
function logElementName(event) {
    console.log("Clicked element:", event.target.tagName);
}

// Add click event listener to the document body
document.body.addEventListener('click', logElementName);

function logKeyPressed(event) {
    console.log("Pressed key:", event.key);
}

// Add keydown event listener to the document body
document.body.addEventListener('keydown', logKeyPressed);
