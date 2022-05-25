'use strict'


// gBoard[2][2] = { 'isShown': true, 'isMine': true, 'minesAroundCount': 0, 'isMarked': false }
// gBoard[3][3] = { 'isShown': true, 'isMine': true, 'minesAroundCount': 0, 'isMarked': false }


function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }     
    return array;
 }

function timer() {
    var startTime = Date.now();
    gTimerInterval = setInterval(function () {
        var elapsedTime = Date.now() - startTime;
        document.getElementById("counter").innerText = (elapsedTime / 1000).toFixed(0);
    }, 1);
}