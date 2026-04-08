const flashcards = document.querySelectorAll('.flashcard');
const progressBarFill = document.querySelector('.progress-bar-fill');
const progressBarText = document.querySelector('.progress-bar-text');
const prevButton = document.querySelector('.prev-button');
const answerButton = document.querySelector('.answer-button');
const nextButton = document.querySelector('.next-button');

let currentFlashcardIndex = 0;
const totalFlashcards = flashcards.length;

function getUI() {
    flashcards.forEach((card, index) => {
        if (index === currentFlashcardIndex) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
            card.classList.remove('flip');
        }
    });
    prevButton.disabled = currentFlashcardIndex === 0;
    nextButton.disabled = currentFlashcardIndex === totalFlashcards - 1;

    prevButton.style.opacity = currentFlashcardIndex === 0 ? '0.5' : '1';
    nextButton.style.opacity = currentFlashcardIndex === totalFlashcards - 1 ? '0.5' : '1';
    prevButton.style.cursor = currentFlashcardIndex === 0 ? 'not-allowed' : 'pointer';
    nextButton.style.cursor = currentFlashcardIndex === totalFlashcards - 1 ? 'not-allowed' : 'pointer';

    const currentCardNumber = currentFlashcardIndex + 1;
    const progressPercent = (currentCardNumber / totalFlashcards) * 100;

    progressBarFill.style.width = `${progressPercent}%`;
    progressBarText.textContent = `${Math.round(progressPercent)}%`;  
}

function nextFlashcard() {
    if (currentFlashcardIndex < totalFlashcards - 1) {
        currentFlashcardIndex++;
        getUI();
    }
}

function prevFlashcard() {
    if (currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        getUI(); 
    }
}

function toggleFlip() {
    const currentCard = flashcards[currentFlashcardIndex];
    currentCard.classList.toggle('flip');
}

nextButton.addEventListener('click', nextFlashcard);
prevButton.addEventListener('click', prevFlashcard);
answerButton.addEventListener('click', toggleFlip);

flashcards.forEach(card => {
    card.addEventListener('click', toggleFlip);
})

getUI();