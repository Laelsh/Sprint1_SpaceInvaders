'use strict'




const ALIEN_SPEED = 500
var gIntervalAliens

// The following two variables represent the part of the matrix (some rows) 
// that we should shift (left, right, and bottom) 
// We need to update those when: 
// (1) shifting down and (2) last alien was cleared from row 
var gAliensTopRowIdx
var gAliensBottomRowIdx

var gIsAlienFreeze = true



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


function isAlien (pos) {
    const aliens = [ALIEN1, ALIEN2, ALIEN3]
    return aliens.includes(gBoard[pos.i][pos.j].gameObject)
}


function handleAlienHit(pos) {
    updateCell(pos)
    updateScore()
    gGame.alienCount--

 }


function shiftBoardRight(board, fromI, toI) { }


function shiftBoardLeft(board, fromI, toI) { }


function shiftBoardDown(board, fromI, toI) { }

// runs the interval for moving aliens side to side and down 
// it re-renders the board every time 
// when the aliens are reaching the hero row - interval stops 
function moveAliens() { }