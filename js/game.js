let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
};


window.addEventListener('keydown', (event) => {
    if (event.keyCode == 68 && world.cameraX - settings.characterOffsetLeft > -world.level.levelEndX) {
        keyboard.RIGHT = true;
    } 
    
    if (event.keyCode == 65 && world.cameraX - settings.characterOffsetLeft < -world.level.levelStartX) {
        keyboard.LEFT = true;
    } 
    
    if (event.keyCode == 87) {
        keyboard.UP = true;
    } 
    
    if (event.keyCode == 83) {
        keyboard.DOWN = true;
    } 
    
    if (event.keyCode == 32) {
        keyboard.SPACE= true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 68) {
        keyboard.RIGHT = false;
    } 
    
    if (event.keyCode == 65) {
        keyboard.LEFT = false;
    } 
    
    if (event.keyCode == 87) {
        keyboard.UP = false;
    } 
    
    if (event.keyCode == 83) {
        keyboard.DOWN = false;
    } 
    
    if (event.keyCode == 32) {
        keyboard.SPACE= false;
    }
});