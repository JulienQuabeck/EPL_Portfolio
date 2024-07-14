let canvas;
let world;
let keyboard = new Keyboard();
let mute = true;
let backgroundMusic = new Audio('../audio/music.mp3');
let manualOpen = false;
let gameRunning = false;

/**
 * This function starts playing background music
 */
function playBackgroundMusic() {
    backgroundMusic.play().catch(error => {
    });
}

/**
 * This function shows and hides the canvas
 */
function toggleCanvas() {
    document.getElementById('canvas').classList.toggle('display-none');
}

/**
 * This function changes the button from the volume button while playing / not playing the game
 */
function toggleVolume_mute_button() {
    document.getElementById('volume_mute_button_canvas').classList.toggle('display-none');
    document.getElementById('volume_mute_button').classList.toggle('display-none');
}

/**
 * This function toggles the "display-none" for the "ImpressumUndDatenschutz" Container
 */
function toggleImressumUndDatenschutz() {
    document.getElementById('ImpressumUndDatenschutz').classList.toggle('display-none');
}

/**
 * This function toggles the "Display-none"-Class for the ControlButtons
 */
function toggleDisplayNoneForControlButtons() {
    document.getElementById('walkingButtons').classList.toggle('display-none');
    document.getElementById('walkingLeft').classList.toggle('display-none');
    document.getElementById('walkingRight').classList.toggle('display-none');
    document.getElementById('jumpAndAttackButtons').classList.toggle('display-none');
    document.getElementById('jumpingButton').classList.toggle('display-none');
    document.getElementById('attackButton').classList.toggle('display-none');
}

/**
 * This function toggles the "Icons"-class for the controlButtons
 */
function toggleIconsForControlButtons() {
    document.getElementById('walkingLeft').classList.toggle('icons');
    document.getElementById('walkingRight').classList.toggle('icons');
    document.getElementById('jumpingButton').classList.toggle('icons');
    document.getElementById('attackButton').classList.toggle('icons');
}

/**
 * This function relocates the Control Buttons for mobile devices
 */
function relocateControlButtons() {
    document.getElementById('walkingLeft').classList.toggle('relocateControlButtonWalkingLeft');
    document.getElementById('walkingRight').classList.toggle('relocateControlButtons');
    document.getElementById('jumpingButton').classList.toggle('relocateControlButtons');
    document.getElementById('attackButton').classList.toggle('relocateControlButtons');
}

/**
 * This function checks, whether the Game is opend with a mobile device or not
 */
function toggleControlButtons() {
    if (screen.width > 600 && screen.height < 530) {
        toggleDisplayNoneForControlButtons();
        toggleIconsForControlButtons();
    }
}

/**
 * This function starts the game by launching all necessary functions
 */
function startgame() {
    toggleVolume_mute_button();
    toggleImressumUndDatenschutz();
    toggleFullscreenButton();
    toggleCanvas();
    toggleStartbutton();
    toggleControlButtons();
    toggleStartScreen();
    initLevel();
    init();
    turnYourDevice();
    gameRunning = true;
}

/**
 * This function starts a new game after finishing/loosing the previous one
 */
function startNewGame() {
    document.getElementById('startScreen').classList.remove('display-none');
    removeGameOverScreen();
    toggleCanvas();
    initLevel();
    init();
}

function startNewGameIfWon(){
    document.getElementById('startScreen').classList.remove('display-none');
    removeGameWonScreen();
    toggleCanvas();
    initLevel();
    init(); 
}

/**
 * This function hides the controle icon after starting a game
 */
function notShowControlIcon() {
    document.getElementById('controles').classList.add('display-none');
}

/**
 * This function removes the "gameover" screen when the player starts a new game
 */
function removeGameOverScreen() {
    document.getElementById('gameOverScreen').classList.add('display-none');
    document.getElementById('playAgainText').classList.add('display-none');
    document.getElementById('backToStart').classList.add('display-none');
    document.getElementById('toggleFullscreen_canvas').classList.remove('display-none');
    document.getElementById('volume_mute_button_canvas').classList.remove('display-none');
}

/**
 * This function displays / hides the Start-Button
 */
function toggleStartbutton() {
    document.getElementById('startButton').classList.toggle('display-none');
}

/**
 * This function adds / removes the css-class "startScreen"
 */
function toggleStartScreen() {
    document.getElementById('startScreen').classList.toggle('startScreen');
    document.getElementById('backgroundImage').classList.toggle('display-none');
}

/**
 * This function displays / hides the manuals
 */
function Tastaturbelegung() {
    toggleStartbutton();
    showManual();
}

/**
 * This function reorganizes the position of the volume-button, the contoles-button and the fullscreen-button when the manuels are open
 */
function controlbuttonsPositionWhenControlsAreOpen() {
    if (window.innerWidth < 900) {
        document.getElementById('volume_mute_button').style.left = '435px';//451
        document.getElementById('controles').style.left = '435px';
        document.getElementById('toggleFullscreen').style.left = '410px';
        document.getElementById('toggleFullscreen').style.top = '280px';
        document.getElementById('manualListpoints').style.left = '-180px';
        document.getElementById('manualListpoints2').style.left = '-180px';
    }
}

/**
 * This function reorganizes the position of the volume-button, the contoles-button and the fullscreen-button when the manuels are closed
 */
