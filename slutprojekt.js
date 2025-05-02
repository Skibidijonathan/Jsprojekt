// projekt.js

let currentScore = 0;
let activePlayer = 1;
let scores = [0, 0];
let playing = true;

// DOM-element
const diceResult = document.getElementById("dice-result");
const score1El = document.getElementById("score1");
const score2El = document.getElementById("score2");
const current1El = document.getElementById("current1");
const current2El = document.getElementById("current2");

const btnRoll = document.getElementById("roll");
const btnHold = document.getElementById("hold");
const btnNewGame = document.getElementById("new-game");

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
}

btnRoll.addEventListener("click", function () {
  if (!playing) return;

  const dice = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `Tärningskast: ${dice}`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  if (!playing) return;

  scores[activePlayer - 1] += currentScore;
  document.getElementById(`score${activePlayer}`).textContent = scores[activePlayer - 1];

  if (scores[activePlayer - 1] >= 50) {
    diceResult.textContent = `Spelare ${activePlayer} vinner! 🎉`;
    playing = false;
  } else {
    switchPlayer();
  }
});

btnNewGame.addEventListener("click", function () {
  currentScore = 0;
  activePlayer = 1;
  scores = [0, 0];
  playing = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;
  diceResult.textContent = "Tärningskast: -";
});
