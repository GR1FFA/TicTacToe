let board;
const playerOne = 'O';
const computer = 'X';
    //Combination to win
const winCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
    [0, 3, 6], 
    [1, 5, 7], 
    [2, 6, 8]
];

let cells = document.querySelectorAll(".cell");
startGame();

function startGame(){
    document.querySelector(".endgame").style.display = "none";
        //creates an array from that array keys = 0-9
    board = Array.from(Array(9).keys());
     for (let i = 0; i < cells.length; i++) {
        //set to null to remove X's & O's
        cells[i].innerText = '';   
        //Remove highlights when someone wins
        cells[i].style.removeProperty("background-color");
        //Create turn function when "click" is active
        cells[i].addEventListener("click", turnClick, false);
     }
}

    //detect cell id when clicked (squareId)
function turnClick(square) {
    if (typeof board[square.target.id] == "number") {
        turn(square.target.id, playerOne);
        //checks tie
        if (!checkTie()) turn(bestSpot(), computer);
    }
    
}

    //turn function
function turn(squareId, player) {
    //squareId is now player's value
    board[squareId] = player;
    //now display
    document.getElementById(squareId).innerText = player;
    //check each play is a win or not
    let gameWin = checkWin(board, player)
    if (gameWin) gameOver(gameWin)
}
    //define checkWin function
function checkWin(board, player) {
        //go through every element in the board array and give back 1 value //a = accumulator  e = element  i = index
        let plays = board.reduce((a, e, i) => 
        //find the index the player has played in 
        (e === player) ? a.concat(i) : a, []);
        let gameWin = null;
        //check if game as been won
        for (let [index, win] of winCombos.entries()) { 
            // Loop every combo
            if (win.every(elem => plays.indexOf(elem) > -1)) { //Has the player played in every spot that counts as a win
            gameWin = {index: index, player: player};  //define which player and which combo
            break;
        }
        
    }
    return gameWin;
}

    //function for gameOver
function gameOver(gameWin) {
        //go through every index of the winCombos
        for (let index of winCombos [gameWin.index]) {
            document.getElementById(index).style.backgroundColor = //setting the background color will  depend on who won
                gameWin.player == playerOne ? "blue" : "red";
        }
    //go through every cell to prevent player from clicking that cell anymore
        for (let i = 0; i < cells.length; i++) {
            cells[i].removeEventListener("click", turnClick, false);
        }
        declareWinner(gameWin.player == playerOne ? "You Win!" : "Try Again!")
}
function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}
function emptySquares() {
    return board.filter(s => typeof s == "number");
}
function bestSpot() {
    return emptySquares()[0];
}
function checkTie() {
    if (emptySquares().length == 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener("click", turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}
