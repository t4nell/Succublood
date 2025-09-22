class meleeDemon extends MovableObject {
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
        {path:'img/enemies/demon2/hurt/hurt4.png', width: 49, height: 69, offsetX: -22},
        {path:'img/enemies/demon2/hurt/hurt5.png', width: 86, height: 69, offsetX: -11},
        {path:'img/enemies/demon2/hurt/hurt6.png', width: 45, height: 69, offsetX: -12},
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
    IMAGES_ATTACK = [
        {path:'img/enemies/demon2/attack/attack1.png', width: 37, height: 68, offsetX: -19},
        {path:'img/enemies/demon2/attack/attack2.png', width: 42, height: 69, offsetX: -16},
        {path:'img/enemies/demon2/attack/attack3.png', width: 59, height: 69, offsetX: -33},
        {path:'img/enemies/demon2/attack/attack4.png', width: 41, height: 73, offsetX: -18},
        {path:'img/enemies/demon2/attack/attack5.png', width: 71, height: 71, offsetX: -10},
        {path:'img/enemies/demon2/attack/attack6.png', width: 40, height: 65, offsetX: -10}
    ];
    IMAGES_IDLE = [
        {path:'img/enemies/demon2/idle/idle1.png', width: 38, height: 69, offsetX: -17},
        {path:'img/enemies/demon2/idle/idle2.png', width: 37, height: 69, offsetX: -16},
        {path:'img/enemies/demon2/idle/idle3.png', width: 36, height: 69, offsetX: -15},
        {path:'img/enemies/demon2/idle/idle4.png', width: 36, height: 69, offsetX: -15},
        {path:'img/enemies/demon2/idle/idle5.png', width: 36, height: 69, offsetX: -15},
        {path:'img/enemies/demon2/idle/idle6.png', width: 36, height: 69, offsetX: -15},
        {path:'img/enemies/demon2/idle/idle7.png', width: 39, height: 69, offsetX: -18},
        {path:'img/enemies/demon2/idle/idle8.png', width: 39, height: 69, offsetX: -18},
    ];
    currentImage = 0;
    zoom = 2;
    HP = 40;
    isAttacking = false;
    lastAttack = 0;
    attackCooldown = 2000;
    attackRange = 150;


    constructor() {
        super().loadImage('img/enemies/demon2/walk/walk1.png');
        this.loadImages(this.IMAGES_WALK.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_HURT.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_DEAD.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_ATTACK.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_IDLE.map(sprite => sprite.path));
        this.x = 800 + Math.random() * 2000;
        this.y = 500;
        this.speed = 1.25 + Math.random() * 3;
        this.applyGravity();
        this.animate();
    };


    killMeleeDemon() {
        this.hit();
        soundManager.playSound('demonHurt', 0.5);
        if (this.isDead()) {
            this.world.spawnHealPotion(this.x, this.y);
            setTimeout(() => {
                this.world.removeEnemy(this);
            }, this.IMAGES_DEAD.length * 200);
        }
    };


    canAttack() {
        let timeSinceLastAttack = new Date().getTime() - this.lastAttack;
        return timeSinceLastAttack > this.attackCooldown && !this.isDying && !this.isHurt();
    };


    startAttack() {
        if (this.canAttack()) {
            this.isAttacking = true;
            this.currentImage = 0;
            this.lastAttack = new Date().getTime();
            this.speed = 0;
        }
    };


    isCharacterInRange() {
        if (!this.world || !this.world.character || this.world.character.isDying) return false;
        
        let distance = Math.abs(this.x - this.world.character.x);
        return distance < this.attackRange;
    }


    animate() {
        setInterval(() => {
            if (this.world && this.world.gameStarted) {
                if ((!this.isCharacterInRange() && !this.isAttacking && !this.isDying)) {
                    this.moveLeft();
                }
                if (this.isCharacterInRange() && !this.isAttacking && !this.world.character.isDying) {
                    this.startAttack();
                }
            }
        }, 1000 / 20);  
        
        setInterval(() => {
            if (this.world && this.world.gameStarted && this.isDying) {    
                if (this.currentImage < this.IMAGES_DEAD.length) {
                    this.speed = 0;
                    this.animateImages(this.IMAGES_DEAD);
                }
            } else if (this.world && this.world.gameStarted && this.isHurt()) {
                this.speed = 0;
                if (this.currentImage < this.IMAGES_HURT.length) {
                    this.animateImages(this.IMAGES_HURT);
                }
            } else if (this.world && this.world.gameStarted && this.isAttacking) {
                this.speed = 0;
                if (this.currentImage < this.IMAGES_ATTACK.length) {
                    this.animateImages(this.IMAGES_ATTACK);
                    if (this.currentImage === 3 && this.isCharacterInRange()) {
                        this.dealDamageToCharacter();
                    }
                } else {
                    this.isAttacking = false;
                    this.currentImage = 0;
                    if (!this.isCharacterInRange()) {
                        this.speed = 1 + Math.random() * 2;
                    }
                }
            } else if (this.world && this.world.gameStarted && this.isCharacterInRange() && !this.world.character.isDying) {
                this.speed = 0;
                this.animateImages(this.IMAGES_IDLE);
            } else if (this.world && this.world.gameStarted) {
                this.speed = 1 + Math.random() * 2;
                this.animateImages(this.IMAGES_WALK);
            } else {
                this.speed = 0;
                this.animateImages(this.IMAGES_IDLE);
            }
        }, 100);
    };


    dealDamageToCharacter() {
        if (this.world && this.world.character && this.isCharacterInRange() && !this.world.character.isHurt() && !this.world.character.isDying) {
            this.world.character.hit();
            this.world.statusLive.setPercentage(this.world.character.HP);
        }
    };
};

