'use strict'

var gValid = [];
var gLevels = [ { 'level': 'Beginner', 'SIZE': 4, 'MINES': 2 },
                { 'level': 'Medium', 'SIZE': 8, 'MINES': 12 },
                { 'level': 'Expert', 'SIZE': 12, 'MINES': 30 }];
var gGameElements = [];
var gMINE_IMG = '💣';
var gBoard = [];
var gMines = [];
var gValids = [];
var gIsTimer = true
var gTimerInterval
var gUserLevel = { 'level': 'Beginner', 'SIZE': 4, 'MINES': 2 }
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
}


function initGame() {
    gGame.isOn = true
    createElements(gGameElements);
    gBoard = createBoard(+gUserLevel.SIZE, +gUserLevel.SIZE);
    console.table(gBoard);
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
}

function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            if ((currCell.isShown) && (currCell.isMine)) {
                clearInterval(gTimerInterval)
                gGame.isOn = false
                showMines()
                return
            }
        }
    }
}

function checkWin() {
    var cellsCount = gUserLevel.SIZE * gUserLevel.SIZE;
    console.log(cellsCount);
    if (gGame.markedCount === gUserLevel.MINES && gGame.shownCount === cellsCount - gUserLevel.MINES) {
        clearInterval(gTimerInterval)
        gGame.isOn = false
        showMines()
        return
    }
}

function getUserLevel(level){
    var currLevel
    for (var i = 0 ; i < gLevels.length;i++){
        currLevel = gLevels[i];
        if (currLevel.level === level.innerText){
            gUserLevel = currLevel
            initGame()
            return
        }
    }
}




