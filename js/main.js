'use strict'

var gValid = [];
var gLevels = [ { 'level': 'ROOKIE', 'SIZE': 4, 'MINES': 2 },
                { 'level': 'SERGEANT', 'SIZE': 8, 'MINES': 12 },
                { 'level': 'MONSTER', 'SIZE': 12, 'MINES': 30 }];
var gGameElements = [];
var gMINE_IMG = '<img class="bomb" src="img/4.png" />';
var gBoard = [];
var gMines = [];
var gValids = [];
var gIsTimer = true
var gTimerInterval
var gUserLevel = { 'level': 'ROOKIE', 'SIZE': 4, 'MINES': 2 }
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
            clearInterval(gTimerInterval)
            gIsTimer = true
            document.getElementById("counter").innerText = 0;
            initGame()
            return
        }
    }
}




