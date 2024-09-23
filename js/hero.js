'use strict'



const LASER_SPEED = 80
var gHero
var gIntervalLaser
var gBlinkLaser
var gLaserPos

// creates the hero and place it on board 
function createHero(board) {

    gHero = {
        pos: { i: 12, j: 6 },
        isShoot: false
    }

    board[gHero.pos.i][gHero.pos.j].gameObject = HERO

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
    if (!gGame.isOn) return 

    var nextJ = gHero.pos.j + dir
    if (nextJ < 0 || nextJ > gBoard[0].length - 1) return

    gBoard[gHero.pos.i][gHero.pos.j].gameObject = EMPTY
    updateCell(gHero.pos, EMPTY)

    gBoard[gHero.pos.i][nextJ].gameObject = HERO
    gHero.pos.j = nextJ
    updateCell(gHero.pos, HERO)

}


// Sets an interval for shutting (blinking) the laser up towards aliens 
function shoot() {
    if (!gGame.isOn || gHero.isShoot) return 

    gHero.isShoot = true
    var laserPos = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }

    gIntervalLaser = setInterval(() => {
        laserPos.i--

        if (laserPos.i < 0) {
            clearInterval(gIntervalLaser)
            gHero.isShoot = false
             return
        }

        if (isAlien(laserPos)) {
            handleAlienHit(laserPos)
            clearInterval(gIntervalLaser)
            gHero.isShoot = false
            return
            
        }





        gLaserPos = laserPos
        blinkLaser(laserPos, LASER)
    }, LASER_SPEED)
 

}


// renders a LASER at specific cell for short time and removes it 
function blinkLaser(pos) {
    updateCell(pos, LASER)
    gBlinkLaser = setTimeout(() => {
        updateCell(pos, EMPTY)
    }, LASER_SPEED - 20)
}