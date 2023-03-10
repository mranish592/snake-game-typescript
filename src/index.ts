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

setSnakeHead()


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
}
// console.log(board?.ATTRIBUTE_NODE)

