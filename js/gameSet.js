'use strict'

//Restarts the game by clearing the timer interval, set gIsTimer to true,
//set the timer to 0 and call initGame().
function restartGame() {
    clearInterval(gTimerInterval)
    gIsTimer = true
    document.getElementById("counter").innerText = 0;
    initGame()
}


//Also check if the user is out of lives and finish the game.
function checkGameOver() {
    checkStrike()
    if (gGame.lives === 0) {
        gBoomSound.play()
        clearInterval(gTimerInterval)
        gGame.isOn = false
        showMines()
        gIsGameOver = true
        showSmiley()
        gStartGame = true
        return
    }
}


//Checks is the last click was a win click by checking if the marked cells is equal to
//the mines - the level lives - gGame.lives and if the cells count is equal to the shown cells + marked cells.
function checkWin() {
    var cellsCount = gUserLevel.SIZE * gUserLevel.SIZE;
    if (gGame.markedCount === gUserLevel.MINES - (gUserLevel.Lives - gGame.lives) && cellsCount === gGame.shownCount + gGame.markedCount) {
        clearInterval(gTimerInterval)
        gGame.isOn = false
        showMines()
        gIsWin = true;
        showSmiley()
        gYesSound.play()
        gStartGame = true;
        return
    }
}

//Checks if the the currcell is a mine and decreases live.
function checkStrike() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            if ((currCell.isShown) && (currCell.isMine && (!currCell.clickedMine))) {
                currCell.clickedMine = true
                gGame.lives--;
                gSighSound.play()

            }
        }
    }
}