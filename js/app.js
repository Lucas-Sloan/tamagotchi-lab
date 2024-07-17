
// 3) Upon loading, the game state should be initialized, and a function should 
//    be called to render this game state.

// 4) The state of the game should be rendered to the user.

// 5) Handle the game over logic. 

// 6) Handle each instance of a player clicking a button with the use of a 
//    `handleClick()` function.

// 7) Create reset functionality.


/*-------------------------------- Constants --------------------------------*/

const MAX_STAT = 10;
const INTERVAL_TIME = 1000;


/*---------------------------- Variables (state) ----------------------------*/

let boredom = 0;
let hunger = 0;
let sleepiness = 0;
let interval;


/*------------------------ Cached Element References ------------------------*/

const playButton = document.getElementById('play');
const feedButton = document.getElementById('feed');
const sleepButton = document.getElementById('sleep');
const restartButton = document.getElementById('restart');
const boredomStat = document.getElementById('boredom-stat');
const hungerStat = document.getElementById('hunger-stat');
const sleepinessStat = document.getElementById('sleepiness-stat');
const message = document.getElementById('message');


/*-------------------------------- Functions --------------------------------*/

function updateStats() {
    boredomStat.textContent = boredom;
    hungerStat.textContent = hunger;
    sleepinessStat.textContent = sleepiness;
  }

function increaseStats() {
  boredom++;
  hunger++;
  sleepiness++;
  render();
  checkGameOver();
}

function resetGame() {
  boredom = 0;
  hunger = 0;
  sleepiness = 0;
  updateStats();
  message.classList.add('hidden');
  restartButton.classList.add('hidden');

  document.querySelector('img[src="./assets/ghost.png"]').classList.remove('hidden');
  document.querySelector('img[src="./assets/surprise.png"]').classList.add('hidden');

  interval = setInterval(increaseStats, INTERVAL_TIME);
}

function checkGameOver() {
  if (boredom >= MAX_STAT || hunger >= MAX_STAT || sleepiness >= MAX_STAT) {
    clearInterval(interval);
    message.textContent = "You lost him";
    message.classList.remove('hidden');

    document.querySelector('img[src="./assets/ghost.png"]').classList.add('hidden');
    document.querySelector('img[src="./assets/surprise.png"]').classList.remove('hidden');

    restartButton.classList.remove('hidden')
  }
}

function handleClick(stat) {
  if(stat === 'boredom') boredom = Math.max(boredom -2, 0);
  if(stat === 'hunger') hunger = Math.max(hunger -5, 0);
  if(stat === 'sleepiness') sleepiness = Math.max(sleepiness -10, 0);
  render();
}

function render() {
  updateStats();
}



/*----------------------------- Event Listeners -----------------------------*/

playButton.addEventListener('click', () => handleClick('boredom'));
feedButton.addEventListener('click', () => handleClick('hunger'));
sleepButton.addEventListener('click', () => handleClick('sleepiness'));
restartButton.addEventListener('click', resetGame);
  
  
  /* Initialize the game */
document.addEventListener('DOMContentLoaded', resetGame);