function controlbuttonsBackToNormalPosition() {
    if (window.innerWidth < 900) {//1225
        document.getElementById('volume_mute_button').style.left = '180px';
        document.getElementById('controles').style.left = '180px';
        document.getElementById('toggleFullscreen').style.left = '155px';
        document.getElementById('toggleFullscreen').style.top = '280px';
    } else {
        document.getElementById('volume_mute_button').style.left = '283px';
        document.getElementById('controles').style.left = '283px';
        document.getElementById('toggleFullscreen').style.left = '265px';
    }
}

/**
 * This function displays / hides the manual
 */
function displayManualPoints() {
    document.getElementById('manualList').classList.toggle('display-none');
    document.getElementById('manualListpoints').classList.toggle('display-none');
    document.getElementById('manualListpoints2').classList.toggle('display-none');
}


/**
 * This function triggers the function "displayManualPoints()", "controlbuttonsPositionWhenControlsAreOpen()" and the "controlbuttonsBackToNormalPosition()" whether the controles should be opend ot closed
 */
function showManual() {
    if (manualOpen == false) {
        manualOpen = true;
        displayManualPoints();
        controlbuttonsPositionWhenControlsAreOpen();
    } else {
        manualOpen = false;
        displayManualPoints();
        controlbuttonsBackToNormalPosition();
    }
}

/**
 * This function displays / hides the "gameover" screen
 */
function showGameOverScreen() {
    document.getElementById('gameOverScreen').classList.toggle('display-none');
    document.getElementById('playAgainText').classList.toggle('display-none');
    document.getElementById('backToStart').classList.toggle('display-none');
    document.getElementById('toggleFullscreen').classList.add('display-none');
    document.getElementById('volume_mute_button').classList.add('display-none');
    document.getElementById('startScreen').classList.toggle('display-none');
    document.getElementById('playButtons').classList.add('display-none');
    if (Fullscreenmode == true) {
        document.getElementById('headline').classList.toggle('display-none');
        document.getElementById('gameOverScreen').classList.toggle('gameOverScreenOnFullscreen');
        leavingFullscreen();
        Fullscreenmode = true;
    }
}

/**
 * This function displays / hides the canvas before displaying / hiding the "gameover"-screen
 */
function gameOver() {
    setTimeout(document.getElementById('canvas').classList.toggle('display-none'), 2000);
    document.getElementById('volume_mute_button_canvas').classList.add('display-none');
    document.getElementById('toggleFullscreen_canvas').classList.add('display-none');
    showGameOverScreen();
}

/**
 * This function loads the canvas and the world
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    if (Fullscreenmode == true) {
        enterFullscreen();
        enteringFullscreenWhileGameIsRunning();
    }
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode == 32)
        keyboard.SPACE = true;
    if (event.keyCode == 37) 
        keyboard.LEFT = true;
    if (event.keyCode == 39) 
        keyboard.RIGHT = true;
    if (event.keyCode == 38) 
        keyboard.UP = true;
    if (event.keyCode == 40) 
        keyboard.DOWN = true;
    if (event.keyCode == 68) 
        keyboard.D = true;
    if (event.keyCode == 27) 
        keyboard.ESC = true;
});

document.addEventListener('keyup', (event) => {
    if (event.keyCode == 32)
        keyboard.SPACE = false;
    if (event.keyCode == 37) 
        keyboard.LEFT = false;
    if (event.keyCode == 39) 
        keyboard.RIGHT = false;
    if (event.keyCode == 38)
        keyboard.UP = false;
    if (event.keyCode == 40) 
        keyboard.DOWN = false;
    if (event.keyCode == 68) 
        keyboard.D = false;
    if (event.keyCode == 27) {
        keyboard.ESC = false;
        if (Fullscreenmode == true) {
            document.getElementById('canvas').classList.toggle('canvasFullscreen');
            toggleIconsForFullscreen();
            Fullscreenmode = false;
        }
    }
});

/**
 * This function lets Pepe walk to the left by a button (for mobile devices)
 */
function walkingLeft() {
    document.getElementById('walkingLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('walkingLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}

/**
 * This function lets Pepe walk to the right by a button (for mobile devices)
 */
function walkingRight() {
    document.getElementById('walkingRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('walkingRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}

/**
 * This function lets Pepe jump by a button (for mobile devices)
 */
function jumpByButtons() {
    document.getElementById('jumpingButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('jumpingButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

/**
 * This function lets Pepe throw a bottle by a button (for mobile devices)
 */
function throwBottleByButton() {
    document.getElementById('attackButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('attackButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}

/**
 * This function checks, which movement Pepe should do (triggert by button for mobile devices)
 * @param {int} Btn 1 = walking left; 2 = walking right; 3 = jump; 4 = throw bottle
 */
function buttonControlsFunction(Btn) {
    if (Btn == 1) {
        walkingLeft();
    } else if (Btn == 2) {
        walkingRight();
    } else if (Btn == 3) {
        jumpByButtons();
    } else {
        throwBottleByButton();
    }
}

/**
 * This function switches between the mute-button and volume-button whether the mute function is activted or deactivated
 */
function sound() {
    if (mute == false) {
        document.getElementById('volume_mute_button').src = '../img/gameplay/mute.png';
        mute = true;
        backgroundMusic.pause();
    } else {
        document.getElementById('volume_mute_button').src = '../img/gameplay/volume.png';
        mute = false;
        backgroundMusic.play();
    }
}

/**
 * This function supresses the long touch event (right click on normal PC) for mobile devices
 */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('img').addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);

});

/**
 * This function toggles the class "display-none" to the burgermenu container
 */
function openBurgermenu(){
    document.getElementById('burgermenu').classList.toggle('display-none');
}