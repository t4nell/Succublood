let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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