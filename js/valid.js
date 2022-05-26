'use strict'

//Creates the valid (non mine) using the gUserLevel to know the amount.
function createValids(gUserLevel) {
    for (var i = 0; i < gUserLevel.SIZE * gUserLevel.SIZE - gUserLevel.MINES; i++) {
        var valid = false
        gValids.push(valid)
    }
}