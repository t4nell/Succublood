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
    IMAGES_DEAD = [
        {path:'img/character/dead/dead1.png',width: 61, height: 73, offsetX: -34},
        {path:'img/character/dead/dead2.png',width: 61, height: 73, offsetX: -34},
        {path:'img/character/dead/dead3.png',width: 62, height: 73, offsetX: -35},
        {path:'img/character/dead/dead4.png',width: 65, height: 80, offsetX: -38},
        {path:'img/character/dead/dead5.png',width: 66, height: 93, offsetX: -38},
        {path:'img/character/dead/dead6.png',width: 65, height: 102, offsetX: -37},
        {path:'img/character/dead/dead7.png',width: 58, height: 101, offsetX: -27},
        {path:'img/character/dead/dead8.png',width: 55, height: 73, offsetX: -25},
    ];
    IMAGES_HURT = [
        {path:'img/character/hurt/hurt1.png',width: 54, height: 72, offsetX: -31},
        {path:'img/character/hurt/hurt2.png',width: 57, height: 73, offsetX: -28},
        {path:'img/character/hurt/hurt3.png',width: 57, height: 73, offsetX: -32},
    ]
    world;
    currentImage = 0;
    zoom = 2;

    constructor() {
        super().loadImage('img/character/idle/idle1.png');
        this.loadImages(this.IMAGES_IDLE.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_WALK.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_DEAD.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_HURT.map(sprite => sprite.path));
        this.x = 200;
        this.y = 430;
        this.offsetX = -34 * this.zoom;
        this.speed = settings.characterSpeed;
        this.applyGravity();
        this.animate();
    };

    
    animate() {

        setInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.moveRight();
            }else if (this.world.keyboard.RIGHT && this.x === this.world.level.levelEndX) {
                this.world.keyboard.RIGHT = false;
            }
            
            if (this.world.keyboard.LEFT && this.x > this.world.level.levelStartX) {
                this.moveLeft();
            }else if (this.world.keyboard.LEFT && this.x === this.world.level.levelStartX) {
                this.world.keyboard.LEFT = false;
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }
            this.moveCamera();
        }, 1000 / 60); 

        setInterval(() => {
            if (this.isDead()) {
                this.animateImages(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.animateImages(this.IMAGES_HURT);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.animateImages(this.IMAGES_WALK);
            } else {
                this.animateImages(this.IMAGES_IDLE);
            };  
        }, 1000 / 10);
    };

};

