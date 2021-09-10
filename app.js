window.addEventListener('DOMContentLoaded', function () {
    // grab button and game squares
    var startStopButton = document.getElementById('startStopButton');
    var squares = document.querySelectorAll('.gameBoard div');
    var scoreDisplay = document.querySelector('span');
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
        console.log('clearing interval');
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
    var handleSnakeMovement = function () {
        if (squares[snakeHeadPosition + direction].classList.contains('snake') ||
            (snakeHeadPosition % width === 9 && direction === 1) ||
            (snakeHeadPosition % width === 0 && direction === -1) ||
            (snakeHeadPosition <= 9 && direction === -10) ||
            (snakeHeadPosition >= 90 && direction === 10)) {
            console.log('Crash!');
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
    var spawnFruit = function () {
        squares[fruitPosition].classList.remove('fruit');
        fruitPosition = Math.floor(Math.random() * 100);
        while (squares[fruitPosition].classList.contains('snake')) {
            fruitPosition = Math.floor(Math.random() * 100);
        }
        squares[fruitPosition].classList.add('fruit');
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
