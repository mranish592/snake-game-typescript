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

let board = document.getElementById('board')
if(board != null) initialiseBoard(board)

let currentSnakePosition = setSnakeHead()
document.getElementById("start")?.addEventListener("click", move)


function initialiseBoard(board: HTMLElement){
  console.log("BOARD INITIALISING...")
  for (let i = 0; i < NUMBER_OF_CELLS; i++) {
    let rowCell = document.createElement('div')
    rowCell.className = "row-cell"
    for (let j = 0; j < NUMBER_OF_CELLS; j++) {
      let cell = document.createElement('div')
      cell.className = "cell"
      cell.id = setId(i,j)
      rowCell.appendChild(cell)
    }
    board.appendChild(rowCell)
  }
  console.log("BOARD INITIALISED!")
}

function setId(i: number, j: number): string{
  return i.toString() + "-" + j.toString()
}

function getId(id: string): string[]{
  return id.split('-')
}


function setSnakeHead() {
  let snakeStartRow = Math.floor(Math.random()*(NUMBER_OF_CELLS))
  let snakeStartCol = Math.floor(Math.random()*(NUMBER_OF_CELLS))
  console.log(setId(snakeStartRow, snakeStartCol))
  let startCell = document.getElementById(setId(snakeStartRow, snakeStartCol))
  if(startCell != null) startCell.style.background = "green"
  return startCell?.id
}

function move() {
  console.log("hello")
  if(currentSnakePosition == null)
    return

  let elem = document.getElementById(currentSnakePosition);
  if(elem == null)
    return
  
  let pos = 0;
  let id = setInterval(frame, 50);

  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      if(currentSnakePosition == null)
        return
      elem = document.getElementById(currentSnakePosition);
      if(elem == null)
        return
      let coord = getId(elem!!.id)
      let x = Number(coord[0])
      let y = Number(coord[1])
      let x_new:number = (x+1) % NUMBER_OF_CELLS
      let y_new:number = (y+1) % NUMBER_OF_CELLS
      
      elem.style.backgroundColor = "#1a1a1a"
      currentSnakePosition = setId(x_new, y_new)
      let newElement = document.getElementById(currentSnakePosition)
      if(newElement == null)
        return
      newElement.style.backgroundColor = "green"
      console.log(currentSnakePosition)
    
      // elem.style.top = pos + 'px';
      // elem.style.left = pos + 'px';
    }
  }
  
}


// console.log(board?.ATTRIBUTE_NODE)

