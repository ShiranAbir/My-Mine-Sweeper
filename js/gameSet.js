'use strict'

//Restarts the game by clearing the timer interval, set gIsTimer to true,
//set the best score alert, set the timer to 0 and call initGame().
function restartGame() {
    clearInterval(gTimerInterval)
    gIsTimer = true
    gSafeCells = []
    gSafeClicks = 3
    gHints = 3
    gSafeCells = 3
    document.getElementById('counter').innerText = 0;
    document.getElementById('button-safe-cell').innerText = '3 SAFE!'
    initGame()
}

//Checks is the last click was a win click by checking if the marked cells is equal to
//the mines - the level lives - gGame.lives and if the cells count is equal to the shown cells + marked cells.
function checkWin() {
    var cellsCount = gUserLevel.SIZE * gUserLevel.SIZE;
    if (gGame.markedCount === gUserLevel.MINES - (gUserLevel.Lives - gGame.lives) &&
        cellsCount === gGame.shownCount + gGame.markedCount) {
        gYesSound.play()
        gIsWin = true;
        gameEnd()
        return
    }
}

//Checks if the the currcell is a mine and decreases live.
// Check if the user is out of lives and finish the game.
function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            if ((currCell.isShown) && (currCell.isMine && (!currCell.clickedMine))) {
                currCell.clickedMine = true
                gGame.lives--;
                if (gGame.lives === 0) {
                    gBoomSound.play()
                    gIsGameOver = true
                    gameEnd()
                } else {
                    gSighSound.play()
                }
                return
            }
        }
    }
}

//Finish the game when win or game over.
function gameEnd() {
    showMines()
    showSmiley()
    clearInterval(gTimerInterval)
    gGame.isOn = false
    gStartGame = true;
    alertScore()
}

//Sets isHint to true when HINT! push.
//Check if the user have Hint to use.
function setHint() {
    if (!gHints) return
    var audio = document.getElementById('audio6')
    audio.play()
    isHint = true
    renderHints()
}

// Check if isHint and show the clicked cell and its neighbors for a second.
function showHint(elCell) {
    if (!isHint) return
    var cellPos = elCell.id.split('-');
    if (gStartGame) {
        firstCellClicked([cellPos[0]], [cellPos[1]])
    }
    var hintedCells = [];

    // pushes the current clicked cell, because it's already shown
    hintedCells.push({ i: cellPos[0], j: cellPos[1] })

    for (var i = +cellPos[0] - 1; i <= +cellPos[0] + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = +cellPos[1] - 1; j <= +cellPos[1] + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isShown === true) continue;
            gBoard[i][j].isShown = true
            hintedCells.push({ i, j })
        }
    }
    renderBoard(gBoard)
    setTimeout(() => {
        for (var i = 0; i < hintedCells.length; i++) {
            var currCell = hintedCells[i];
            gBoard[currCell.i][currCell.j].isShown = false;
        }
        renderBoard(gBoard)
    }, 1000);
    isHint = false;
    gHints--
    renderHints()
}

//render the live amount to the screen using HTML string.
function renderHints() {
    var strHTML = '';
    var elHintBtn = document.getElementById('button-hint');
    if (+gHints > 0) {
        if (!isHint) {
            strHTML += gHintOff_IMG.repeat(+gHints);
        } else {
            strHTML += gHintOff_IMG.repeat(+gHints - 1);
            strHTML += gHintOn_IMG.repeat(1);
        }
    } else {
        strHTML = '0'
    }
    elHintBtn.innerHTML = strHTML;
}

//Makes an array of all non-mine cells, then randomizes it.
function getRandSafeCells() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine === false) {
                gSafeCells.push({ i, j });
            }
        }
    }
    shuffle(gSafeCells)
}

//Pop safe cell from the randomize safe cells array.
//Checks if it was already shown, if so pops another one.
//Then adds a 'safe-cell' class for 3 seconds to hint it. 
function showSafeCell() {
    if (!gSafeClicks) return
    if (gStartGame) return
    if (gSafeCells.length === 0) return
    var safeCell = gSafeCells.pop();
    while (gBoard[safeCell.i][safeCell.j].isShown === true) {
        if (gSafeCells.length === 0) return
        safeCell = gSafeCells.pop();
    }
    gSafeClicks--
    renderSafeClicks()
    var audio = document.getElementById('audio7')
    audio.play();
    var elCell = document.getElementById(`${safeCell.i}-${safeCell.j}`);
    elCell.classList.add('safe-cell');
    setTimeout(() => {
        elCell.classList.remove('safe-cell');
    }, 3000);
}

//render the safe click amount to the screen using HTML string.
function renderSafeClicks() {
    var elSafeBtn = document.getElementById('button-safe-cell');
    elSafeBtn.innerText = gSafeClicks + ' SAFE!'
}

//Play go when click the smiley.
function playGoSound() {
    var audio = document.getElementById('audio5')
    audio.play()
}

//Get the users level from the buttons and restart the timer.
function getUserLevel(level) {
    var currLevel
    for (var i = 0; i < gLevels.length; i++) {
        currLevel = gLevels[i];
        if (currLevel.level === level.innerText) {
            gUserLevel = currLevel
            clearInterval(gTimerInterval)
            gIsTimer = true
            document.getElementById("counter").innerText = 0;
            restartGame();
            return;
        }
    }
}

//Keep the best score by level in local storage.
function setBestScore() {
    var timeScore = document.getElementById("counter").innerText;
    var level = gUserLevel.level
    if (level === 'ROOKIE') {
        if (localStorage.timeScore1) {
            if (+localStorage.timeScore1 > +timeScore) {
                localStorage.timeScore1 = timeScore;
                return true;
            }
        } else {
            localStorage.timeScore1 = timeScore;
            return true;
        }
    }
    if (level === 'SERGEANT') {
        if (localStorage.timeScore2) {
            if (+localStorage.timeScore2 > +timeScore) {
                localStorage.timeScore2 = timeScore;
                return true;
            }
        } else {
            localStorage.timeScore2 = timeScore;
            return true;
        }
    }
    if (level === 'MONSTER') {
        if (localStorage.timeScore3) {
            if (+localStorage.timeScore3 > +timeScore) {
                localStorage.timeScore3 = timeScore;
                return true;
            }
        } else {
            localStorage.timeScore3 = timeScore;
            return true;
        }
    }

    
    return false;
}

//Gets best score by level for local storage.
function getBestScore() {
    var level = gUserLevel.level
    if (level === 'ROOKIE') {
        return localStorage.timeScore1
    }
    if (level === 'SERGEANT') {
        return localStorage.timeScore2   
    }
    if (level === 'MONSTER') {
        return localStorage.timeScore3     
    }
}

//Alert the best score.
function alertScore() {
    if (!gIsWin) return
    if (setBestScore()) {
        alert('Well done soldier! Your score was the best: ' + getBestScore());
    } else {
        alert('Didn\'t you eat breakfast today, soldier?! The best score is: ' + getBestScore())
    }    
}