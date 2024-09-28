'use strict'




const ALIEN_SPEED = 500
var gIntervalAliens

// The following two variables represent the part of the matrix (some rows) 
// that we should shift (left, right, and bottom) 
// We need to update those when: 
// (1) shifting down and (2) last alien was cleared from row 
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gAlienDir

var gIsAlienFreeze



function createAliens(board) {
    var startIdx = Math.floor((board.length - ALIEN_ROW_LENGTH) / 2)

    for (var i = 0; i < ALIEN_ROW_COUNT; i++) {
        for (var j = startIdx; j < (startIdx + ALIEN_ROW_LENGTH); j++) {
            if (i === 0) board[i][j].gameObject = ALIEN1
            if (i === 1) board[i][j].gameObject = ALIEN2
            if (i === 2) board[i][j].gameObject = ALIEN3
            gGame.alienCount++


        }
    }

}



function isAlien(pos) {
    const aliens = [ALIEN1, ALIEN2, ALIEN3]
    return aliens.includes(gBoard[pos.i][pos.j].gameObject)
}



function handleAlienHit(pos) {

    updateScore()
    updateAlienCount()
    updateCell(pos)

    if (gGame.alienCount === 0) gameOver()

}



function shiftBoardRight(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = board[i].length - 1; j >= 0; j--) {
            var alienType = board[i][j].gameObject

            if (alienType === ALIEN1 || alienType === ALIEN2 || alienType === ALIEN3) {
                updateCell({ i, j })
                updateCell({ i, j: j + 1 }, alienType)
            }

        }
    }

}


function shiftBoardLeft(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var alienType = board[i][j].gameObject

            if (alienType === ALIEN1 || alienType === ALIEN2 || alienType === ALIEN3) {
                updateCell({ i, j })
                updateCell({ i, j: j - 1 }, alienType)
            }

        }
    }
}


function shiftBoardDown(board, fromI, toI) {
    for (var i = toI; i >= fromI; i--) {
        for (var j = 0; j < board[i].length; j++) {
            var alienType = board[i][j].gameObject

            if (alienType === ALIEN1 || alienType === ALIEN2 || alienType === ALIEN3) {
                updateCell({ i, j })
                updateCell({ i: i + 1, j }, alienType)
            }

        }
    }

    gAliensTopRowIdx++
    gAliensBottomRowIdx++


}




function moveAliens() {
    if (!gGame.isOn) return

    gIntervalAliens = setInterval(() => {
        if (gIsAlienFreeze) return
        if (gAlienDir === 1) {
            shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            

            if (isAtRightEdge(gBoard)) {
                shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
                gAlienDir = -1
            }
        } else {
            shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)

            if (isAtLeftEdge(gBoard)) {
                shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
                gAlienDir = 1
            }
        }


        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[gHero.pos.i][j].gameObject === ALIEN1 || gBoard[gHero.pos.i][j].gameObject === ALIEN2 ||
                gBoard[gHero.pos.i][j].gameObject === ALIEN3) {
                gameOver()
            }
        }



    }, ALIEN_SPEED
    )

}


function isAtRightEdge(board) {
    for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
        var gameItem = board[i][board.length - 1].gameObject

        if (gameItem === ALIEN1 || gameItem === ALIEN2 || gameItem === ALIEN3)
            return true
    }
    return false
}



function isAtLeftEdge(board) {
    for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
        var gameItem = board[i][0].gameObject

        if (gameItem === ALIEN1 || gameItem === ALIEN2 || gameItem === ALIEN3)
            return true
    }
    return false
}