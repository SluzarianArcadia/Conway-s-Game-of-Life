var cols = 100
var rows = 100
var canvasWidth = window.innerWidth - 200;
var canvasHeight = window.innerHeight - 200;
var board = Array.from(Array(rows), () => new Array(cols));
var board2 = Array.from(Array(rows), () => new Array(cols));
var next = Array.from(Array(rows), () => new Array(cols));
var renderingBoard = Array.from(Array(rows), () => new Array(cols));



function setup(){
var cnv = createCanvas(canvasWidth, canvasHeight)
var x = (windowWidth - width) / 2;
var y = (windowHeight - height) / 2;
cnv.position(x, y);
background(255, 0, 200);

board = getRandomCells(board);
renderGeneration(board);

}


 function draw(){
    neighborBoard = findNeighbors(board)
    board = evaluateFitnessOfCell(neighborBoard,board)
    renderGeneration(board)
 }


  function getRandomCells(board){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            var rand = Math.random() < 0.7;
            if (rand){
                board[i][j] = 1;
            } else {
                board[i][j] = 0;              
            }
            }
        }
        return board;
    }


    
function renderGeneration (board){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === 0) {
                fill(255)
            } else {
                fill(0)
            }
            renderingBoard[i][j] = rect(canvasWidth/cols * j, canvasHeight/rows * i, (canvasWidth/cols), (canvasHeight/rows))               
        }
    }
}


function findNeighbors(board){
    var  topLeft ,top ,topRight , right, rightBot, bot, leftBot, left;
    next = Array.from(Array(rows), () => new Array(cols));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            topLeft =   board[(i-1+rows) % rows][(j-1 +cols) % cols]
            top =       board[(i-1+rows) % rows][j]
            topRight =  board[(i-1+rows) % rows][(j+1 +cols) % cols]
            right =     board[i][(j+1 +cols) % cols]
            rightBot =  board[(i+1+rows) % rows][(j+1 +cols) % cols]
            bot  =      board[(i+1+rows) % rows][j]
            leftBot =   board[(i+1+rows) % rows][(j-1 +cols) % cols]
            left =      board[i][(j-1 +cols) % cols]


            next[i][j] = topLeft + top +topRight + right + rightBot + bot + leftBot + left;
            
        }
    }
    return next 
}

function evaluateFitnessOfCell (neighborBoard, board){
    next = Array.from(Array(rows), () => new Array(cols));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            selectedCell = board[i][j]
            selectedCellNeighbors = neighborBoard[i][j]

            if (selectedCell == 0 && selectedCellNeighbors == 3) {
                next[i][j] = 1;
            } else if (selectedCell == 1 && (selectedCellNeighbors < 2 || selectedCellNeighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = selectedCell;
            }
        }
    }
 return next;
}