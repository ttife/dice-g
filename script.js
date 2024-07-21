let scores, currentScore, activePlayer, playing;

// Initialize game
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // Player 0 starts first
  playing = true;

  // Reset UI
  document.getElementById('score--0').textContent = scores[0];
  document.getElementById('score--1').textContent = scores[1];
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  // Reset player names
  document.getElementById('name--0').textContent = 'Tife';
  document.getElementById('name--1').textContent = 'Ayomide';

  // Reset player backgrounds
  document.querySelector('.player--0').classList.remove('winner');
  document.querySelector('.player--1').classList.remove('winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

  // Reset dice image
  document.querySelector('.dice').style.display = 'none';
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

document.getElementById('roll-dice-btn').addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    let dice = Math.floor(Math.random() * 6) + 1;

    // Display dice image
    let diceImage = document.querySelector('.dice');
    diceImage.src = `./image/dice-${dice}.png`;
    diceImage.style.display = 'block';

    // Update current score if rolled number is not 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold functionality
document.getElementById('hold-btn').addEventListener('click', function () {
  if (playing) {
    // Add current score to player's total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Check if player has won
    if (scores[activePlayer] >= 100) {
      document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
      document.querySelector('.player--' + activePlayer).classList.add('winner');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

// New game functionality
document.getElementById('new-game-btn').addEventListener('click', function () {
  init();
});
