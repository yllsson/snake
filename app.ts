window.addEventListener('DOMContentLoaded', () => {
  // grab button and game squares
  const startStopButton = document.getElementById('startStopButton');
  const squares = document.querySelectorAll('.gameBoard div');
  const scoreDisplay = document.getElementById('score');
  const bestScoreDisplay = document.getElementById('bestScore');

  // snake
  let snake: number[] = [0, 0, 0];
  let snakeHeadPosition: number = snake[0];
  squares[snakeHeadPosition].classList.add('snake');

  // fruit
  let fruitPosition: number = 0;

  // states
  const width: number = 10;
  let direction: number = 0;
  let snakeSpeed: number = 900;
  let interval;
  let gameIsRunning: boolean = false;
  let score: number = 0;

  let bestScore: number = localStorage.bestScore
    ? parseInt(localStorage.getItem('bestScore'))
    : 0;
  bestScoreDisplay.innerText = bestScore.toString();

  console.log(localStorage.bestScore);

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
    scoreDisplay.innerText = score.toString();
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
        const tailPosition: number = snake.pop();
        squares[tailPosition].classList.remove('snake');

        snake.unshift(snakeHeadPosition + direction);
        snakeHeadPosition = snake[0];

        snake.forEach((square) => {
          squares[square].classList.add('snake');
        });

        if (snakeHeadPosition === fruitPosition) {
          spawnFruit();
          score++;
          scoreDisplay.innerText = score.toString();

          if (score > bestScore) {
            bestScore = score;
            bestScoreDisplay.innerText = bestScore.toString();
            localStorage.setItem('bestScore', bestScore.toString());
          }

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
    while (squares[fruitPosition].classList.contains('snake')) {
      fruitPosition = Math.floor(Math.random() * 100);
    }
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
