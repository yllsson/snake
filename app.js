window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');

  const startStopButton = document.getElementById('startStopButton');
  const squares = document.querySelectorAll('.gameBoard div');
  console.log(squares);

  let snakeHeadPosition = 0;
  const width = 10;
  let direction = 0;
  let snakeSpeed = 1000;
  let interval;
  let gameIsRunning = false;

  const startStopGame = () => {
    if (!gameIsRunning) {
      gameIsRunning = true;
      direction = 1;
      startStopButton.innerText = 'Reset game';

      interval = setInterval(() => {
        console.log('Snake is moving');
        handleSnakeMovement();
      }, snakeSpeed);
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    startStopButton.innerText = 'Start game';

    squares.forEach((square) => {
      square.classList.remove('snake');
    });
    gameIsRunning = false;
    console.log('clearing interval');
    clearInterval(interval);
    snakeHeadPosition = 0;
    squares[snakeHeadPosition].classList.add('snake');
  };

  startStopButton.addEventListener('click', startStopGame);

  const handleSnakeMovement = () => {
    squares.forEach((square) => {
      square.classList.remove('snake');
    });

    if (snakeHeadPosition % width === 9 && direction === 1) {
      console.log('Crash!');
      resetGame();
    } else {
      snakeHeadPosition += 1;
      squares[snakeHeadPosition].classList.add('snake');
      console.log(snakeHeadPosition % width === 9 && direction === 1);
    }
  };
});
