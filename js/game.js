'use strict'

const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
const EMPTY = ''
const HERO = '<img src="img/spaceship.png" class="icons">'
const ALIEN1 = '<img src="img/alien1.png" class="icons">'
const ALIEN2 = '<img src="img/alien2.png" class="icons">'
const ALIEN3 = '<img src="img/alien3.png" class="icons">'
const LASER = '<img src="img/laser.jpg" class="icons">'

var gBoard
var gGame = {
    isOn: false,
    alienCount: 0
}

function onInit() {

    gGame.isOn = true

    gBoard = createBoard()

    createAliens(gBoard)
    createHero(gBoard)

    renderBoard(gBoard)

}


function createBoard() {

    var board = []

    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = []
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = EMPTY
        }
    }

    return board
}


// Render the board as a <table> to the page 
function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }

    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML

    const elStartItems = document.querySelectorAll('.start-btn, .logo1')
    for (var i = 0; i < elStartItems.length; i++) {
        elStartItems[i].style.display = 'none'
    }

    const elGameInfoLogo = document.querySelectorAll('.game-info-container, .logo')
    for (var i = 0; i < elGameInfoLogo.length; i++) {
        elGameInfoLogo[i].style.display = 'inline'
    }
}



// position such as: {i: 2, j: 7} 
function UpdateCell(pos, value) {
    var elCell = document.querySelector(`.cell-${gHero.pos.i}-${gHero.pos.j}`)
    elCell.innerHTML = value

}













