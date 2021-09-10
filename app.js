window.addEventListener('DOMContentLoaded', () => {
  // grab button and game squares
  const startStopButton = document.getElementById('startStopButton');
  const squares = document.querySelectorAll('.gameBoard div');
  const scoreDisplay = document.querySelector('span');

  // snake
  let snake = [0, 0, 0];
  let snakeHeadPosition = snake[0];
  squares[snakeHeadPosition].classList.add('snake');

  // fruit
  let fruitPosition = 0;

  // states
  const width = 10;
  let direction = 0;
  let snakeSpeed = 900;
  let interval;
  let gameIsRunning = false;
  let score = 0;

  const startStopGame = () => {
    if (!gameIsRunning) {
      gameIsRunning = true;
      direction = 1;
      startStopButton.innerText = 'Reset game';
      spawnFruit();

      interval = setInterval(() => {
        handleSnakeMovement();
      }, snakeSpeed);
    } else {
      resetGame();
    }
  };

  startStopButton.addEventListener('click', startStopGame);

  const resetGame = () => {
    console.log('clearing interval');
    clearInterval(interval);

    gameIsRunning = false;
    startStopButton.innerText = 'Start game';

    squares.forEach((square) => {
      square.classList.remove('snake');
    });

    snake = [0, 0, 0];
    snakeHeadPosition = snake[0];
    squares[snakeHeadPosition].classList.add('snake');

    direction = 0;
    snakeSpeed = 900;

    score = 0;
    scoreDisplay.innerText = score;
  };

  const handleSnakeMovement = () => {
    if (
      squares[snakeHeadPosition + direction].classList.contains('snake') ||
      (snakeHeadPosition % width === 9 && direction === 1) ||
      (snakeHeadPosition % width === 0 && direction === -1) ||
      (snakeHeadPosition <= 9 && direction === -10) ||
      (snakeHeadPosition >= 90 && direction === 10)
    ) {
      console.log('Crash!');
      resetGame();
    } else {
      squares.forEach((square) => {
        square.classList.remove('snake');
      });
      if (snake.length < 3) {
        snake.unshift(snakeHeadPosition + direction);
        snakeHeadPosition = snake[0];
      } else {
        const tailPosition = snake.pop();
        squares[tailPosition].classList.remove('snake');

        snake.unshift(snakeHeadPosition + direction);
        snakeHeadPosition = snake[0];

        snake.forEach((square) => {
          squares[square].classList.add('snake');
        });

        if (snakeHeadPosition === fruitPosition) {
          spawnFruit();
          score++;
          scoreDisplay.innerText = score;
          snake.push(tailPosition);
          snakeSpeed -= 50;
          clearInterval(interval);
          interval = setInterval(() => {
            handleSnakeMovement();
          }, snakeSpeed);
        }
      }
    }
  };

  const spawnFruit = () => {
    squares[fruitPosition].classList.remove('fruit');
    fruitPosition = Math.floor(Math.random() * 100);
    squares[fruitPosition].classList.add('fruit');
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
    }
  });
});
