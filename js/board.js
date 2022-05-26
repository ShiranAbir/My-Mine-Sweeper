'use strict'

function createBoard(ROWS, COLS) {
    var board = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            var isMine = gGameElements[ROWS * i + j]
            row.push({ 'isShown': false, 'isMine': isMine, 'minesAroundCount': 0, 'isMarked': false, 'clickedMine': false })
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
                    strHTML += `<td id="${i}-${j}" class="marked" oncontextmenu= "cellMarked(this);return false;" onclick="cellClicked(this,${i},${j})">🚩</td>`
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

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gIsTimer) {
        timer()
    }
    if (gBoard[i][j].isMarked) return
    gBoard[i][j].isShown = true;
    if (gStartGame) {
        createElements(i, j);
        gBoard = createBoard(+gUserLevel.SIZE, +gUserLevel.SIZE);
        gBoard[i][j].isShown = true;
        setMinesNegsCount(gBoard);
        renderBoard(gBoard)
        gStartGame = false
    } else {
        renderBoard(gBoard);
    }
    checkGameOver()
    showLives()
    gGame.shownCount++
    gIsTimer = false
    checkWin()
}

function createElements(i, j) {
    gGameElements = [];
    createMines(gUserLevel);
    createValids(gUserLevel);
    gGameElements.push(...gMines);
    gGameElements.push(...gValids);
    shuffle(gGameElements);
    while (gGameElements[gUserLevel.SIZE * i + j] === true) {
        shuffle(gGameElements);
    }
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
    checkWin()
    renderBoard(gBoard)
    gIsTimer = false
}