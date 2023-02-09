var cols = 46;
var rows = 20;

var canvasWidth = window.innerWidth - 150;
var canvasHeight = window.innerHeight - 150;

var counter = 0;
var board = Array.from(Array(rows), () => new Array(cols));
var RENDERBoard = Array.from(Array(rows), () => new Array(cols));
var next = Array.from(Array(rows), () => new Array(cols));

function setup(){
frameRate(3);
idNum = document.getElementById('generationsNum');
cnv = createCanvas(canvasWidth, canvasHeight)
var x = (windowWidth - width) / 2;
var y = (windowHeight - height) + 100;
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
                    if (board[i][j] === 0) {
                        fill(generationColor1, generationColor2, generationColor3, 60)
                    } else {
                        fill(generationColor1, generationColor2, generationColor3)
                    }
                    RENDERBoard[i][j] = rect(canvasWidth/cols * j, canvasHeight/rows * i, (canvasWidth/cols), (canvasHeight/rows),180,180,180,180)   
                }
            }
}

function findNeighbors(board,next){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            var loopingSum = 0;
            for (let k = -1; k < 2; k++) {
                for (let p = -1; p < 2; p++) {
                    loopingSum = loopingSum + board[((i+k)+rows) % rows][((j+p)+cols) % cols]
                }
            }
            next[i][j] = loopingSum- board[i][j];
        }
    }
    return next 
}

function evaluateFitnessOfCell (neighborBoard, board, next){
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (board[i][j] == 0 && neighborBoard[i][j] == 3) {
                    next[i][j] = 1;
                } else if (board[i][j] == 1 && (neighborBoard[i][j] < 2 || neighborBoard[i][j] > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = board[i][j];
                }
            }
        }
     return next;
}


function windowResized() {
    resizeCanvas(window.innerWidth - 250, window.innerHeight - 250);
  }

