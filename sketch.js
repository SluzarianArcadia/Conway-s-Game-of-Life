var cols = 15
var rows = 10
var canvasWidth = window.innerWidth - 200;
var canvasHeight = window.innerHeight - 200;
var board = Array.from(Array(10), () => new Array(15));
var next = Array.from(Array(10), () => new Array(15));



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
    // board = findNeighbors(board)
    // board = evaluateFitnessOfCell(board)


    // renderGeneration(board)
}

function windowResized() {
    cnvRe = resizeCanvas(window.innerWidth - 200, window.innerHeight - 200);
    background(255, 0, 200);
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
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === 0) {
                fill(255)
            } else {
                fill(0)
            }
             next[i][j] = rect(canvasWidth/cols * j, canvasHeight/rows * i, (canvasWidth/cols), (canvasHeight/rows))               
        }
    }
}


function findNeighbors(board){
    var aliveCells, topLeft ,top ,topRight , right, rightBot, bot, leftBot, left;
    next = Array.from(Array(10), () => new Array(15));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            aliveCells = topLeft =top =topRight =right =rightBot =bot =leftBot =left =0;


            topLeft =  board[(i-1+10) % 10][(j-1 +15) % 15]
            top =      board[(i-1+10) % 10][j]
            topRight =  board[(i-1+10) % 10][(j+1 +15) % 15]
            right =     board[i][(j+1 +15) % 15]
            rightBot =  board[(i+1+10) % 10][(j+1 +15) % 15]
            bot  =      board[(i+1+10) % 10][j]
            leftBot =   board[(i+1+10) % 10][(j-1 +15) % 15]
            left =      board[i][(j-1 +15) % 15]


            var spacer = topLeft + top +topRight + right + rightBot + bot + leftBot + left;
            next[i][j] = spacer
            
        }
    }

    return next 
}

function evaluateFitnessOfCell (board){
    next = Array.from(Array(10), () => new Array(15));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            selectedCell = board[i][j]
            console.log(selectedCell)
            if (selectedCell < 2 || selectedCell > 3) {
                next[i][j] = 0
            } else {
                next[i][j] = 1
            }
            

        }
    }
    console.log(next)
 return next;
}