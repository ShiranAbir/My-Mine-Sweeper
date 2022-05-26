'use strict'


//Creates the mines using the gUserLevel to know the amount.
function createMines(gUserLevel) {
    for (var i = 0; i < gUserLevel.MINES; i++) {
        var mine = true
        gMines.push(mine)
    }
}

//Set the mine neighbors amount it to the cells data.
function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var amount = countNeighbors(i, j, board)
            board[i][j].minesAroundCount = amount
        }
    }
}

//Count the mine neighbors of the cell.
function countNeighbors(cellI, cellJ, board) {
    var minesNegsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;

            if (board[i][j].isMine === true) minesNegsCount++;
        }
    }
    return minesNegsCount;
}

//Show all the mines when game is over.
function showMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            currCell = gBoard[i][j];
            if (currCell.isMine) {
                currCell.isShown = true
                renderBoard(gBoard);
            }
        }
    }

}