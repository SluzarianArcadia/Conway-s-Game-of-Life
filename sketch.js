var cols = 50;
var rows = 50;
console.log(cols)
console.log(rows)

var canvasWidth = window.innerWidth - 150;
var canvasHeight = window.innerHeight - 150;
var board = Array.from(Array(rows), () => new Array(cols));
var renderingBoard = Array.from(Array(rows), () => new Array(cols));
var counter = 0;
var next = Array.from(Array(rows), () => new Array(cols));

const colsInput = document.getElementById('cols');
const rowsInput = document.getElementById('rows');

colsInput.addEventListener('change', updateValue);
rowsInput.addEventListener('change', updateValue);


function updateValue(e) {
    console.log(e.target.value)
    console.log(e.target.id)
    e.target.id = e.target.value
  }


function setup(){
idNum = document.getElementById('generationsNum');
var cnv = createCanvas(canvasWidth, canvasHeight)
var x = (windowWidth - width) / 2;
var y = (windowHeight - height) +200;
cnv.position(x, y);
background(255, 255, 255);
renderGeneration(getRandomCells(board));

}

 function draw(){
    next = Array.from(Array(rows), () => new Array(cols));
    board = evaluateFitnessOfCell(findNeighbors(board,next),board, next)
    renderGeneration(board)
    idNum.innerHTML = "Total Number of Generations: " + counter++;
}


  function getRandomCells(board){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            var rand = Math.random() < 0.5;
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
    
    generationColor1 = Math.floor(Math.random() * 256);
    generationColor2 = Math.floor(Math.random() * 256);
    generationColor3 =  Math.floor(Math.random() * 256);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            translate(i+j);

            if (board[i][j] === 0) {
                fill(generationColor1, generationColor2, generationColor3, 60)
            } else {
                fill(generationColor1, generationColor2, generationColor3)
            }
            renderingBoard[i][j] = rect(canvasWidth/cols * j, canvasHeight/rows * i, (canvasWidth/cols), (canvasHeight/rows))   
        }
    }
}


function findNeighbors(board){

    // var testBoard = Array.from(Array(rows), () => new Array(cols));
        var loopingSum = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            // for (let k = -1; k < 2; k++) {
            //     for (let p = -1; p < 2; p++) {
            //         console.log("this is k  " + k + "and this is p  " + p)
            //         loopingSum = loopingSum + board[i][j]
            //     }
                
            // }

            var topLeft =   board[(i-1+rows) % rows][(j-1 +cols) % cols]
            var top =       board[(i-1+rows) % rows][j]
            var topRight =  board[(i-1+rows) % rows][(j+1 +cols) % cols]

            var left =      board[i][(j-1 +cols) % cols]


            var right =     board[i][(j+1 +cols) % cols]
            var rightBot =  board[(i+1+rows) % rows][(j+1 +cols) % cols]
            var bot  =      board[(i+1+rows) % rows][j]
            var leftBot =   board[(i+1+rows) % rows][(j-1 +cols) % cols]

            next[i][j] = topLeft + top +topRight + right + rightBot + bot + leftBot + left;
            
        }
    }
    return next 
}

function evaluateFitnessOfCell (neighborBoard, board, next){
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


function windowResized() {
    resizeCanvas(window.innerWidth - 150, window.innerHeight - 150);
  }