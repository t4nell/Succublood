class Character extends MovableObject {
    IMAGES_IDLE = [
        {path:'img/character/idle/idle1.png',width: 68, height: 75, offsetX: -37}, 
        {path:'img/character/idle/idle2.png',width: 68, height: 75, offsetX: -38}, 
        {path:'img/character/idle/idle3.png',width: 68, height: 75, offsetX: -39}, 
        {path:'img/character/idle/idle4.png',width: 68, height: 75, offsetX: -40}, 
        {path:'img/character/idle/idle5.png',width: 68, height: 75, offsetX: -38}, 
        {path:'img/character/idle/idle6.png',width: 68, height: 75, offsetX: -36}
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
        this.loadImages(this.IMAGES_IDLE.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_WALK.map(sprite => sprite.path));
        this.x = 200;
        this.y = 400;
        this.offsetX = -34 * this.zoom;
        this.applyGravity();
        this.animate();
    };

    
    animate() {

        setInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.moveRight();
            };
            
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
            };

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            };
            this.moveCamera();
        }, 1000 / 60); 

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.animateImages(this.IMAGES_WALK);
            } else {
                this.animateImages(this.IMAGES_IDLE);
            };  
        }, 1000 / 10);
    };

};

