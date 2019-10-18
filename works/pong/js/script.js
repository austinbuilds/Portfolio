// Variables
let canvas;
let canvasContext;
let ballX = 400;
let ballY = 300;
let ballSpeedX = 10;
let ballSpeedY = 4;

let paddle1Score = 0;
let paddle2Score = 0;
const WINNING_SCORE = 7;

let winScreen = false;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

// Functions
calculateMousePos = (evt) => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

handleMouseClick = (evt) => {
  if (winScreen) {
    paddle1Score = 0;
    paddle2Score = 0;
    winScreen = false;
  }
}

window.onload = () => {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  // Timer
  let framesPerSecond = 30;
  setInterval(() => {
    movement();
    drawObjects();
  }, 1000 / framesPerSecond);

  canvas.addEventListener('mousedown', handleMouseClick);

  canvas.addEventListener('mousemove',
    (evt) => {
      let mousePos = calculateMousePos(evt);
      paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });

  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

ballReset = () => {
  if (paddle1Score >= WINNING_SCORE || paddle2Score >= WINNING_SCORE) {
    winScreen = true;
  }
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

ai = () => {
  let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);

  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 10;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 10;
  }
}

movement = () => {
  if (winScreen) {
    return;
  }

  ai();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      paddle2Score++;
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      paddle1Score++;
      ballReset();
    }
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

drawNet = () => {
  for (let i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 6, 20, 'white');
  }
}

drawObjects = () => {
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  canvasContext.font = '20px "Press Start 2P"';
  canvasContext.textAlign = "center";

  if (winScreen) {
    canvasContext.fillStyle = 'white';

    if (paddle1Score >= WINNING_SCORE) {
      canvasContext.fillText("PLAYER 1 WON", 400, 250);
    } else if (paddle2Score >= WINNING_SCORE) {
      canvasContext.fillText("PLAYER 2 WON", 400, 250);
    }
    canvasContext.fillStyle = 'white';
    canvasContext.fillText("CLICK TO CONTINUE", 400, 350);
    return;
  }

  drawNet();

  colorRect(0, paddle1Y, PADDLE_THICKNESS, 100, 'white');
  colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, 100,
    'white');
  colorRect(ballX, ballY, 10, 10, 'white');
  canvasContext.fillText(paddle1Score, 100, 100);
  canvasContext.fillText(paddle2Score, canvas.width - 100, 100);
}

colorRect = (leftX, topY, width, height, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
