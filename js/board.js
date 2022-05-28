'use strict'
//Creats the board that holds the data about every cell.
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

//Render the board to the page using HTML table.
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
                    strHTML += `<td id="${i}-${j}" class="notShown" oncontextmenu= "cellMarked(this);return false;" onclick="cellClicked(this,${i},${j}); showHint(this)"></td>`
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

//Get the cell clicked and check for mine, win or lose. also starts the timer when first cell is clicked.
function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gIsTimer) {
        timer()
        gIsTimer = false
    }
    if (isHint) return
    if (gBoard[i][j].isMarked) return
    if (gBoard[i][j].isShown) return
    gBoard[i][j].isShown = true;
    if (gStartGame) {
        firstCellClicked(i, j)
    } else {
        renderBoard(gBoard);
    }
    gGame.shownCount++

    if (gBoard[i][j].minesAroundCount === 0 && gBoard[i][j].isMine === false) {
        showNeighbors(i, j)
    }
    checkGameOver()
    showLives()
    if (gGame.isOn) {
        checkWin()
    }
}
//Using createMines(),createValids() and shuffle() to create an array of true and false.
//This true and false will be the value for 'isMine' in the cells.
//Also shuffles the array so the first cell clickes won't be a mine.
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

//Mark the cell by flag if the user clicks right click on a cell and check for win.
//Counting to the global variable gGame the number of marked cells.
//Also starts the timer if thats the first cell clicked.
function cellMarked(elCell) {
    if (!gGame.isOn) return;
    if (gIsTimer) {
        timer()
        gIsTimer = false
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
    checkWin()
}

//Showing the neighbors of a non-mine-neighbors cell.
function showNeighbors(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isShown === true) continue;

            cellClicked(null, i, j)
        }
    }
}

//To make sure that the first cell clicked won't be a mine, it place the mines and 
//count the neighbors only when first cell clicked. 
function firstCellClicked(i, j) {
    createElements(i, j);
    gBoard = createBoard(+gUserLevel.SIZE, +gUserLevel.SIZE);
    gBoard[i][j].isShown = true;
    setMinesNegsCount(gBoard);
    renderBoard(gBoard)
    gStartGame = false
}