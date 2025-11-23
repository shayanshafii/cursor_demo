import { useState, useEffect } from 'react'

function App() {
  const [secret_number, set_secret_number] = useState(null)
  const [guesses_remaining, set_guesses_remaining] = useState(3)
  const [messages, set_messages] = useState([])
  const [current_guess, set_current_guess] = useState('')
  const [game_over, set_game_over] = useState(false)
  const max_guesses = 3

  // GENERATE SECRET NUMBER ON COMPONENT MOUNT
  useEffect(() => {
    const number = Math.floor(Math.random() * 10) + 1
    set_secret_number(number)
    set_messages([
      `Welcome to the Number Guessing Game!`,
      `I'm thinking of a number between 1 and 10. You have ${max_guesses} guesses.`
    ])
  }, [])

  // HANDLE GUESS SUBMISSION
  const handle_submit = (e) => {
    e.preventDefault()
    
    if (game_over) return

    const guess = parseInt(current_guess)
    
    // VALIDATE INPUT
    if (isNaN(guess) || guess < 1 || guess > 10) {
      set_messages(prev => [...prev, 'Please enter a number between 1 and 10.'])
      set_current_guess('')
      return
    }

    const current_guess_number = max_guesses - guesses_remaining + 1
    set_messages(prev => [...prev, `Enter your guess (${current_guess_number}/${max_guesses}): ${guess}`])

    // CHECK IF GUESS IS CORRECT
    if (guess === secret_number) {
      set_messages(prev => [...prev, `Congratulations! You guessed the number ${secret_number} correctly!`])
      set_game_over(true)
      return
    }

    // PROVIDE FEEDBACK
    if (guess < secret_number) {
      set_messages(prev => [...prev, 'Too low!'])
    } else {
      set_messages(prev => [...prev, 'Too high!'])
    }

    const new_guesses_remaining = guesses_remaining - 1
    set_guesses_remaining(new_guesses_remaining)

    // CHECK IF USER HAS RUN OUT OF GUESSES
    if (new_guesses_remaining === 0) {
      set_messages(prev => [...prev, `Sorry, you've run out of guesses. The number was ${secret_number}.`])
      set_game_over(true)
    }

    set_current_guess('')
  }

  return (
    <div className="app">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      {!game_over && (
        <form onSubmit={handle_submit} className="input_form">
          <input
            type="number"
            value={current_guess}
            onChange={(e) => set_current_guess(e.target.value)}
            placeholder="Enter your guess"
            min="1"
            max="10"
            className="guess_input"
          />
          <button type="submit" className="submit_button">Submit</button>
        </form>
      )}
    </div>
  )
}

export default App

