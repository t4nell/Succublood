class rangeDemon extends MovableObject {
    IMAGES_WALK = [
        {path:'img/enemies/demon1/walk/walk1.png',width: 42, height: 69, offsetX: -22},
        {path:'img/enemies/demon1/walk/walk2.png',width: 38, height: 70, offsetX: -19},
        {path:'img/enemies/demon1/walk/walk3.png',width: 29, height: 71, offsetX: -15},
        {path:'img/enemies/demon1/walk/walk4.png',width: 34, height: 71, offsetX: -17},
        {path:'img/enemies/demon1/walk/walk5.png',width: 39, height: 70, offsetX: -20},
        {path:'img/enemies/demon1/walk/walk6.png',width: 42, height: 69, offsetX: -21},
        {path:'img/enemies/demon1/walk/walk7.png',width: 38, height: 70, offsetX: -19},
        {path:'img/enemies/demon1/walk/walk8.png',width: 30, height: 71, offsetX: -15},
        {path:'img/enemies/demon1/walk/walk9.png',width: 34, height: 71, offsetX: -17},
        {path:'img/enemies/demon1/walk/walk10.png',width: 39, height: 70, offsetX: -20}
    ];
    IMAGES_HURT = [
        {path:'img/enemies/demon1/hurt/hurt1.png', width: 57, height: 69, offsetX: -28},
        {path:'img/enemies/demon1/hurt/hurt2.png', width: 57, height: 69, offsetX: -30},
        {path:'img/enemies/demon1/hurt/hurt3.png', width: 66, height: 69, offsetX: -39},
        {path:'img/enemies/demon1/hurt/hurt4.png', width: 49, height: 69, offsetX: -22},
        {path:'img/enemies/demon1/hurt/hurt5.png', width: 86, height: 69, offsetX: -11},
        {path:'img/enemies/demon1/hurt/hurt6.png', width: 46, height: 69, offsetX: -11}
    ];
    IMAGES_DEAD = [
        {path:'img/enemies/demon1/dead/dead1.png', width: 39, height: 64, offsetX: -16},
        {path:'img/enemies/demon1/dead/dead2.png', width: 42, height: 55, offsetX: -16},
        {path:'img/enemies/demon1/dead/dead3.png', width: 61, height: 55, offsetX: -34},
        {path:'img/enemies/demon1/dead/dead4.png', width: 59, height: 56, offsetX: -30},
        {path:'img/enemies/demon1/dead/dead5.png', width: 44, height: 56, offsetX: -12},
        {path:'img/enemies/demon1/dead/dead6.png', width: 66, height: 56, offsetX: -6},
        {path:'img/enemies/demon1/dead/dead7.png', width: 66, height: 55, offsetX: -6},
        {path:'img/enemies/demon1/dead/dead8.png', width: 87, height: 52, offsetX: -6},
        {path:'img/enemies/demon1/dead/dead9.png', width: 88, height: 55, offsetX: -6},
        {path:'img/enemies/demon1/dead/dead10.png', width: 88, height: 109, offsetX: -30},
        {path:'img/enemies/demon1/dead/dead11.png', width: 65, height: 45, offsetX: -36},
        {path:'img/enemies/demon1/dead/dead12.png', width: 68, height: 19, offsetX: -38}
    ];
    IMAGES_ATTACK = [
        {path:'img/enemies/demon1/attack/attack1.png', width: 42, height: 69, offsetX: -19},
        {path:'img/enemies/demon1/attack/attack2.png', width: 47, height: 69, offsetX: -21},
        {path:'img/enemies/demon1/attack/attack3.png', width: 47, height: 70, offsetX: -21},
        {path:'img/enemies/demon1/attack/attack4.png', width: 51, height: 69, offsetX: -12},
        {path:'img/enemies/demon1/attack/attack5.png', width: 57, height: 69, offsetX: -12},
        {path:'img/enemies/demon1/attack/attack6.png', width: 46, height: 69, offsetX: -12},
        {path:'img/enemies/demon1/attack/attack7.png', width: 60, height: 69, offsetX: -12}
    ];
    IMAGES_IDLE = [
        {path:'img/enemies/demon1/idle/idle1.png', width: 38, height: 69, offsetX: -17},
        {path:'img/enemies/demon1/idle/idle2.png', width: 37, height: 69, offsetX: -16},
        {path:'img/enemies/demon1/idle/idle3.png', width: 36, height: 69, offsetX: -15},
        {path:'img/enemies/demon1/idle/idle4.png', width: 36, height: 69, offsetX: -15},
        {path:'img/enemies/demon1/idle/idle5.png', width: 36, height: 69, offsetX: -15},
        {path:'img/enemies/demon1/idle/idle6.png', width: 36, height: 69, offsetX: -15},
        {path:'img/enemies/demon1/idle/idle7.png', width: 39, height: 69, offsetX: -18},
        {path:'img/enemies/demon1/idle/idle8.png', width: 39, height: 69, offsetX: -18}
    ];
    currentImage = 0;
    zoom = 2;
    HP = 20;
    isAttacking = false;
    lastAttack = 0;
    attackCooldown = 3000;
    attackRange = 450;


    constructor() {
        super().loadImage('img/enemies/demon1/walk/walk1.png');
        this.loadImages(this.IMAGES_WALK.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_HURT.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_DEAD.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_ATTACK.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_IDLE.map(sprite => sprite.path));
        this.x = 1200 + Math.random() * 3500;
        this.y = 500;
        this.speed = 0.15 + Math.random() * 1;
        this.applyGravity();
        this.animate();
    };


    killRangeDemon() {
        this.hit();
        if (this.isDead()) {
            this.world.spawnManaPotion(this.x, this.y);
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
    };


    animate() {
        setInterval(() => {
            if ((!this.isCharacterInRange() && !this.isAttacking && !this.isDying)) {
                this.moveLeft();
            }
            if (this.isCharacterInRange() && !this.isAttacking && !this.world.character.isDying) {
                this.startAttack();
            }
        }, 1000 / 60);  

        setInterval(() => {
            if (this.isDying) {    
                if (this.currentImage < this.IMAGES_DEAD.length) {
                    this.speed = 0;
                    this.animateImages(this.IMAGES_DEAD);
                }
            } else if (this.isHurt()) {
                this.speed = 0;
                if (this.currentImage < this.IMAGES_HURT.length) {
                    this.animateImages(this.IMAGES_HURT);
                }
            } else if (this.isAttacking) {
                this.speed = 0;
                if (this.currentImage < this.IMAGES_ATTACK.length) {
                    this.animateImages(this.IMAGES_ATTACK);
                    if (this.currentImage === 7 && this.isCharacterInRange()) {
                        this.shootEnemyProjectile();
                    }
                } else {
                    this.isAttacking = false;
                    this.currentImage = 0;
                    if (!this.isCharacterInRange()) {
                        this.speed = 0.15 + Math.random() * 1;
                    }
                }
            } else if (this.isCharacterInRange() && !this.world.character.isDying) {
                this.speed = 0;
                this.animateImages(this.IMAGES_IDLE);
            } else {
                this.speed = 0.15 + Math.random() * 1;
                this.animateImages(this.IMAGES_WALK);
            }
        }, 100);
    };


    shootEnemyProjectile() {
        if (this.world) {
            let enemyProjectile = new EnemyProjectile(this.x - 110, this.y - 115);
            this.world.enemyProjectiles.push(enemyProjectile);
        }
    };
};