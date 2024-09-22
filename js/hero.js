'use strict'



const LASER_SPEED = 80
var gHero
var gIntervalLaser


// creates the hero and place it on board 
function createHero(board) {

    gHero = {
        pos: { i: 12, j: 6 },
        isShoot: false
    }

    board[gHero.pos.i][gHero.pos.j] = HERO

}



// Handle game keys 
function onKeyDown(ev) {

    switch (ev.key) {
        case 'ArrowRight':
            moveHero(1)
            break;
        case 'ArrowLeft':
            moveHero(-1)
            break;
        case ' ':
            shoot()
            break;
    }
}



// Move the hero right (1) or left (-1) 
function moveHero(dir) {
    if (!gGame.isOn) return false

    var nextJ = gHero.pos.j + dir
    if (nextJ < 0 || nextJ > gBoard[0].length - 1) return

    gBoard[gHero.pos.i][gHero.pos.j] = EMPTY
    UpdateCell(gHero.pos, EMPTY)

    gBoard[gHero.pos.i][nextJ] = HERO
    gHero.pos.j = nextJ
    UpdateCell(gHero.pos, HERO)

}


// Sets an interval for shutting (blinking) the laser up towards aliens 
function shoot() {


 }


// renders a LASER at specific cell for short time and removes it 
function blinkLaser(pos) {

 }