// GAME STATE
let secret_number;
let guesses_remaining;
let max_guesses = 3;
let game_active = false;

// DOM ELEMENTS
const chatMessages = document.getElementById('chat-messages');
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');

// INITIALIZE GAME ON PAGE LOAD
function init_game() {
    secret_number = Math.floor(Math.random() * 10) + 1;
    guesses_remaining = max_guesses;
    game_active = true;
    chatMessages.innerHTML = '';
    add_message("Welcome to the Number Guessing Game!");
    add_message(`I'm thinking of a number between 1 and 10. You have ${max_guesses} guesses.`);
    guessInput.disabled = false;
    guessForm.querySelector('button').disabled = false;
}

// ADD MESSAGE TO CHAT
function add_message(text) {
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// HANDLE FORM SUBMISSION
guessForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!game_active) {
        return;
    }
    
    const guess_value = guessInput.value.trim();
    
    // VALIDATE INPUT
    if (guess_value === '') {
        add_message("Please enter a number.");
        return;
    }
    
    const guess = parseInt(guess_value);
    
    // CHECK IF INPUT IS VALID INTEGER
    if (isNaN(guess)) {
        add_message("Please enter a valid integer.");
        guessInput.value = '';
        return;
    }
    
    // CHECK IF GUESS IS OUT OF RANGE
    if (guess < 1 || guess > 10) {
        add_message("Please enter a number between 1 and 10.");
        guessInput.value = '';
        return;
    }
    
    // CHECK IF GUESS IS CORRECT
    if (guess === secret_number) {
        add_message(`Congratulations! You guessed the number ${secret_number} correctly!`);
        end_game();
        return;
    }
    
    // GUESS IS WRONG - PROVIDE HINT
    guesses_remaining -= 1;
    if (guess < secret_number) {
        add_message(`Too low! You have ${guesses_remaining} guesses remaining.`);
    } else {
        add_message(`Too high! You have ${guesses_remaining} guesses remaining.`);
    }
    
    // CHECK IF USER HAS RUN OUT OF GUESSES
    if (guesses_remaining === 0) {
        add_message(`You've run out of guesses! The number was ${secret_number}.`);
        end_game();
        return;
    }
    
    guessInput.value = '';
});

// END GAME
function end_game() {
    game_active = false;
    guessInput.disabled = true;
    guessForm.querySelector('button').disabled = true;
    
    // ADD PLAY AGAIN BUTTON
    const playAgainBtn = document.createElement('button');
    playAgainBtn.className = 'play-again-btn';
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.addEventListener('click', function() {
        playAgainBtn.remove();
        init_game();
    });
    chatMessages.appendChild(playAgainBtn);
}

// INITIALIZE GAME WHEN PAGE LOADS
init_game();

