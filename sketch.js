var cols = 15
var rows = 10
var canvasWidth = window.innerWidth - 200;
var canvasHeight = window.innerHeight - 200;
var board = Array.from(Array(cols), () => new Array(rows));

console.log(board)

function setup(){
var cnv = createCanvas(canvasWidth, canvasHeight)
var x = (windowWidth - width) / 2;
var y = (windowHeight - height) / 2;
cnv.position(x, y);
background(255, 0, 200);

board = fillBoardRandomly(board)
}


function draw(){
evaluateState(board)

}

function windowResized() {
    cnvRe = resizeCanvas(window.innerWidth - 200, window.innerHeight - 200);
    background(255, 0, 200);
  }



  function fillBoardRandomly(){
    var isAlive = Math.random() < 0.5;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
                board[i][j] = rect(canvasWidth/cols * i, canvasHeight/rows * j, (canvasWidth/cols), (canvasHeight/rows))               
            var isAlive = Math.random() < 0.5;
            if (isAlive) {
                fill(255)
            } else {
                fill(0)
            }
        }
    }
    return board;
  }



function evaluateState (board){
console.log(board)

}