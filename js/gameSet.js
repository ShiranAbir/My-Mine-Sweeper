'use strict'

function restartGame() {
    clearInterval(gTimerInterval)
    gIsTimer = true
    document.getElementById("counter").innerText = 0;
    initGame()
}

function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            if ((currCell.isShown) && (currCell.isMine && (!currCell.clickedMine))) {
                currCell.clickedMine = true
                gGame.lives--;
                if (gGame.lives === 0) {
                    clearInterval(gTimerInterval)
                    gGame.isOn = false
                    showMines()
                    gIsGameOver = true
                    showSmiley()
                    gStartGame = true
                    return
                }
            }
        }
    }
}

function checkWin() {
    var cellsCount = gUserLevel.SIZE * gUserLevel.SIZE;
    if (gGame.markedCount === gUserLevel.MINES - (2 - gGame.lives) && cellsCount === gGame.shownCount + gGame.markedCount) {
        clearInterval(gTimerInterval)
        gGame.isOn = false
        showMines()
        gIsWin = true;
        showSmiley()
        gStartGame = true;
        return
    }
}