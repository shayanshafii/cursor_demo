import React, { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [secret_number, set_secret_number] = useState(null)
  const [guesses_remaining, set_guesses_remaining] = useState(3)
  const [messages, set_messages] = useState([])
  const [input_value, set_input_value] = useState('')
  const [game_over, set_game_over] = useState(false)
  const input_ref = useRef(null)
  const messages_end_ref = useRef(null)

  // INITIALIZE GAME ON MOUNT
  useEffect(() => {
    start_new_game()
  }, [])

  // SCROLL TO BOTTOM WHEN MESSAGES CHANGE
  useEffect(() => {
    messages_end_ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // FOCUS INPUT ON MOUNT AND AFTER MESSAGES
  useEffect(() => {
    input_ref.current?.focus()
  }, [messages])

  const start_new_game = () => {
    const new_secret = Math.floor(Math.random() * 10) + 1
    set_secret_number(new_secret)
    set_guesses_remaining(3)
    set_messages([
      {
        type: 'system',
        text: 'Welcome to the Number Guessing Game!',
      },
      {
        type: 'system',
        text: "I'm thinking of a number between 1 and 10. You have 3 guesses.",
      },
    ])
    set_game_over(false)
    set_input_value('')
  }

  const handle_submit = (e) => {
    e.preventDefault()
    
    if (game_over || input_value.trim() === '') {
      return
    }

    const guess = parseInt(input_value.trim())

    // VALIDATE INPUT
    if (isNaN(guess) || guess < 1 || guess > 10) {
      set_messages((prev) => [
        ...prev,
        {
          type: 'user',
          text: input_value,
        },
        {
          type: 'system',
          text: 'Please enter a number between 1 and 10.',
        },
      ])
      set_input_value('')
      return
    }

    const current_guess_number = 3 - guesses_remaining + 1
    set_messages((prev) => [
      ...prev,
      {
        type: 'user',
        text: `Guess ${current_guess_number}/3: ${guess}`,
      },
    ])

    // CHECK IF GUESS IS CORRECT
    if (guess === secret_number) {
      set_messages((prev) => [
        ...prev,
        {
          type: 'system',
          text: `Congratulations! You guessed the number ${secret_number} correctly!`,
        },
      ])
      set_game_over(true)
      set_input_value('')
      return
    }

    // INCORRECT GUESS
    const new_guesses_remaining = guesses_remaining - 1
    set_guesses_remaining(new_guesses_remaining)

    if (new_guesses_remaining === 0) {
      set_messages((prev) => [
        ...prev,
        {
          type: 'system',
          text: `Sorry, that's not the correct number. You've run out of guesses! The number was ${secret_number}.`,
        },
      ])
      set_game_over(true)
    } else {
      set_messages((prev) => [
        ...prev,
        {
          type: 'system',
          text: `Sorry, that's not the correct number. You have ${new_guesses_remaining} guesses remaining.`,
        },
      ])
    }

    set_input_value('')
  }

  return (
    <div className="app">
      <div className="chat_container">
        <div className="messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messages_end_ref} />
        </div>
        {game_over && (
          <button className="new_game_button" onClick={start_new_game}>
            New Game
          </button>
        )}
        <form onSubmit={handle_submit} className="input_form">
          <input
            ref={input_ref}
            type="text"
            value={input_value}
            onChange={(e) => set_input_value(e.target.value)}
            placeholder={game_over ? 'Game over' : 'Enter your guess (1-10)'}
            disabled={game_over}
            className="input_field"
          />
          <button type="submit" disabled={game_over} className="submit_button">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
