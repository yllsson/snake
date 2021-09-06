window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');

  const startStopButton = document.getElementById('startStopButton');
  const gameBoard = document.querySelector('.gameBoard');
  let squares = gameBoard.querySelectorAll('div');
  console.log(squares);
  let snakeHeadPosition = 0;

  let direction = 0;
  let snakeSpeed = 1000;
  let interval;
  let gameIsRunning = false;

  const startStopGame = () => {
    if (!gameIsRunning) {
      gameIsRunning = true;
      direction = 1;

      interval = setInterval(() => {
        console.log('Snake is moving');
        freeSnakeMovement();
      }, snakeSpeed);
    } else {
      gameIsRunning = false;
      console.log('clearing interval');
      clearInterval(interval);
    }
  };

  startStopButton.addEventListener('click', startStopGame);

  const freeSnakeMovement = () => {
    squares.forEach((square) => {
      square.classList.remove('snake');
    });

    snakeHeadPosition += 1;
    squares[snakeHeadPosition].classList.add('snake');
    console.log(squares);
  };
});
