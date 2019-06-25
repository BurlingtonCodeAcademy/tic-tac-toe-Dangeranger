const startButton = document.getElementById("start");
const statusArea = document.querySelector(".status");
var gameBoard;

startButton.addEventListener("click", evt => {
  evt.target.disabled = true;
  const gameStatus = document.createElement("p");
  gameStatus.textContent = "Player X's turn";
  statusArea.appendChild(gameStatus);
  setUpBoard();
  console.log('Board is setup!');
});

function setUpBoard() {
  const gameState = document.querySelectorAll('div div div');
  
  gameState.forEach(cell => 
    cell.addEventListener('click', handleClick));

  updateGameBoard(gameState);
}

function handleClick(e) {
  e.target.textContent = 'x';
  const gameState = document.querySelectorAll('div div div');
  updateGameBoard(gameState);
  console.log('clicked cell', e.target);
  console.log({gameBoard});
  console.log('winCheck', winCheck(gameBoard));
}

function updateGameBoard(nodeList) {
  let cellValues = []
  nodeList.forEach((node) => cellValues.push(node.textContent))
  if (gameBoard === undefined) {
    gameBoard = new Board(cellValues);
  } else {
    gameBoard.updateCells(cellValues)
  }
  console.log(gameBoard);
}

class Board {
  constructor(cells) {
    this.updateCells(cells);
  }

  updateCells(listOfCells) {
    let rowOne   = listOfCells.slice(0, 3);
    let rowTwo   = listOfCells.slice(3, 6);
    let rowThree = listOfCells.slice(6, 9);
    this.cells = [rowOne, rowTwo, rowThree];
  }

  column(number) {
    number = number - 1;
    return [
      this.cells[0][number],
      this.cells[1][number],
      this.cells[2][number],
    ];
  }

  row(number) {
    number = number - 1;
    return this.cells[number];
  }

  diagonal(leftOrRight) {
    if (typeof leftOrRight !== 'string') { return null };
    if (leftOrRight === "left") {
      return [
        this.cells[0][0],
        this.cells[1][1],
        this.cells[2][2],
      ];
    } else {
      return [
        this.cells[0][2],
        this.cells[1][1],
        this.cells[2][0],
      ];
    }
  }
}

// console.log({winner: winCheck(gridOne)});

function winCheck(board) {
  let result = runWin(board, 'column') || 
               runWin(board, 'row')    ||
               runWin(board, 'diagonal')
  return result;
}

function runWin(board, run) {
  let allCells = (run === 'diagonal') ?
    [ board[run]('left'), board[run]('right') ] :
    [ board[run](1), board[run](2), board[run](3)];

  let winOrLoss = false;
  for (let index = 0; index < allCells.length; index++) {
    const theRun = allCells[index];
    const mark = theRun[0];
    if (mark === '') { return winOrLoss }
    winOrLoss = theRun.every(function(move) {
      return move === mark;
    });
    if (winOrLoss) { return winOrLoss; }
  }
  return winOrLoss;
}

function arrayCompare(first, second) {
  if (first.length !== second.length) { return false; }
  for (let index = 0; index < first.length; index++) {
    const firstValue = first[index];
    const secondValue = second[index];
    if (firstValue !== secondValue) { return false; }
  }
  return true;
}

function assertTrue(message, value) {
  if (typeof value === 'function') {
    value = value();
  }
  if (value) {
    console.log(`Success: ${message}`);
    return true;
  } else {
    console.log(`Failure: ${message}`);
    return false;
  }
}
