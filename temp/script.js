const cardEL = document.querySelectorAll('.card_item');
let activeElements = [];
let isDelaying = false;
let score = 0;
let currentScore = 0;
let draws = 0;
let resetTimeout;

// Select the elements to display the score and draws
const scoreDisplay = document.getElementById('score');
const drawsDisplay = document.getElementById('draws');

// Define the function to update the score and draws display
const updateDisplay = () => {
    scoreDisplay.textContent = `Score: ${score}`;
    drawsDisplay.textContent = `Draws: ${draws}`;
};

// Update the display initially
updateDisplay();

// Define the click event listener function
const clickListener = (backElement) => {
    if (!backElement) return; // Check if backElement is defined

    backElement.classList.add('active');
    // Increment the draws counter each time an element is clicked and becomes active
    draws++;

    // Add the clicked element to the list of active elements
    activeElements.push(backElement);

    // Check if there are 2 active elements
    if (activeElements.length === 2) {
        // Set delaying state to true
        isDelaying = true;
        // Store the current score
        currentScore = score;

        const faceImages = activeElements.map(activeElement => {
            return activeElement.parentElement.querySelector('.face img').src;
        });

        // Check if the face images of the clicked elements are the same
        if (faceImages[0] === faceImages[1]) {
            // If they are the same, increase score by one, remove event listeners, and make them permanently active
            score++;
            console.log('Score:', score);
            activeElements.forEach(element => {
                // Remove the click event listener
                element.removeEventListener('click', clickListener);
            });
        }

        // Remove the 'active' class from all elements after a delay of 1 second
        setTimeout(() => {
            // Check if the score has changed during the delay
            if (currentScore === score) {
                activeElements.forEach(element => {
                    element.classList.remove('active');
                });
            }
            // Reset the list of active elements
            activeElements = [];
            // Reset the delaying state
            isDelaying = false;
            // Update the display after the delay
            updateDisplay();
        }, 1000);
    }
};

// Add click event listeners to card elements
cardEL.forEach(card => {
    const backElement = card.querySelector('.back');
    backElement.addEventListener('click', () => {
        if (!isDelaying) {
            clickListener(backElement);
        }
    });
});

// Function to reset the game
const resetGame = () => {
    // Reset all variables
    activeElements = [];
    isDelaying = false;
    score = 0;
    currentScore = 0;
    draws = 0;
    // Update display
    updateDisplay();
    // Reset event listeners
    cardEL.forEach(card => {
        const backElement = card.querySelector('.back');
        backElement.addEventListener('click', () => {
            if (!isDelaying) {
                clickListener(backElement);
            }
        });
    });
};

// Reset the game after the score reaches 10
if (score >= 10) {
    clearTimeout(resetTimeout); // Clear the previous reset timeout if it exists
    resetTimeout = setTimeout(resetGame, 5000); // Reset after 5 seconds
}
