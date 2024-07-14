let Fullscreenmode = false;


/**
 * his function changes buttons from the Fullscreen button while playing / not playing the game
 */
function toggleFullscreenButton() {
  document.getElementById('toggleFullscreen_canvas').classList.toggle('display-none');
}

/**
 * This function let you leave the Fullscreen-mode
 */
function leavingFullscreen() {
  if (document.exitFullscreen && gameRunning) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  document.getElementById('canvas').classList.toggle('canvasFullscreen');
  if (gameRunning == true) {
    toggleIconsForFullscreen();
  } else {
    FullscreenStartbildschirm();
  }
}

/**
 * This function enters the Fullscreen-mode
 */
function enteringFullscreenWhileGameIsRunning() {
  if (canvasDiv.requestFullscreen) {
    canvasDiv.requestFullscreen();
  } else if (canvasDiv.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    canvasDiv.msRequestFullscreen();
  } else if (canvasDiv.webkitRequestFullscreen) {  // iOS Safari
    canvasDiv.webkitRequestFullscreen();
  }
  document.getElementById('canvas').classList.toggle('canvasFullscreen');
  enteringFullscreenWhileGameIsRunningCSS();
}

/**
 * This function toggles the volume and fullscreen Icons for Fullscreen-mode
 */
function toggleIconsForFullscreen() {
  document.getElementById('volume_mute_button_canvas').classList.toggle('volume_mute_buttonWhileGameIsRunning');
  document.getElementById('volume_mute_button_canvas').classList.toggle('volume_mute_buttonWhileGameIsRunningInFullscreen');
  document.getElementById('toggleFullscreen_canvas').classList.toggle('toggleFullscreenWhileGameIsRunning');
  document.getElementById('toggleFullscreen_canvas').classList.toggle('toggleFullscreenWhileGameIsRunningInFullscreen');
}

/**
 * This function toggles the volume and fullscreen Icons for Fullscreen-mode while game is running
 */
function enteringFullscreenWhileGameIsRunningCSS() {
  document.getElementById('volume_mute_button_canvas').classList.toggle('volume_mute_buttonWhileGameIsRunning');
  document.getElementById('volume_mute_button_canvas').classList.toggle('volume_mute_buttonWhileGameIsRunningInFullscreen');
  document.getElementById('toggleFullscreen_canvas').classList.toggle('toggleFullscreenWhileGameIsRunning');
  document.getElementById('toggleFullscreen_canvas').classList.toggle('toggleFullscreenWhileGameIsRunningInFullscreen');
}

/**
 * This function let you enter the Fullscreen-mode
 */
function enterFullscreen() {
  if (gameRunning == true) {
    enteringFullscreenWhileGameIsRunning();
  } else {
    FullscreenStartbildschirm();
  }
}

/**
 * This function toggles the game into Fullscreen-mode and normal mode
 */
function Fullscreen() {
  if (Fullscreenmode == false) {
    enterFullscreen();
    Fullscreenmode = true;
  }else if(Fullscreenmode == true && gameRunning == true) {
    enteringFullscreenWhileGameIsRunning();
  } else {
    leavingFullscreen();
    Fullscreenmode = false;
  }
}

/**
 * This function toggles different classes for the Container at the start-screen
 */
function FullscreenStartbildschirm() {
  document.getElementById('headline').classList.toggle('display-none');
  document.getElementById('ImpressumUndDatenschutz').classList.toggle('ImpressumUndDatenschutzonFullscreen');
  document.getElementById('startScreen').classList.toggle('startScreen');
  document.getElementById('startScreen').classList.toggle('startScreenInFullscreen');
  document.getElementById('canvas').classList.toggle('canvasFullscreen');
  document.getElementById('toggleFullscreen').classList.toggle('toggleFullscreeninFullscreen');
  document.getElementById('toggleFullscreen').classList.toggle('toggleFullscreen');
  document.getElementById('volume_mute_button').classList.toggle('volume_mute_button_Startscreen_Fullscreen');
}

/**
 * This function opens the "turnYourDevice" Container
 */
function turnYourDevice() {
  setInterval(() => {
    if (window.innerWidth <= 500) {
      document.getElementById('turnDeviceScreen').classList.remove('display-none');
      document.getElementById('ImpressumUndDatenschutz').classList.add('display-none');
    } else {
      document.getElementById('turnDeviceScreen').classList.add('display-none');
      if (gameRunning == false) {
        document.getElementById('ImpressumUndDatenschutz').classList.remove('display-none');
      }
    }
  }, 100);
}