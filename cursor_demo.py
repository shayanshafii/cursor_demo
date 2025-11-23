import random


def play_guessing_game():
    # GENERATE A RANDOM NUMBER BETWEEN 1 AND 10
    secret_number = random.randint(1, 10)
    max_guesses = 3
    guesses_remaining = max_guesses
    
    print("\nWelcome to the Number Guessing Game!")
    print(f"I'm thinking of a number between 1 and 10. You have {max_guesses} guesses.")
    
    # LOOP FOR USER GUESSES
    while guesses_remaining > 0:
        try:
            # GET USER INPUT
            current_guess = max_guesses - guesses_remaining + 1
            guess = int(input(f"\nEnter your guess ({current_guess}/{max_guesses}): "))
            
            # CHECK IF GUESS IS OUT OF RANGE
            if guess < 1 or guess > 10:
                print("Please enter a number between 1 and 10.")
                continue
            
            # CHECK IF GUESS IS CORRECT
            if guess == secret_number:
                print(f"Congratulations! You guessed the number {secret_number} correctly!")
                return
            
            # PROVIDE FEEDBACK ON GUESS
            if guess < secret_number:
                print("Too low!")
            else:
                print("Too high!")
            guesses_remaining -= 1
            
            # CHECK IF USER HAS RUN OUT OF GUESSES
            if guesses_remaining == 0:
                print(f"\nSorry, you've run out of guesses. The number was {secret_number}.")
        
        except ValueError:
            print("Please enter a valid integer.")
            continue


if __name__ == "__main__":
    play_guessing_game()

