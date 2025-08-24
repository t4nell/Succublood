class Endboss extends MovableObject {
    IMAGES_IDLE = [
        {path:'img/boss/idle/idle1.png', width: 43, height: 48, offsetX: -22},   
        {path:'img/boss/idle/idle2.png', width: 43, height: 48, offsetX: -22},   
        {path:'img/boss/idle/idle3.png', width: 44, height: 48, offsetX: -22},   
        {path:'img/boss/idle/idle4.png', width: 44, height: 48, offsetX: -22},   
        {path:'img/boss/idle/idle5.png', width: 44, height: 48, offsetX: -22},   
        {path:'img/boss/idle/idle6.png', width: 44, height: 48, offsetX: -22},   
        {path:'img/boss/idle/idle7.png', width: 43, height: 48, offsetX: -22},   
    ];
    IMAGES_WALK = [
        {path:'img/boss/walk/walk1.png', width: 43, height: 48, offsetX: -22}
    ];
    IMAGES_HURT = [
        {path:'img/boss/hurt/hurt1.png', width: 44, height: 48, offsetX: -22},
        {path:'img/boss/hurt/hurt2.png', width: 47, height: 48, offsetX: -24},
        {path:'img/boss/hurt/hurt3.png', width: 52, height: 49, offsetX: -26},
    ];
    IMAGES_DEAD = [
        {path:'img/boss/dead/dead1.png', width: 46, height: 49, offsetX: -23},
        {path:'img/boss/dead/dead2.png', width: 47, height: 44, offsetX: -24},
        {path:'img/boss/dead/dead3.png', width: 48, height: 39, offsetX: -24},
    ];
    currentImage = 0;
    zoom = 4;
    HP = 60;
    isAnimating = false;
    floatSpeed = 0.05;
    floatAmplitude = 12;
    floatOffset = 0;
    baseY = 500;
    isAwakened = false;
    walkSpeed = 1;

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0].path);
        this.loadImages(this.IMAGES_IDLE.map(img => img.path));
        this.loadImages(this.IMAGES_WALK.map(img => img.path));
        this.loadImages(this.IMAGES_HURT.map(img => img.path));
        this.loadImages(this.IMAGES_DEAD.map(img => img.path));
        this.x = 5500;
        this.y = 500;
        this.baseY = this.y;
        this.animate();
    };


    killEndboss() {
        this.hit();
        if (this.isDead()) {
            this.world.spawnHealPotion(this.x - 50, this.y);
            this.world.spawnHealPotion(this.x + 50, this.y);
            setTimeout(() => {
                this.world.spawnManaPotion(this.x, this.y);
            }, 500);
            
            setTimeout(() => {
                this.world.removeEnemy(this);
                // Hier "Victory!" Screen zeigen
            }, this.IMAGES_DEAD.length * 200);
        }
    };


    isCharacterInTriggerRange() {
        if (!this.world || !this.world.character) return false;
        return this.world.character.x >= 4500;
    };


    awakeBoss() {
        if (!this.isAwakened && this.isCharacterInTriggerRange()) {
            this.isAwakened = true;
            this.speed = this.walkSpeed;
        }
    };


    animate() {
        setInterval(() => {
            if (!this.isDying) {
                this.awakeBoss();
                if (this.isAwakened && !this.isHurt()) {
                    this.moveLeft();
                }
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isHurt() && !this.isDying) {
                this.startIdleAnimation();
            }
        }, 3000);

        setInterval(() => {
            if (this.isDying) {
                if (this.currentImage < this.IMAGES_DEAD.length) {
                    this.animateImages(this.IMAGES_DEAD);
                }
            } else if (this.isHurt()) {
                if (this.currentImage < this.IMAGES_HURT.length) {
                    this.animateImages(this.IMAGES_HURT);
                } else {
                    this.currentImage = 0;
                    if (this.isAwakened) {
                        this.swapImg(this.IMAGES_WALK[0]);
                    } else {
                        this.swapImg(this.IMAGES_IDLE[0]);
                    }
                }
            } else if (this.isAnimating) {
                if (this.currentImage < this.IMAGES_IDLE.length) {
                    this.animateImages(this.IMAGES_IDLE);
                } else {
                    this.isAnimating = false;
                    this.currentImage = 0;
                }    
            }
        }, 90);

        setInterval(() => {
            if (!this.isDying) {
                this.floatOffset += this.floatSpeed;
                this.y = this.baseY + Math.sin(this.floatOffset) * this.floatAmplitude;
            }
        }, 1000 / 60);
    };


    startIdleAnimation() {
        if (!this.isAnimating && !this.isHurt() && !this.isDying) {
            this.isAnimating = true;
            this.currentImage = 0;
        }
    };
};