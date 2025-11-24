// GAME STATE VARIABLES
let secret_number;
let guesses_remaining;
let max_guesses = 3;
let game_over = false;

// DOM ELEMENTS
const guess_input = document.getElementById('guess_input');
const submit_button = document.getElementById('submit_guess');
const feedback_area = document.getElementById('feedback_area');
const guesses_display = document.getElementById('guesses_display');
const guesses_remaining_span = document.getElementById('guesses_remaining');
const play_again_button = document.getElementById('play_again');

// INITIALIZE GAME
function init_game() {
    // GENERATE A RANDOM NUMBER BETWEEN 1 AND 10
    secret_number = Math.floor(Math.random() * 10) + 1;
    guesses_remaining = max_guesses;
    game_over = false;
    
    // RESET UI
    guess_input.value = '';
    guess_input.disabled = false;
    submit_button.disabled = false;
    feedback_area.textContent = '';
    guesses_display.textContent = '';
    play_again_button.style.display = 'none';
    guesses_remaining_span.textContent = max_guesses;
}

// HANDLE GUESS SUBMISSION
function handle_guess() {
    if (game_over) {
        return;
    }
    
    // GET USER INPUT
    const guess_value = guess_input.value.trim();
    
    // VALIDATE INPUT
    if (guess_value === '') {
        feedback_area.textContent = 'Please enter a number.';
        return;
    }
    
    const guess = parseInt(guess_value, 10);
    
    // CHECK IF INPUT IS VALID INTEGER
    if (isNaN(guess)) {
        feedback_area.textContent = 'Please enter a valid integer.';
        return;
    }
    
    // CHECK IF GUESS IS OUT OF RANGE
    if (guess < 1 || guess > 10) {
        feedback_area.textContent = 'Please enter a number between 1 and 10.';
        return;
    }
    
    // CALCULATE CURRENT GUESS NUMBER
    const current_guess = max_guesses - guesses_remaining + 1;
    
    // CHECK IF GUESS IS CORRECT
    if (guess === secret_number) {
        feedback_area.textContent = `Congratulations! You guessed the number ${secret_number} correctly!`;
        guesses_display.textContent = '';
        end_game();
        return;
    }
    
    // PROVIDE FEEDBACK
    guesses_remaining -= 1;
    if (guess < secret_number) {
        feedback_area.textContent = 'Too low!';
    } else {
        feedback_area.textContent = 'Too high!';
    }
    
    // UPDATE GUESSES REMAINING DISPLAY
    guesses_remaining_span.textContent = guesses_remaining;
    
    // CHECK IF USER HAS RUN OUT OF GUESSES
    if (guesses_remaining === 0) {
        feedback_area.textContent = `You've run out of guesses! The number was ${secret_number}.`;
        guesses_display.textContent = '';
        end_game();
        return;
    }
    
    guesses_display.textContent = `You have ${guesses_remaining} guesses remaining.`;
    guess_input.value = '';
    guess_input.focus();
}

// END GAME
function end_game() {
    game_over = true;
    guess_input.disabled = true;
    submit_button.disabled = true;
    play_again_button.style.display = 'block';
}

// EVENT LISTENERS
submit_button.addEventListener('click', handle_guess);

guess_input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handle_guess();
    }
});

play_again_button.addEventListener('click', function() {
    init_game();
});

// INITIALIZE GAME ON PAGE LOAD
init_game();

