const words = ["PROGRAMAR", "AHORCADO", "JAVASCRIPT", "COMPUTADORA"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let mistakes = 0;

const wordDiv = document.getElementById("word");
const lettersDiv = document.getElementById("letters");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart");

function displayWord() {
  wordDiv.textContent = selectedWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function createButtons() {
  const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  lettersDiv.innerHTML = "";
  alphabet.forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => guess(letter, button));
    lettersDiv.appendChild(button);
  });
}

function guess(letter, button) {
  button.disabled = true;
  if (selectedWord.includes(letter)) {
    guessedLetters.push(letter);
    displayWord();
    checkWin();
  } else {
    mistakes++;
    if (mistakes === 6) {
      message.textContent = "💀 Perdiste. La palabra era: " + selectedWord;
      disableAll();
    }
  }
}

function checkWin() {
  if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
    message.textContent = "🎉 ¡Ganaste!";
    disableAll();
  }
}

function disableAll() {
  document.querySelectorAll("#letters button").forEach(b => (b.disabled = true));
}

restartBtn.addEventListener("click", () => {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  mistakes = 0;
  message.textContent = "";
  displayWord();
  createButtons();
});

displayWord();
createButtons();
