'use strict'

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
