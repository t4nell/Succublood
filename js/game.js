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
                jump: { x: 118, y: canvas.height - 200, width: 80, height: 80, pressed: false },
                whip: { x: canvas.width - 260, y: canvas.height - 130, width: 80, height: 80, pressed: false },
                fireball: { x: canvas.width - 130, y: canvas.height - 130, width: 80, height: 80, pressed: false }
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
    if (!touchControls || !world.gameStarted) return;
    
    const rect = canvas.getBoundingClientRect();
    const touches = event.changedTouches || event.touches;
    
    for (let touch of touches) {
        const touchX = (touch.clientX - rect.left) * (canvas.width / rect.width);
        const touchY = (touch.clientY - rect.top) * (canvas.height / rect.height);
        
        // Prüfen welcher Button berührt wurde
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
    }
    
    if (touchType === 'end' && touches.length === 0) {
        for (let [buttonName, button] of Object.entries(touchControls.buttons)) {
            button.pressed = false;
            deactivateButton(buttonName);
        }
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
    switch(buttonName) {
        case 'left':
            keyboard.LEFT = false;
            break;
        case 'right':
            keyboard.RIGHT = false;
            break;
        case 'jump':
            keyboard.SPACE = false;
            break;
        case 'whip':
            keyboard.W = false;
            break;
        case 'fireball':
            keyboard.S = false;
            break;
    }
};


function drawTouchControls() {
    if (!touchControls || !touchControls.isVisible) return;
    
    const ctx = canvas.getContext('2d');
    
    for (let [buttonName, button] of Object.entries(touchControls.buttons)) {
        const buttonImage = touchControls.images[buttonName];
        
        if (buttonImage.complete) {
            if (button.pressed) {
                ctx.globalAlpha = 0.7;
            } else {
                ctx.globalAlpha = 1;
            }
            
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