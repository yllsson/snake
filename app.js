window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');

  const startStopButton = document.getElementById('startStopButton');
  const squares = document.querySelectorAll('.gameBoard div');
  console.log(squares);

  let snake = [0, 0, 0];
  let snakeHeadPosition = snake[0];
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

    snake = [0, 0, 0];
    snakeHeadPosition = snake[0];
    direction = 0;

    squares[snakeHeadPosition].classList.add('snake');
  };

  startStopButton.addEventListener('click', startStopGame);

  const handleSnakeMovement = () => {
    squares.forEach((square) => {
      square.classList.remove('snake');
    });

    if (
      (snakeHeadPosition % width === 9 && direction === 1) ||
      (snakeHeadPosition % width === 0 && direction === -1) ||
      (snakeHeadPosition <= 9 && direction === -10) ||
      (snakeHeadPosition >= 90 && direction === 10)
    ) {
      console.log('Crash!');
      resetGame();
    } else {
      if (snake.length < 3) {
        snake.unshift(snakeHeadPosition + direction);
        snakeHeadPosition = snake[0];
      } else {
        const tailPosition = snake.pop();
        squares[tailPosition].classList.remove('snake');

        snake.unshift(snakeHeadPosition + direction);
        snakeHeadPosition = snake[0];

        console.log(snake);

        snake.forEach((square) => {
          squares[square].classList.add('snake');
        });
      }
    }
  };

  window.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'ArrowUp':
        direction = -10;
        break;
      case 'ArrowDown':
        direction = 10;
        break;
      case 'ArrowLeft':
        direction = -1;
        break;
      case 'ArrowRight':
        direction = 1;
        break;
      default:
        break;
    }
  });
});
