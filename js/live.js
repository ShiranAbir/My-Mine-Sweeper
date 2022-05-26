'use strict'

//render the live amount to the screen using HTML string.
function showLives() {
    var strHTML = '';
    var elLiveCon = document.getElementById('live-conteiner');
    if (+gGame.lives > 0) {
        strHTML = '♥'.repeat(+gGame.lives);
    } else {
        strHTML = '0'
    }
    elLiveCon.innerText = strHTML;
}

//Shows thr currect smiley to the screen.
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
