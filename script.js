const gameContainer = document.querySelector('.game-container');
const leftPaddle = document.querySelector('.left-paddle');
const rightPaddle = document.querySelector('.right-paddle');
const ball = document.querySelector('.ball');

let leftPaddleY = gameContainer.offsetHeight / 2 - leftPaddle.offsetHeight / 2;
let rightPaddleY = gameContainer.offsetHeight / 2 - rightPaddle.offsetHeight / 2;
let ballX = gameContainer.offsetWidth / 2 - ball.offsetWidth / 2;
let ballY = gameContainer.offsetHeight / 2 - ball.offsetHeight / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let redScore = 0;
letblueScore = 0;

document.addEventListener('keydown', (e) => {
    const paddleSpeed = 25;
    if (e.key === 'w' && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed;
    }
    if (e.key === 's' && leftPaddleY < gameContainer.offsetHeight - leftPaddle.offsetHeight) {
        leftPaddleY += paddleSpeed;
    }
    if (e.key === 'ArrowUp' && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed;
    }
    if (e.key === 'ArrowDown' && rightPaddleY < gameContainer.offsetHeight - rightPaddle.offsetHeight) {
        rightPaddleY += paddleSpeed;
    }
    updatePaddles();
});

function updatePaddles() {
    leftPaddle.style.top = `${leftPaddleY}px`;
    rightPaddle.style.top = `${rightPaddleY}px`;
}

function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY >= gameContainer.offsetHeight - ball.offsetHeight) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= leftPaddle.offsetWidth && ballY + ball.offsetHeight >= leftPaddleY && ballY <= leftPaddleY + leftPaddle.offsetHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX >= gameContainer.offsetWidth - ball.offsetWidth - rightPaddle.offsetWidth &&
        ballY + ball.offsetHeight >= rightPaddleY && ballY <= rightPaddleY + rightPaddle.offsetHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX <= 0 || ballX >= gameContainer.offsetWidth - ball.offsetWidth) {
        resetBall();
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

function resetBall() {
    ballX = gameContainer.offsetWidth / 2 - ball.offsetWidth / 2;
    ballY = gameContainer.offsetHeight / 2 - ball.offsetHeight / 2;
    ballSpeedX = -ballSpeedX;
}

function gameLoop() {
    updateBall();
    requestAnimationFrame(gameLoop);
}

updatePaddles();
gameLoop();

