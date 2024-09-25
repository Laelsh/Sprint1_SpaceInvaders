'use strict'




const ALIEN_SPEED = 500
var gIntervalAliens

// The following two variables represent the part of the matrix (some rows) 
// that we should shift (left, right, and bottom) 
// We need to update those when: 
// (1) shifting down and (2) last alien was cleared from row 
var gAliensTopRowIdx = 0
var gAliensBottomRowIdx = 2
var gAlienDir = 1

var gIsAlienFreeze = false



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
            var alienType = board[i][j - 1].gameObject

            if (alienType === ALIEN1 || alienType === ALIEN2 || alienType === ALIEN3) {
                updateCell({ i, j })
                updateCell({ i, j: j - 1 }, alienType)
            }

        }
    }

}


function shiftBoardLeft(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j < board[i].length - 1; j++) {
            var alienType = board[i][j + 1].gameObject

            if (alienType === ALIEN1 || alienType === ALIEN2 || alienType === ALIEN3) {
                updateCell({ i, j })
                updateCell({ i, j: j + 1 }, alienType)
            }

        }
    }
}


function shiftBoardDown(board, fromI, toI) {

    for (var i = toI; i >= fromI; i--) {
        for (var j = ALIEN_ROW_COUNT; j <= 10 ; j++) {
            var alienType = board[i][j].gameObject
            console.log('alienType:', alienType)
            if (alienType === ALIEN1 || alienType === ALIEN2 || alienType === ALIEN3) {
                updateCell({ i, j })
                updateCell({ i: i + 1, j }, alienType)
            }

        }
    }

    gAliensTopRowIdx++
    gAliensBottomRowIdx++

    console.log('gAliensTopRowIdx:', gAliensTopRowIdx)
    console.log('gAliensBottomRowIdx:', gAliensBottomRowIdx)

}

// runs the interval for moving aliens side to side and down 
// it re-renders the board every time 
// when the aliens are reaching the hero row - interval stops 
function moveAliens() {
    if (!gGame.isOn) return

    gIntervalAliens = setInterval(() => {
        if (gIsAlienFreeze) return
        if (gAlienDir === 1) {
            shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)


            for (var i = 0; i < gBoard.length - 1; i++) {
                const rightEdge = gBoard[i][gBoard.length - 1].gameObject
                console.log('rightEdge:', rightEdge)



                if (rightEdge === ALIEN1 || rightEdge === ALIEN2 || rightEdge === ALIEN3) {
                    gAlienDir = -1
                    console.log('gAlienDir:', gAlienDir)

                    shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
                }
            }
        } else {
            shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)

            for (var i = 0; i > gBoard.length; i++) {
                const leftEdge = gBoard[i][0].gameObject
                console.log('leftEdge:', leftEdge)

                gAlienDir = 1
            }
        }

    }, ALIEN_SPEED);


}

