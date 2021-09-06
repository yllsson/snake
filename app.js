window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');

  const startStopButton = document.getElementById('startStopButton');
  const squares = document.querySelectorAll('.gameBoard div');
  console.log(squares);

  let snakeHeadPosition = 0;
  squares[snakeHeadPosition].classList.add('snake');
  const width = 10;
  let direction = 0;
  let snakeSpeed = 1000;
  let interval;
  let gameIsRunning = false;

  const startStopGame = () => {
    if (!gameIsRunning) {
      gameIsRunning = true;
      direction += 1;
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
    clearInterval(interval);
    squares.forEach((square) => {
      square.classList.remove('snake');
    });
    gameIsRunning = false;
    startStopButton.innerText = 'Start game';
    console.log('clearing interval');

    snakeHeadPosition = 0;
    direction = 0;

    squares[snakeHeadPosition].classList.add('snake');
  };

  startStopButton.addEventListener('click', startStopGame);

  const handleSnakeMovement = () => {
    squares.forEach((square) => {
      square.classList.remove('snake');
    });

    console.log(snakeHeadPosition % width === 0 && direction === -1);

    if (
      (snakeHeadPosition % width === 9 && direction === 1) ||
      (snakeHeadPosition % width === 0 && direction === -1) ||
      (snakeHeadPosition <= 9 && direction === -10) ||
      (snakeHeadPosition >= 90 && direction === 10)
    ) {
      console.log('Crash!');
      resetGame();
    } else {
      snakeHeadPosition += direction;
      squares[snakeHeadPosition].classList.add('snake');
    }
  };
});
