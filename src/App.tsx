import { useEffect, useState } from "react";
import "./App.css";

const words = [
  "absurd",
  "buzzing",
  "funny",
  "oxygen",
  "pajama",
  "peekaboo",
  "zombie",
];

const letters = "abcdefghijklmnopqrstuvwxyz";

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([
    [
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "not-in-word" },
      { value: "", status: "" },
      { value: "", status: "" },
    ],
    [
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
    ],
    [
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
    ],
    [
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
    ],
    [
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
    ],
    [
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
      { value: "", status: "" },
    ],
  ]);

  const [position, setPosition] = useState ({
    guess: 0,
    char: 0
  })


  useEffect(() => {
    const listener = e => {
      const key = e.key.toLowerCase()
      console.log(key)

      if(letters.includes(key)) enterCharacter(key)

      if (key === 'backspace') deleteCharacter()

      if (key === 'enter') submitGuess()

    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [position, guesses, word])


  function submitGuess() {
    if (position.char < 4) return
    const guessesCopy = JSON.parse(JSON.stringify(guesses))
    let guess = guessesCopy[position.guess]

    let wordCopy = word

    for (const index in guess) {
      const char = guess[index]
      if(wordCopy[index] === char.value) {
        char.status = 'at-location'
        wordCopy = wordCopy.replace(char.value, '_')
      }

    }

    for (const index in guess) {
      const char = guess[index]
      if (char.status = 'at-location') continue

     if (word.includes(char.value)) {
        char.status = 'in-word'
        wordCopy = wordCopy.replace(char.value, '_')
      } else {
        char.status = 'not-in-word'
      }
    }

    setGuesses(guessesCopy)
    setPosition({...position, guess: position.guess +1, char: 0})
    setWord(word)

  }

  function enterCharacter(char) {
    if(position.char >= 5) return
    const guessesCopy = JSON.parse(JSON.stringify(guesses))
    guessesCopy[position.guess][position.char] = char
    setGuesses(guessesCopy)
    setPosition({...position, char: position.char +1})
  }

  function deleteCharacter() {
    if(position.char <= 0) return
    const guessesCopy = JSON.parse(JSON.stringify(guesses))
    guessesCopy[position.guess][position.char-1].value =''
    setGuesses(guessesCopy)
    if(position.char > 0) {
      setPosition({...position, char: position.char -1})
    }
   
  }

  return (
    <div className="App">
      <div className="guesses-list">
        {guesses.map((guess) => (
          <div className="guess">
            {guess.map((char) => (
              <div className={`character ${char.status}`}>{char.value}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
