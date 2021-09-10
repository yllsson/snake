window.addEventListener('DOMContentLoaded', () => {
  // grab buttons
  const startStopButton = document.getElementById('startStopButton');
  const squares = document.querySelectorAll('.gameBoard div');
  const resetPBButton = document.getElementById('resetPBButton');

  // grab game squares
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

  // start and reset game functions and event listeners
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

  const spawnFruit = () => {
    squares[fruitPosition].classList.remove('fruit');
    fruitPosition = Math.floor(Math.random() * 100);
    while (squares[fruitPosition].classList.contains('snake')) {
      fruitPosition = Math.floor(Math.random() * 100);
    }
    squares[fruitPosition].classList.add('fruit');
  };

  const resetPB = () => {
    bestScore = 0;
    localStorage.setItem('bestScore', bestScore.toString());
    bestScoreDisplay.innerText = bestScore.toString();
  };

  resetPBButton.addEventListener('click', resetPB);

  // snake movement functionality
  const handleSnakeMovement = () => {
    if (
      (snakeHeadPosition % width === 9 && direction === 1) ||
      (snakeHeadPosition % width === 0 && direction === -1) ||
      (snakeHeadPosition <= 9 && direction === -10) ||
      (snakeHeadPosition >= 90 && direction === 10) ||
      squares[snakeHeadPosition + direction].classList.contains('snake')
    ) {
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
