let canvas;
let world;
let keyboard = new Keyboard();
let touchControls;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    initTouchControls();
};


function initTouchControls() {
    if (window.innerWidth <= 1024 || 'ontouchstart' in window) {
        touchControls = {
            isVisible: true,
            images: {
                left: new Image(),
                right: new Image(),
                jump: new Image(),
                whip: new Image(),
                fireball: new Image()
            },
            buttons: {
                left: { x: 50, y: canvas.height - 100, width: 80, height: 80, pressed: false },
                right: { x: 180, y: canvas.height - 100, width: 80, height: 80, pressed: false },
                jump: { x: canvas.width - 130, y: canvas.height - 100, width: 80, height: 80, pressed: false },
                whip: { x: canvas.width - 240, y: canvas.height - 100, width: 80, height: 80, pressed: false },
                fireball: { x: canvas.width - 130, y: canvas.height - 210, width: 80, height: 80, pressed: false }
            }
        };
        touchControls.images.left.src = 'img/buttons/touchButtons/leftButton.jpg';
        touchControls.images.right.src = 'img/buttons/touchButtons/rightButton.jpg';
        touchControls.images.jump.src = 'img/buttons/touchButtons/jumpButton.jpg';
        touchControls.images.whip.src = 'img/buttons/touchButtons/whipButton.jpg';
        touchControls.images.fireball.src = 'img/buttons/touchButtons/fireballButton.jpg';
        
        setupTouchEvents();
    }
};


function setupTouchEvents() {
    // Touch Events
    canvas.addEventListener('touchstart', (event) => {
        event.preventDefault();
        handleTouch(event, 'start');
    });
    
    canvas.addEventListener('touchend', (event) => {
        event.preventDefault();
        handleTouch(event, 'end');
    });
    
    // Kontextmenü deaktivieren
    canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
    
    // Touch-Gesten deaktivieren
    canvas.addEventListener('touchmove', (event) => {
        event.preventDefault();
    });
    
    // Drag & Drop deaktivieren
    canvas.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
};


function handleTouch(event, touchType) {
    if (!touchControls) return;
    
    const rect = canvas.getBoundingClientRect();
    const touches = event.changedTouches || event.touches;
    
    for (let touch of touches) {
        const { rawX, rawY, touchX, touchY } = calculateTouchCoordinates(touch, rect);
    
        if (handleMuteButtonTouch(rawX, rawY, touchType)) return;
        if (handleFullscreenButtonTouch(rawX, rawY, touchType)) return;
        if (handleStartScreenButtonsTouch(touchX, touchY, touchType)) return;
        if (handleImprintScreenButtonTouch(touchX, touchY, touchType)) return;
        if (handleControlsScreenButtonTouch(touchX, touchY, touchType)) return;
        if (handleEndScreenButtonTouch(touchX, touchY, touchType)) return;
        handleGameControlsTouch(touchX, touchY, touchType);
    }
    
    if (touchType === 'end' && touches.length === 0 && world.gameStarted) {
        resetAllGameButtons();
    }
};


function calculateTouchCoordinates(touch, rect) {
    const touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);
    const touchY = (touch.clientY - rect.top) * (canvas.height / rect.height);
    const rawX = touch.clientX - rect.left;
    const rawY = touch.clientY - rect.top;
    return { rawX, rawY, touchX, touchY };
};


function handleMuteButtonTouch(rawX, rawY, touchType) {
    if (world.muteButton.isButtonClicked(rawX, rawY) && touchType === 'start') {
        soundManager.playSound('buttonClick', 0.7);
        soundManager.toggleMute();
        return true;
    }
    return false;
};


function handleFullscreenButtonTouch(rawX, rawY, touchType) {
    if (world.fullscreenButton.isButtonClicked(rawX, rawY) && touchType === 'start') {
        soundManager.playSound('buttonClick', 0.7);
        fullscreenManager.toggleFullscreen();
        return true;
    }
    return false;
};


function handleStartScreenButtonsTouch(touchX, touchY, touchType) {
    if (!world.gameStarted && !world.imprintVisible && !world.controlsVisible && touchType === 'start') {
        if (world.startScreen.isCharacterClicked(touchX, touchY)) {
            soundManager.playSound('characterHurt', 0.7);
            world.startScreen.triggerHurtAnimation();
            return true;
        }
        if (world.startScreen.isButtonClicked(touchX, touchY)) {
            soundManager.playSound('buttonClick', 0.7);
            world.startGame();
            return true;
        }
        if (world.startScreen.isImprintButtonClicked(touchX, touchY)) {
            soundManager.playSound('buttonClick', 0.7);
            world.showImprint();
            return true;
        }
        if (world.startScreen.isControlsButtonClicked(touchX, touchY)) {
            soundManager.playSound('buttonClick', 0.7);
            world.showControls();
            return true;
        }
    }
    return false;
};


