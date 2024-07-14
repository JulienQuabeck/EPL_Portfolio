function pepeWon() {
    gameWon();
}

function gameWon() {
    setTimeout(document.getElementById('canvas').classList.toggle('display-none'), 2000);
    showGameWonScreen();
}

function showGameWonScreen() {
    document.getElementById('gameWonScreen').classList.toggle('display-none');
    document.getElementById('playAgainTextWon').classList.toggle('display-none');
    document.getElementById('backToStartWon').classList.toggle('display-none');
    document.getElementById('toggleFullscreen_canvas').classList.add('display-none');
    document.getElementById('volume_mute_button_canvas').classList.add('display-none');
    document.getElementById('startScreen').classList.toggle('display-none');
    document.getElementById('playButtons').classList.add('display-none');
    if (Fullscreenmode == true) {
        document.getElementById('headline').classList.toggle('display-none');
        leavingFullscreen();
        Fullscreenmode = true;
    }
}

/**
 * This function removes the "gameover" screen when the player starts a new game
 */
function removeGameWonScreen(){
    document.getElementById('gameWonScreen').classList.add('display-none');
    document.getElementById('playAgainTextWon').classList.add('display-none');
    document.getElementById('backToStartWon').classList.add('display-none');
    document.getElementById('toggleFullscreen_canvas').classList.remove('display-none');
    document.getElementById('volume_mute_button_canvas').classList.remove('display-none');
}