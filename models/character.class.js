class Character extends MovableObject {
    IMAGES_IDLE = [
        {path:'img/character/idle/idle1.png',width: 68, height: 75, offsetX: -34}, 
        {path:'img/character/idle/idle2.png',width: 68, height: 75, offsetX: -34}, 
        {path:'img/character/idle/idle3.png',width: 68, height: 75, offsetX: -34}, 
        {path:'img/character/idle/idle4.png',width: 68, height: 75, offsetX: -34}, 
        {path:'img/character/idle/idle5.png',width: 68, height: 75, offsetX: -34}, 
        {path:'img/character/idle/idle6.png',width: 68, height: 75, offsetX: -34}
    ]; 
    IMAGES_WALK = [
        {path:'img/character/walk/walk1.png',width: 52, height: 72, offsetX: -34},  
        {path:'img/character/walk/walk2.png',width: 47, height: 72, offsetX: -34},  
        {path:'img/character/walk/walk3.png',width: 44, height: 73, offsetX: -34},  
        {path:'img/character/walk/walk4.png',width: 41, height: 74, offsetX: -34},  
        {path:'img/character/walk/walk5.png',width: 43, height: 73, offsetX: -34},  
        {path:'img/character/walk/walk6.png',width: 52, height: 72, offsetX: -34},  
        {path:'img/character/walk/walk7.png',width: 53, height: 72, offsetX: -34},  
        {path:'img/character/walk/walk8.png',width: 48, height: 72, offsetX: -34},  
        {path:'img/character/walk/walk9.png',width: 44, height: 73, offsetX: -34},  
        {path:'img/character/walk/walk10.png',width: 41, height: 74, offsetX: -34},  
        {path:'img/character/walk/walk11.png',width: 43, height: 73, offsetX: -34},  
        {path:'img/character/walk/walk12.png',width: 51, height: 72, offsetX: -34},  
    ];
    world;
    currentImage = 0;
    zoom = 2;
    speed = 10;

    constructor() {
        super().loadImage('img/character/idle/idle1.png');
        this.loadImages(this.IMAGES_WALK.map(sprite => sprite.path));
        this.x = 120;
        this.y = 405;
        this.height = 75;
        this.width = 68;

        this.animate();
    }

    
    animate() {

        setInterval(() => {

            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            
            if (this.world.keyboard.LEFT) {
                this.otherDirection = true;
                this.x -= this.speed;
            }
            this.world.cameraX = -this.x;
        }, 1000 / 60); 

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALK.length;
                let sprite = this.IMAGES_WALK[i];
                this.swapImg(sprite);
                this.currentImage++;
            }
        }, 1000 / 60); 
    }

    jump() {

    }

};

