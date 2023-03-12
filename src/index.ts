/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });

const NUMBER_OF_CELLS = 24

let board = document.getElementById('board') as HTMLElement
if(board != null) initialiseBoard(board)


let score = 0
let speed = 1
let currentSnakePosition = setSnakeHead()
let snakeBodyCells = [currentSnakePosition]

let currentFoodPosition = Math.floor(Math.random()*(NUMBER_OF_CELLS)*NUMBER_OF_CELLS)
setFoodPosition()
let directionVector: number[] = [0,1]
let stopGame = true

document.getElementById("start")?.addEventListener("click", move)
document.addEventListener("keydown", function(event){
  console.log(event.code)
  changeDirection(event.code)
})

document.getElementById("stop")?.addEventListener("click", function(event){
  stopGame = true
  console.log(stopGame)
})

function changeDirection(code: string){
  switch(code){
    case "ArrowUp": {
      console.log("direction should be up")
      directionVector = [-1,0]
      break
    }
    case "ArrowDown": {
      console.log("direction should be down")
      directionVector = [1,0]
      break
    }
    case "ArrowRight": directionVector = [0,1]; break;
    case "ArrowLeft": directionVector = [0,-1]; break; 
    default: break;
  }
  console.log(directionVector)
}

function initialiseBoard(board: HTMLElement){
  console.log("BOARD INITIALISING...")
  for (let i = 0; i < NUMBER_OF_CELLS; i++) {
    let rowCell = document.createElement('div')
    rowCell.className = "row-cell"
    for (let j = 0; j < NUMBER_OF_CELLS; j++) {
      let cell = document.createElement('div')
      cell.className = "cell"
      cell.id = setId(i,j).toString()
      rowCell.appendChild(cell)
    }
    board.appendChild(rowCell)
  }
  console.log("BOARD INITIALISED!")
}

function setId(i: number, j: number): number{
  return i*(NUMBER_OF_CELLS) + j
}

function getId(id: string): number[]{
  return [Math.floor(Number(id)/(NUMBER_OF_CELLS)), Math.floor(Number(id)%(NUMBER_OF_CELLS))]
}

function setFoodPosition(){
  let foodId: number
  do{
    let foodRow = Math.floor(Math.random()*(NUMBER_OF_CELLS))
    let foodColumn = Math.floor(Math.random()*(NUMBER_OF_CELLS))
    foodId = setId(foodRow, foodColumn)
  } 
  while(snakeBodyCells.includes(foodId))

  let foodCell = document.getElementById(foodId.toString())
  if(foodCell != null) foodCell.style.backgroundColor = "red"
  currentFoodPosition = foodId
  return foodId
}


function setSnakeHead() {
  let snakeStartRow = Math.floor(Math.random()*(NUMBER_OF_CELLS))
  let snakeStartCol = Math.floor(Math.random()*(NUMBER_OF_CELLS))
  console.log(setId(snakeStartRow, snakeStartCol))
  let startCell = document.getElementById(setId(snakeStartRow, snakeStartCol).toString())
  if(startCell != null) startCell.style.background = "green"
  return setId(snakeStartRow, snakeStartCol)
}

function move() {
  console.log("hello")
  stopGame = false
  score = 0
  if(currentSnakePosition == null)
    return

  let elem = document.getElementById(currentSnakePosition.toString());
  if(elem == null)
    return
  
  let pos = 0;
  let id = setInterval(frame, 100);

  function frame() {
    if (stopGame) {
      clearInterval(id);
    } else {
      pos++;
      if(currentSnakePosition == null)
        return
      elem = document.getElementById(currentSnakePosition.toString());
      if(elem == null)
        return
      let coord = getId(elem!!.id)
      let x = Number(coord[0])
      let y = Number(coord[1])
      let x_new:number = (x+directionVector[0]+NUMBER_OF_CELLS) % NUMBER_OF_CELLS
      let y_new:number = (y+directionVector[1]+NUMBER_OF_CELLS) % NUMBER_OF_CELLS
      
      elem.style.backgroundColor = "green"

      currentSnakePosition = setId(x_new, y_new)
      if(snakeBodyCells.includes(currentSnakePosition)){
        stopGame = true
      }
      snakeBodyCells.push(currentSnakePosition)
      if(currentSnakePosition == currentFoodPosition){
        console.log(setFoodPosition())
        speed = speed + 1
        score = score + 1
        let scoreElem = document.getElementById("score")
        if(scoreElem != null) scoreElem.innerHTML = score.toString()
      } else {
        let tail = snakeBodyCells.shift()
        if(tail != null) document.getElementById(tail.toString())!!.style.backgroundColor = "#1a1a1a"
      }
      
      let newElement = document.getElementById(currentSnakePosition?.toString())
      if(newElement == null)
        return
      newElement.style.backgroundColor = "#37f830"
    
      // elem.style.top = pos + 'px';
      // elem.style.left = pos + 'px';
    }
  }
  
}


// console.log(board?.ATTRIBUTE_NODE)