function handleImprintScreenButtonTouch(touchX, touchY, touchType) {
    if (!world.gameStarted && world.imprintVisible && touchType === 'start') {
        if (world.imprintScreen.isBackButtonClicked(touchX, touchY)) {
            soundManager.playSound('buttonClick', 0.7);
            world.hideImprint();
            return true;
        }
    }
    return false;
};


function handleControlsScreenButtonTouch(touchX, touchY, touchType) {
    if (!world.gameStarted && world.controlsVisible && touchType === 'start') {
        if (world.controlsScreen.isBackButtonClicked(touchX, touchY)) {
            soundManager.playSound('buttonClick', 0.7);
            world.hideControls();
            return true;
        }
    }
    return false;
};


function handleEndScreenButtonTouch(touchX, touchY, touchType) {
    if (world.gameEnded && touchType === 'start') {
        if (world.endScreen.isButtonClicked(touchX, touchY)) {
            soundManager.playSound('buttonClick', 0.7);
            world.restartGame();
            return true;
        }
    }
    return false;
};


function handleGameControlsTouch(touchX, touchY, touchType) {
    if (!world.gameStarted) return;
    
    for (let [buttonName, button] of Object.entries(touchControls.buttons)) {
        if (touchX >= button.x && touchX <= button.x + button.width && 
            touchY >= button.y && touchY <= button.y + button.height) {
            
            if (touchType === 'start') {
                button.pressed = true;
                activateButton(buttonName);
            } else if (touchType === 'end') {
                button.pressed = false;
                deactivateButton(buttonName);
            }
        }
    }
};


function resetAllGameButtons() {
    for (let [buttonName, button] of Object.entries(touchControls.buttons)) {
        button.pressed = false;
        deactivateButton(buttonName);
    }
};


function activateButton(buttonName) {
    if (buttonName === 'left') {
        keyboard.LEFT = true;
    }
    if (buttonName === 'right') {
        keyboard.RIGHT = true;
    }
    if (buttonName === 'jump') {
        keyboard.SPACE = true;
    }
    if (buttonName === 'whip') {
        keyboard.W = true;
    }
    if (buttonName === 'fireball') {
        keyboard.S = true;
    }
};


function deactivateButton(buttonName) {
    if (buttonName === 'left') {
        keyboard.LEFT = false;
    }
    if (buttonName === 'right') {
        keyboard.RIGHT = false;
    }
    if (buttonName === 'jump') {
        keyboard.SPACE = false;
    }
    if (buttonName === 'whip') {
        keyboard.W = false;
    }
    if (buttonName === 'fireball') {
        keyboard.S = false;
    }
};


function drawTouchControls() {
    if (!touchControls || !touchControls.isVisible) return;
    
    const ctx = canvas.getContext('2d');
    
    for (let [buttonName, button] of Object.entries(touchControls.buttons)) {
        const buttonImage = touchControls.images[buttonName];
        
        if (buttonImage.complete) {
            ctx.globalAlpha = button.pressed ? 0.7 : 1;
            ctx.drawImage(buttonImage, button.x, button.y, button.width, button.height);
            ctx.globalAlpha = 1;
        }
    }
};


window.addEventListener('keydown', (event) => {
    if (!world || !world.gameStarted) return;

    if (event.keyCode == 68 && world.cameraX - settings.characterOffsetLeft > -world.level.levelEndX && !world.character.isDying) {
        keyboard.RIGHT = true;
    } 
    
    if (event.keyCode == 65 && world.cameraX - settings.characterOffsetLeft < -world.level.levelStartX && !world.character.isDying) {
        keyboard.LEFT = true;
    } 
    
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    } 
    
    if (event.keyCode == 83) {
        keyboard.S= true;
    }

    if (event.keyCode == 87) {
        keyboard.W = true;
    }
});


window.addEventListener('keyup', (event) => {
    if (event.keyCode == 68) {
        keyboard.RIGHT = false;
    } 
    
    if (event.keyCode == 65) {
        keyboard.LEFT = false;
    } 
    
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }   
    
    if (event.keyCode == 83) {
        keyboard.S= false;
    }
    if (event.keyCode == 87) {
        keyboard.W = false;
    }
});


// Globale Funktion für World-Klasse
window.drawTouchControls = drawTouchControls;