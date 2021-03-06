window.addEventListener('DOMContentLoaded', function () {
    // grab buttons
    var startStopButton = document.getElementById('startStopButton');
    var squares = document.querySelectorAll('.gameBoard div');
    var resetPBButton = document.getElementById('resetPBButton');
    // grab game squares
    var scoreDisplay = document.getElementById('score');
    var bestScoreDisplay = document.getElementById('bestScore');
    // snake
    var snake = [0, 0, 0];
    var snakeHeadPosition = snake[0];
    squares[snakeHeadPosition].classList.add('snake');
    // fruit
    var fruitPosition = 0;
    // states
    var width = 10;
    var direction = 0;
    var snakeSpeed = 900;
    var interval;
    var gameIsRunning = false;
    var score = 0;
    var bestScore = localStorage.bestScore
        ? parseInt(localStorage.getItem('bestScore'))
        : 0;
    bestScoreDisplay.innerText = bestScore.toString();
    // start and reset game functions and event listeners
    var startStopGame = function () {
        if (!gameIsRunning) {
            gameIsRunning = true;
            direction = 1;
            startStopButton.innerText = 'Reset game';
            spawnFruit();
            interval = setInterval(function () {
                handleSnakeMovement();
            }, snakeSpeed);
        }
        else {
            resetGame();
        }
    };
    startStopButton.addEventListener('click', startStopGame);
    var resetGame = function () {
        clearInterval(interval);
        gameIsRunning = false;
        startStopButton.innerText = 'Start game';
        squares.forEach(function (square) {
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
    var spawnFruit = function () {
        squares[fruitPosition].classList.remove('fruit');
        fruitPosition = Math.floor(Math.random() * 100);
        while (squares[fruitPosition].classList.contains('snake')) {
            fruitPosition = Math.floor(Math.random() * 100);
        }
        squares[fruitPosition].classList.add('fruit');
    };
    var resetPB = function () {
        bestScore = 0;
        localStorage.setItem('bestScore', bestScore.toString());
        bestScoreDisplay.innerText = bestScore.toString();
    };
    resetPBButton.addEventListener('click', resetPB);
    // snake movement functionality
    var handleSnakeMovement = function () {
        if ((snakeHeadPosition % width === 9 && direction === 1) ||
            (snakeHeadPosition % width === 0 && direction === -1) ||
            (snakeHeadPosition <= 9 && direction === -10) ||
            (snakeHeadPosition >= 90 && direction === 10) ||
            squares[snakeHeadPosition + direction].classList.contains('snake')) {
            resetGame();
        }
        else {
            squares.forEach(function (square) {
                square.classList.remove('snake');
            });
            if (snake.length < 3) {
                snake.unshift(snakeHeadPosition + direction);
                snakeHeadPosition = snake[0];
            }
            else {
                var tailPosition = snake.pop();
                squares[tailPosition].classList.remove('snake');
                snake.unshift(snakeHeadPosition + direction);
                snakeHeadPosition = snake[0];
                snake.forEach(function (square) {
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
                    interval = setInterval(function () {
                        handleSnakeMovement();
                    }, snakeSpeed);
                }
            }
        }
    };
    window.addEventListener('keyup', function (event) {
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
