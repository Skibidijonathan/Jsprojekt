// Startvärden
let currentScore = 0; // Tillfällig poäng för nuvarande spelare
let activePlayer = 0; // 0 = spelare 1, 1 = spelare 2
let scores = [0, 0]; // Totalpoäng för båda spelare
let playing = true; // True = spelet pågår, False = spelet är slut

// Hämtar HTML-element (för att kunna ändra deras innehåll)
const diceResult = document.getElementById("dice-result"); // Visar resultat från tärningen
const scoreEls = [
  document.getElementById("score--0"),
  document.getElementById("score--1"),
]; // Element som visar totalpoäng

const currentEls = [
  document.getElementById("current--0"),
  document.getElementById("current--1"),
]; // Element som visar nuvarande poäng

const playerEls = [
  document.querySelector(".player--0"),
  document.querySelector(".player--1"),
]; // Hämtar spelarnas områden (för att växla aktiv klass)

// Hämtar knappar
const btnRoll = document.getElementById("roll"); // "Kasta Tärning"-knapp
const btnHold = document.getElementById("hold"); // "Hold"-knapp
const btnNewGame = document.getElementById("new-game"); // "Nytt Spel"-knapp

// Funktion: Byt spelare
function switchPlayer() {
  currentEls[activePlayer].textContent = 0; // Nollställ tillfällig poäng i visningen
  currentScore = 0; // Nollställ tillfällig poäng i variabeln

  // Ta bort aktiv klass från nuvarande spelare
  playerEls[activePlayer].classList.remove("active");

  // Byt spelare: 0 blir 1, 1 blir 0
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Lägg till aktiv klass på nya spelaren
  playerEls[activePlayer].classList.add("active");
}

// När man klickar på "Kasta Tärning"-knappen
btnRoll.addEventListener("click", function () {
  if (!playing) return; // Om spelet är slut, gör inget

  const dice = Math.floor(Math.random() * 6) + 1; // Slumpa tärning (1–6)
  diceResult.textContent = `Tärningskast: ${dice}`; // Visa resultat

  if (dice !== 1) {
    currentScore += dice; // Lägg till poäng till tillfälliga poängen
    currentEls[activePlayer].textContent = currentScore; // Visa uppdaterad poäng
  } else {
    switchPlayer(); // Om man slår 1, förlorar man turen
  }
});

// När man klickar på "Hold"-knappen
btnHold.addEventListener("click", function () {
  if (!playing) return; // Om spelet är slut, gör inget

  // Lägg till tillfälliga poängen till totalpoängen
  scores[activePlayer] += currentScore;
  scoreEls[activePlayer].textContent = scores[activePlayer]; // Uppdatera HTML

  // Kolla om spelaren har vunnit (50 poäng eller mer)
  if (scores[activePlayer] >= 50) {
    diceResult.textContent = `Spelare ${activePlayer + 1} vinner! 🦆🎉`; // Visa vinnaren
    playing = false; // Avsluta spelet
  } else {
    switchPlayer(); // Byt spelare annars
  }
});

// När man klickar på "Nytt Spel"-knappen
btnNewGame.addEventListener("click", function () {
  // Återställ alla värden
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  // Nollställ visningen
  scoreEls[0].textContent = 0;
  scoreEls[1].textContent = 0;
  currentEls[0].textContent = 0;
  currentEls[1].textContent = 0;
  diceResult.textContent = "Tärningskast: -";

  // Visa att spelare 1 börjar
  playerEls[0].classList.add("active");
  playerEls[1].classList.remove("active");
});