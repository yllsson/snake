window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');

  let snake = document.querySelectorAll('.snake');
  const startStopButton = document.getElementById('startStopButton');
  const gameBoard = document.querySelector('.gameBoard');
  let squares = gameBoard.querySelectorAll('div');
  console.log(squares);

  let direction = 0;
  let snakeSpeed = 1000;
  let interval;
  let gameIsRunning = false;
  console.log(snake);

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
    console.log(squares);
  };
});
