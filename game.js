let lastRenderTime = 0
let gameOver = false
let inputDirection = { x: 0, y: 0 }
let lastInputDirection = { x: 0, y: 0 }
let newSegments = 0
const gameBoard = document.getElementById('game-board')
const snakeBody = [{ x: 11, y: 11 }]
const EXPANSION_RATE = 1
const SNAKE_SPEED = 5
let pace = 0
let score = 0;
// const countFruits = 0


function main(currentTime) {
  if (gameOver) {
    if (confirm('You ate ' + score + ' fruits. Press ok to restart')) {
      location.reload();
      // window.location = '/'
    }
    return
  }
  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / pace
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
  lastRenderTime = currentTime
  if (score < 9) {
    pace = 1100
    document.getElementById("level").innerHTML = 1;
  } else if (score > 9 && score < 19) {
    pace = 1050
    document.getElementById("level").innerHTML = 2;
    document.body.style.background = '#ff99cc'
  } else if (score > 19 && score < 29) {
    pace = 1000
    document.getElementById("level").innerHTML = 3;
    document.body.style.background = '#99ccff'
  } else if (score > 29 && score < 39) {
    pace = 950
    document.getElementById("level").innerHTML = 4;
    document.body.style.background = '#009999'
  } else if (score > 39 && score < 49) {
    pace = 900
    document.getElementById("level").innerHTML = 5;
    document.body.style.background = '#6699ff'
  } else if (score > 49 && score < 59) {
    pace = 850
    document.getElementById("level").innerHTML = 6;
    document.body.style.background = '#996633'
  } else if (score > 59 && score < 69) {
    pace = 800
    document.getElementById("level").innerHTML = 7;
    document.body.style.background = '#ff5050'
  } else if (score > 69 && score < 79) {
    pace = 750
    document.getElementById("level").innerHTML = 8;
    document.body.style.background = '#ff0000'
  } else if (score > 79 && score < 89) {
    pace = 700
    document.getElementById("level").innerHTML = 9;
    document.body.style.background = '#ff66ff'
  } else if (score > 89 && score < 99) {
    pace = 650
    document.getElementById("level").innerHTML = 10;
    document.body.style.background = '##ffff66'
  }

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * 21) + 1,
    y: Math.floor(Math.random() * 21) + 1
  }
}

function outsideGrid(position) {
  return (
    position.x < 1 || position.x > 21 ||
    position.y < 1 || position.y > 21
  )
}

function expandSnake(amount) {
  newSegments += amount
}

function updateFood() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition()
    score++;
    document.getElementById("score").innerHTML = score;
  }
}

function drawFood(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}
let food = getRandomFoodPosition()
function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}

function updateSnake() {
  addSegments()
  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }
  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }
  newSegments = 0
}

function drawSnake(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}

function getSnakeHead() {
  return snakeBody[0]
}

function snakeHead() {
  const x = snakeBody[1]
  document.getElementById("x").innerHTML = score;
}

function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true })
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1 }
      break
    case 'ArrowDown':
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1 }
      break
    case 'ArrowLeft':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0 }
      break
    case 'ArrowRight':
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0 }
      break
  }
})

