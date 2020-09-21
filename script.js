const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGameEl = document.getElementById("end-game-container");
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

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// set default difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

// set the DifficultySelect Value
difficultySelect.value = difficulty;

// as the user come to the page, the input text bar automatically comes into focus
text.focus();

// setInterval - a function will run every second
const timeInterval = setInterval(updateTime, 1000);

// function to get random words from the array of words
function getRandomWords() {
  return words[Math.floor(Math.random() * words.length)];
}

// add function to DOM
function addWordToDOM() {
  randomWord = getRandomWords();
  word.innerHTML = randomWord;
}

// function to updateScore as the typed word is equals to the random word
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// function to countdown the timer - linked with timeInterval
function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// function to show gameOver
function gameOver() {
  endGameEl.innerHTML = `
    <h1>Time Ran Out</h1>
    <p>Your Final Score Is "${score}"</p>
    <button onClick="location.reload()" >Reload</button>
  `;
  endGameEl.style.display = "flex";
}

addWordToDOM();

// Event Listener and the function to determine is the insertedWord === randomWord
text.addEventListener("input", (e) => {
  const insertedWord = e.target.value;

  if (insertedWord === randomWord) {
    addWordToDOM();
    updateScore();

    // clear the input bar
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

// EventListener to the settings button and function to hide the settingsForm
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// EventListener to the settings form to change the difficulty level
settings.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
