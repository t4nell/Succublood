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
    IMAGES_ATTACK = [
        {path:'img/boss/attack/attack1.png', width: 43, height: 48, offsetX: -22},
        {path:'img/boss/attack/attack2.png', width: 42, height: 48, offsetX: -21},
        {path:'img/boss/attack/attack3.png', width: 42, height: 48, offsetX: -21},
        {path:'img/boss/attack/attack4.png', width: 42, height: 48, offsetX: -21},
        {path:'img/boss/attack/attack5.png', width: 45, height: 48, offsetX: -23},
        {path:'img/boss/attack/attack6.png', width: 50, height: 48, offsetX: -25},
        {path:'img/boss/attack/attack7.png', width: 54, height: 48, offsetX: -27},
        {path:'img/boss/attack/attack8.png', width: 58, height: 48, offsetX: -29},
        {path:'img/boss/attack/attack9.png', width: 61, height: 48, offsetX: -31},
        {path:'img/boss/attack/attack10.png', width: 46, height: 48, offsetX: -23},
        {path:'img/boss/attack/attack11.png', width: 60, height: 48, offsetX: -30}
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
    HP = 180;
    isAnimating = false;
    isAttacking = false;
    lastAttack = 0;
    attackCooldown = 4000;
    attackRange = 800;
    floatSpeed = 0.05;
    floatAmplitude = 12;
    floatOffset = 0;
    baseY = 500;
    isAwakened = false;
    walkSpeed = 6;
    

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0].path);
        this.loadImages(this.IMAGES_IDLE.map(img => img.path));
        this.loadImages(this.IMAGES_WALK.map(img => img.path));
        this.loadImages(this.IMAGES_ATTACK.map(img => img.path));
        this.loadImages(this.IMAGES_HURT.map(img => img.path));
        this.loadImages(this.IMAGES_DEAD.map(img => img.path));
        this.x = 5500;
        this.y = 500;
        this.baseY = this.y;
        this.animate();
    };


    animate() {
        this.handleBossMovement();
        this.startIdleAnimationLoop();
        this.updateBossAnimation();
        this.startFloatingAnimation();
    };


    handleBossMovement() {
        setInterval(() => {
            if (!this.isDying) {
                this.awakeBoss();
                if (this.isAwakened && !this.isAttacking && !this.isHurt() && !this.isCharacterInAttackRange()) {
                    this.moveLeft();
                }
                if (this.isAwakened && this.isCharacterInAttackRange() && !this.isAttacking && !this.world.character.isDying) {
                    this.startAttack();
                }
            }
        }, 1000 / 60);
    };


    startIdleAnimationLoop() {
        setInterval(() => {
            if (!this.isHurt() && !this.isDying && !this.isAttacking) {
                this.startIdleAnimation();
            }
        }, 3000);
    };


    startIdleAnimation() {
        if (!this.isAnimating && !this.isHurt() && !this.isDying && !this.isAttacking) {
            this.isAnimating = true;
            this.currentImage = 0;
        }
    };


    updateBossAnimation() {
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
                    if (this.currentImage === 11 && this.isCharacterInAttackRange()) {
                        this.shootBossProjectile();
                        soundManager.playSound('bossAttack', 0.3);
                    }
                } else {
                    this.isAttacking = false;
                    this.currentImage = 0;
                    if (!this.isCharacterInAttackRange()) {
                        this.speed = this.walkSpeed;
                    }
                }
            } else if (this.isAnimating) {
                if (this.currentImage < this.IMAGES_IDLE.length) {
                    this.animateImages(this.IMAGES_IDLE);
                } else {
                    this.isAnimating = false;
                    this.currentImage = 0;
                }
            } else if (this.isAwakened && !this.isCharacterInAttackRange()) {
                this.speed = this.walkSpeed;
                this.swapImg(this.IMAGES_WALK[0]);
            } else {
                this.speed = 0;
                this.swapImg(this.IMAGES_IDLE[0]);
            }

        }, 120);
    };


    startFloatingAnimation() {
        setInterval(() => {
            if (!this.isDying) {
                this.floatOffset += this.floatSpeed;
                this.y = this.baseY + Math.sin(this.floatOffset) * this.floatAmplitude;
            }
        }, 1000 / 60);
    };


    killEndboss() {
        soundManager.playSound('bossHurt', 0.1);
        this.hit();
        if (this.isDead()) {
            soundManager.stopSound('bossHurt');
            soundManager.stopSound('bossBackground');
            soundManager.playSound('bossDeath', 0.1);
            this.world.spawnHealPotion(this.x - 50, this.y);
            this.world.spawnHealPotion(this.x + 50, this.y);
            setTimeout(() => {
                this.world.spawnManaPotion(this.x, this.y);
            }, 500);
            
            setTimeout(() => {
                this.world.removeEnemy(this);
            }, this.IMAGES_DEAD.length * 800);
        }
    };

    


    isCharacterInTriggerRange() {
        if (!this.world || !this.world.character) return false;
        return this.world.character.x >= 4000;
    };
    
    
    isCharacterInAttackRange() {
        if (!this.world || !this.world.character || this.world.character.isDying) return false;
        let distance = Math.abs(this.x - this.world.character.x);
        return distance < this.attackRange;
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


    shootBossProjectile() {
        if (this.world) {
            let bossProjectile = new BossProjectile(this.x - 230, this.y - 95);
            this.world.bossProjectiles.push(bossProjectile);
        }
    };


    awakeBoss() {
        if (!this.isAwakened && this.isCharacterInTriggerRange()) {
            this.isAwakened = true;
            soundManager.stopSound('gameBackground');
            soundManager.playSound('bossBackground', 0.2);
            this.speed = this.walkSpeed;
        }
    };
};