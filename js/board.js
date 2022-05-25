'use strict'

function createBoard(ROWS, COLS) {
    var board = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            var isMine = gGameElements.pop()
            row.push({ 'isShown': false, 'isMine': isMine, 'minesAroundCount': 0, 'isMarked': false })
        }
        board.push(row)
    }

    return board
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (currCell.isShown === false) {
                if (currCell.isMarked) {
                    strHTML += `<td id="${i}-${j}" class="marked" oncontextmenu= "cellMarked(this);return false;" onclick="cellClicked(this,${i},${j})"></td>`
                } else {
                    strHTML += `<td id="${i}-${j}" class="notShown" oncontextmenu= "cellMarked(this);return false;" onclick="cellClicked(this,${i},${j})"></td>`
                }
                continue
            }
            strHTML += `<td onclick="cellClicked(this,${i},${j})"`

            if (currCell.isMine === true) {
                strHTML += `class="cell mine" >${gMINE_IMG}`;

            } else {
                if (currCell.minesAroundCount === 0) strHTML += `class="cell valid">`
                else strHTML += `class="cell valid">${currCell.minesAroundCount}`;
            }

            strHTML += '</td>';
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


//TODO: Add timer start for right click!
function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gIsTimer) {
        timer()
    }
    if (gBoard[i][j].isMarked) return
    gBoard[i][j].isShown = true;
    renderBoard(gBoard)
    checkGameOver()
    checkWin()
    gGame.shownCount++
    gIsTimer = false
}

function createElements() {
    createMines(gUserLevel);
    createValids(gUserLevel);
    gGameElements.push(...gMines);
    gGameElements.push(...gValids);
    shuffle(gGameElements);
}


function cellMarked(elCell) {
    if (!gGame.isOn) return;
    if (gIsTimer) {
        timer()
    }
    var cellPos = elCell.id.split('-');
    var cellI = +cellPos[0];
    var cellJ = +cellPos[1];
    if (gBoard[cellI][cellJ].isMarked) {
        gBoard[cellI][cellJ].isMarked = false;
        gGame.markedCount--

    } else {
        gBoard[cellI][cellJ].isMarked = true;
        gGame.markedCount++
    }
    renderBoard(gBoard)
    gIsTimer = false
}