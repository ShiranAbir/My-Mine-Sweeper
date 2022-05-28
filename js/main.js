'use strict'

//All the global virables use in the game.
var gValid = [];
var gLevels = [{ 'level': 'ROOKIE', 'SIZE': 4, 'MINES': 2, 'Lives': 2 },
{ 'level': 'SERGEANT', 'SIZE': 8, 'MINES': 12, 'Lives': 3 },
{ 'level': 'MONSTER', 'SIZE': 12, 'MINES': 30, 'Lives': 3 }];
var gGameElements = [];
var gMINE_IMG = '<img class="bomb" src="img/4.png" />';
var gAlive_IMG = '<img onclick="restartGame(); playGoSound()" class="smiley" src="img/normal.png" />';
var gDead_IMG = '<img onclick="restartGame(); playGoSound()" class="smiley" src="img/dead.png" />';
var gWin_IMG = '<img onclick="restartGame(); playGoSound()" class="smiley" src="img/win.png" />';
var gHintOn_IMG = '<img class="hint-on" src="img/on.png" />';
var gHintOff_IMG = '<img class="hint-off" src="img/off.png" />';
var gBoomSound = document.getElementById("audio1");
var gSighSound = document.getElementById("audio2");
var gYesSound = document.getElementById("audio3");
var gBoard = [];
var gIsGameOver = false;
var gIsWin = false;
var isHint = false;
var gSafeCells = []
var gHints = 3
var gSafeClicks = 3
var gMines = [];
var gValids = [];
var gIsTimer = true
var gStartGame = true;
var gTimerInterval
var gUserLevel = { 'level': 'ROOKIE', 'SIZE': 4, 'MINES': 2, 'Lives': 2 }
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: gUserLevel.Lives,
}

//The function that starts when page load.
//Also restarts the global Virables.
function initGame() {
    gStartGame = true;
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        lives: gUserLevel.Lives,
    }
    gHints = 3
    gIsWin = false;
    gIsGameOver = false;
    gSafeCells = [];
    showSmiley()
    gGameElements = [];
    gMines = [];
    gValids = [];
    showLives()
    renderHints()
    gBoard = createBoard(+gUserLevel.SIZE, +gUserLevel.SIZE);
    renderBoard(gBoard);
}











