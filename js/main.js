'use strict'

var gValid = [];
var gLevels = [{ 'level': 'ROOKIE', 'SIZE': 4, 'MINES': 2 },
{ 'level': 'SERGEANT', 'SIZE': 8, 'MINES': 12 },
{ 'level': 'MONSTER', 'SIZE': 12, 'MINES': 30 }];
var gGameElements = [];
var gMINE_IMG = '<img class="bomb" src="img/4.png" />';
var gAlive_IMG = '<img class="smiley" src="img/normal.png" />';
var gDead_IMG = '<img class="smiley" src="img/dead.png" />';
var gWin_IMG = '<img class="smiley" src="img/win.png" />';
var gBoard = [];
var gIsGameOver = false;
var gIsWin = false;
var gMines = [];
var gValids = [];
var gIsTimer = true
var gStartGame = true;
var gTimerInterval
var gUserLevel = { 'level': 'ROOKIE', 'SIZE': 4, 'MINES': 2 }
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 2,
}

function initGame() {
    gStartGame = true;
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        lives: 2,
    }
    gIsWin = false;
    gIsGameOver = false;
    showSmiley()
    gGameElements = [];
    gMines = [];
    gValids = [];
    showLives()
    gBoard = createBoard(+gUserLevel.SIZE, +gUserLevel.SIZE);
    renderBoard(gBoard);
}


function getUserLevel(level) {
    var currLevel
    for (var i = 0; i < gLevels.length; i++) {
        currLevel = gLevels[i];
        if (currLevel.level === level.innerText) {
            gUserLevel = currLevel
            clearInterval(gTimerInterval)
            gIsTimer = true
            document.getElementById("counter").innerText = 0;
            restartGame()
            return
        }
    }
}

function showSmiley() {
    var elSmiley = document.getElementById('smiley')
    if (gIsGameOver) {
        elSmiley.innerHTML = gDead_IMG
    } else if (gIsWin) {
        elSmiley.innerHTML = gWin_IMG
    } else {
        elSmiley.innerHTML = gAlive_IMG
    }
}








