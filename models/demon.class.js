class Demon extends MovableObject {
    IMAGES_WALK = [
        {path:'img/enemies/demon2/walk/walk10.png',width: 44, height: 69, offsetX: -22}, 
        {path:'img/enemies/demon2/walk/walk9.png',width: 40, height: 70, offsetX: -20}, 
        {path:'img/enemies/demon2/walk/walk8.png',width: 31, height: 71, offsetX: -15.5}, 
        {path:'img/enemies/demon2/walk/walk7.png',width: 36, height: 71, offsetX: -18}, 
        {path:'img/enemies/demon2/walk/walk6.png',width: 39, height: 70, offsetX: -18.5}, 
        {path:'img/enemies/demon2/walk/walk5.png',width: 44, height: 69, offsetX: -22}, 
        {path:'img/enemies/demon2/walk/walk4.png',width: 40, height: 70, offsetX: -20}, 
        {path:'img/enemies/demon2/walk/walk3.png',width: 32, height: 71, offsetX: -16}, 
        {path:'img/enemies/demon2/walk/walk2.png',width: 36, height: 71, offsetX: -18}, 
        {path:'img/enemies/demon2/walk/walk1.png',width: 39, height: 70, offsetX: -18.5}
    ];
    IMAGES_HURT = [
        {path:'img/enemies/demon2/hurt/hurt1.png', width: 57, height: 69, offsetX: -28},
        {path:'img/enemies/demon2/hurt/hurt2.png', width: 57, height: 69, offsetX: -30},
        {path:'img/enemies/demon2/hurt/hurt3.png', width: 66, height: 69, offsetX: -39},
        // {path:'img/enemies/demon2/hurt/hurt4.png', width: 49, height: 69, offsetX: -22},
        // {path:'img/enemies/demon2/hurt/hurt5.png', width: 86, height: 69, offsetX: -11},
        // {path:'img/enemies/demon2/hurt/hurt6.png', width: 45, height: 69, offsetX: -12},
    ];
    IMAGES_DEAD = [
        {path:'img/enemies/demon2/dead/dead1.png', width: 39, height: 64, offsetX: -16},
        {path:'img/enemies/demon2/dead/dead2.png', width: 44, height: 55, offsetX: -16},
        {path:'img/enemies/demon2/dead/dead3.png', width: 61, height: 55, offsetX: -34},
        {path:'img/enemies/demon2/dead/dead4.png', width: 62, height: 56, offsetX: -30},
        {path:'img/enemies/demon2/dead/dead5.png', width: 45, height: 56, offsetX: -12},
        {path:'img/enemies/demon2/dead/dead6.png', width: 66, height: 56, offsetX: -6},
        {path:'img/enemies/demon2/dead/dead7.png', width: 66, height: 55, offsetX: -6},
        {path:'img/enemies/demon2/dead/dead8.png', width: 32, height: 52, offsetX: -6},
        {path:'img/enemies/demon2/dead/dead9.png', width: 58, height: 30, offsetX: -30},
        {path:'img/enemies/demon2/dead/dead10.png', width: 65, height: 19, offsetX: -40},
        {path:'img/enemies/demon2/dead/dead11.png', width: 68, height: 19, offsetX: -40}
    ];
    currentImage = 0;
    zoom = 2;
    isDying = false;
    deathAnimationComplete = false;
    HP = 60;

    constructor() {
        super().loadImage('img/enemies/demon2/idle/idle1.png');
        this.loadImages(this.IMAGES_WALK.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_HURT.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_DEAD.map(sprite => sprite.path));
        this.x = 1000 + Math.random() * 4000;
        this.y = 500;
        this.speed = 0.25 + Math.random() * 1.5;
        this.applyGravity();
        this.animate();
    };


    getHit() {
        this.HP -= 20;
        if (this.HP <= 0) {
            this.HP = 0;
            this.die();
        } else {
            this.lastHit = new Date().getTime();
        }
    };


    die() {
        if (!this.isDying) {
            this.isDying = true;
            this.currentImage = 0;
            this.speed = 0;

            setTimeout(() => {
                this.deathAnimationComplete = true;
            }, this.IMAGES_DEAD.length * 200);
        }
    };


    animate() {
        setInterval(() => {
            if (!this.isDying) {
                this.moveLeft();
            }
        }, 1000 / 60);   
        
        setInterval(() => {
            if (this.isDying) {    
                if (this.currentImage < this.IMAGES_DEAD.length) {
                    this.animateImages(this.IMAGES_DEAD);
                }
            } else if (this.isHurt()) {
                this.speed = 0;
                this.animateImages(this.IMAGES_HURT);
            } else {
                this.speed = 0.25 + Math.random() * 1.5;
                this.animateImages(this.IMAGES_WALK);
            }
        }, 1000 / 10);
    };
};

