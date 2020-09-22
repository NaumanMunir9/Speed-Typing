const word = document.getElementById("word");
const input = document.getElementById("input");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const words = [
  "guide",
  "fish",
  "convince",
  "racial",
  "tiger",
  "delicious",
  "butter",
  "alluring",
  "train",
  "explain",
  "haircut",
  "cumbersome",
  "silent",
  "ask",
  "whip",
  "oceanic",
  "report",
  "hang",
  "day",
  "zippy",
  "sneak",
  "resolve",
  "flap",
  "treasure",
  "vague",
  "gratis",
  "awesome",
  "wash",
  "inform",
  "thrive",
  "elderly",
  "forget",
  "drawer",
  "paltry",
  "nappy",
  "vacuous",
  "futuristic",
  "sweet",
  "sleep",
  "airplane",
  "ugliest",
  "ray",
  "counsel",
  "come",
  "sugar",
  "wax",
  "giant",
  "rabbits",
  "live",
  "route",
  "knowledgeable",
  "elastic",
  "snotty",
  "plead",
];

// init Variables
let randomWord;
let score = 0;
let time = 10;

input.focus();

let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value = difficulty;

// Count Down
const timeInterval = setInterval(countDown, 1000);

function generateRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function showWordOnDOM() {
  randomWord = generateRandomWord();
  word.innerHTML = randomWord;
}

function wordsCompare(e) {
  const inputWord = e.target.value;
  if (inputWord === randomWord) {
    showWordOnDOM();
    updateScore();
    e.target.value = "";
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    countDown();
  }
}

function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

function countDown() {
  time--;
  timeElement.innerHTML = `${time}s`;
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endGameElement.innerHTML = `
    <h1> Time Ran Out</h1>
    <p>Your Final Score is ${score}</p>
    <button onClick="location.reload()" >Reload</button>
  `;
  endGameElement.style.display = "flex";
}

function toggleSettings() {
  settings.classList.toggle("hide");
}

function changeDifficulty(e) {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
}

showWordOnDOM();

// event Listener
input.addEventListener("input", wordsCompare);
settingsBtn.addEventListener("click", toggleSettings);
settingsForm.addEventListener("change", changeDifficulty);
