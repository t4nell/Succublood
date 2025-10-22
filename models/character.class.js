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
    IMAGES_ATTACK_MELEE = [
        {path:'img/character/attackMelee/attackMelee1.png',width: 61, height: 74, offsetX: -40},
        {path:'img/character/attackMelee/attackMelee2.png',width: 66, height: 74, offsetX: -41},
        {path:'img/character/attackMelee/attackMelee3.png',width: 68, height: 87, offsetX: -42},
        {path:'img/character/attackMelee/attackMelee4.png',width: 68, height: 95, offsetX: -42},
        {path:'img/character/attackMelee/attackMelee5.png',width: 71, height: 108, offsetX: -43},
        {path:'img/character/attackMelee/attackMelee6.png',width: 95, height: 100, offsetX: -37},
        {path:'img/character/attackMelee/attackMelee7.png',width: 115, height: 108, offsetX: -33},
        {path:'img/character/attackMelee/attackMelee8.png',width: 124, height: 117, offsetX: -37},
        {path:'img/character/attackMelee/attackMelee9.png',width: 102, height: 116, offsetX: -27},
    ];
    IMAGES_ATTACK_RANGE = [
        {path:'img/character/attackRange/attackRange1.png',width: 61, height: 74, offsetX: -40},
        {path:'img/character/attackRange/attackRange2.png',width: 66, height: 74, offsetX: -41},
        {path:'img/character/attackRange/attackRange3.png',width: 68, height: 75, offsetX: -42},
        {path:'img/character/attackRange/attackRange4.png',width: 68, height: 74, offsetX: -42},
        {path:'img/character/attackRange/attackRange5.png',width: 57, height: 75, offsetX: -29},
        {path:'img/character/attackRange/attackRange6.png',width: 54, height: 71, offsetX: -16},
        {path:'img/character/attackRange/attackRange7.png',width: 54, height: 71, offsetX: -14},
        {path:'img/character/attackRange/attackRange8.png',width: 45, height: 71, offsetX: -14},
        {path:'img/character/attackRange/attackRange9.png',width: 47, height: 73, offsetX: -27},
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
    ];
    world;
    currentImage = 0;
    zoom = 2;
    HP = 100;
    MANA = 100;
    isAttacking = false;
    attackAnimationStarted = false;
    isMeleeAttacking = false;
    meleeAttackRange = 130;

    constructor() {
        super().loadImage('img/character/idle/idle1.png');
        this.loadImages(this.IMAGES_IDLE.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_WALK.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_DEAD.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_ATTACK_RANGE.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_HURT.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_ATTACK_MELEE.map(sprite => sprite.path));
        this.x = 200;
        this.y = 500;
        this.offsetX = -34 * this.zoom;
        this.speed = settings.characterSpeed;
        this.applyGravity();
        this.animate();
    };


    drawMeleeHitbox(ctx) {
        if (!this.isMeleeAttacking || !this.world) return;
        const { x: hitboxX, y: hitboxY, width: hitboxWidth, height: hitboxHeight } = this.getMeleeHitbox();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.strokeRect(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
        ctx.lineWidth = 1;
    };

    
    animate() {
        this.handleCharacterMovement(); 
        this.handleCharacterAnimations();
        this.intervals.push(setInterval(() => {
            if (this.world && this.world.gameStarted && this.world.keyboard.W && !this.isMeleeAttacking && !this.isDying && !this.isHurt()) {
                this.startMeleeAttack();
            }
        }, 1000 / 30));
    };


    handleCharacterMovement() {
        this.intervals.push(setInterval(() => {
            if (this.world && this.world.gameStarted && !this.isDying) {
                let moving = false;
                if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                    this.moveRight();
                    moving = true;
                } else if (this.world.keyboard.RIGHT && this.x === this.world.level.levelEndX) {
                    this.world.keyboard.RIGHT = false;
                }
                if (this.world.keyboard.LEFT && this.x > this.world.level.levelStartX) {
                    this.moveLeft();
                    moving = true;
                } else if (this.world.keyboard.LEFT && this.x === this.world.level.levelStartX) {
                    this.world.keyboard.LEFT = false;
                }
                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    soundManager.playSound('jump', 0.5);
                    this.jump();
                }
                if (
                    moving && !this.isAboveGround() && !this.isMeleeAttacking && !this.isAttacking && !this.isHurt()
                ) {
                    soundManager.playSound('footSteps', 0.5);
                } else {
                    if (soundManager.isPlaying('footSteps')) {
                        soundManager.stopSound('footSteps');
                    }
                }
                this.moveCamera();
            } else {
                if (soundManager.isPlaying('footSteps')) {
                    soundManager.stopSound('footSteps');
                }
            }
        }, 1000 / 60));
    };


    handleCharacterAnimations() {
        this.intervals.push(setInterval(() => {
            if (this.world && this.world.gameStarted && this.isDying) {
                if (this.currentImage < this.IMAGES_DEAD.length) {
                    this.animateImages(this.IMAGES_DEAD);
                    soundManager.playSound('characterDeath', 0.2);
                } else {
                    this.deathAnimationComplete = true;
                }
            } else if (this.world && this.world.gameStarted && this.isMeleeAttacking) {
                // Melee Attack hat höchste Priorität (außer Death)
                this.playMeleeAttackAnimation();
            } else if (this.world && this.world.gameStarted && this.isAttacking && this.MANA > 0) {
                // Range Attack hat zweithöchste Priorität
                this.playRangeAttackAnimation();
            } else if (this.isHurt()) {
                // Hurt Animation nur wenn nicht attackiert wird
                this.animateImages(this.IMAGES_HURT);
                soundManager.playSound('characterHurt', 0.4);
            } else if (this.world && this.world.gameStarted && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.animateImages(this.IMAGES_WALK);
            } else {
                this.animateImages(this.IMAGES_IDLE);
            }
        }, 1000 / 10));
    };


    startMeleeAttack() {
        if (!this.isMeleeAttacking && !this.isDying) {
            this.isMeleeAttacking = true;
            this.currentImage = 0;
            soundManager.playSound('characterAttackVoice', 0.3);
            soundManager.playSound('whipSwing', 0.3);
            setTimeout(() => {
                soundManager.playSound('whipCrack', 0.3);
            }, 650);
        }
    };


    startRangeAttack() {
        if (!this.isAttacking && !this.isDying && this.MANA > 0) {
            this.isAttacking = true;
            this.attackAnimationStarted = false;
            this.currentImage = 0;
            setTimeout(() => {
                soundManager.playSound('characterAttackVoice', 0.3);
                soundManager.playSound('fireball', 0.3);
            }, 600);
        }
    };


    playMeleeAttackAnimation() {
        if (this.currentImage < this.IMAGES_ATTACK_MELEE.length) {
            if (this.currentImage === 6) {
                this.checkMeleeHit();
            }
            this.animateImages(this.IMAGES_ATTACK_MELEE);
        } else {
            this.isMeleeAttacking = false;
            this.currentImage = 0;
        }
    };


    playRangeAttackAnimation() {
        if (this.currentImage < this.IMAGES_ATTACK_RANGE.length) {
            if (this.currentImage === 6 && !this.attackAnimationStarted) {
                this.world.spawnFireball();
                this.attackAnimationStarted = true;
            }
            this.animateImages(this.IMAGES_ATTACK_RANGE);
        } else {
            this.isAttacking = false;
            this.attackAnimationStarted = false;
            this.currentImage = 0;
        }
    };


    checkMeleeHit() {
        if (!this.world) return;
        const { x: hitboxX, y: hitboxY, width: hitboxWidth, height: hitboxHeight } = this.getMeleeHitbox();
        this.handleEnemyCollision(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
    };
    

    getMeleeHitbox() {
        const baseX = this.x + this.offsetX;
        const hitboxY = this.y - this.height;
        const hitboxHeight = this.height;
        const hitboxWidth = this.meleeAttackRange;
        const hitboxX = this.otherDirection
            ? baseX - this.meleeAttackRange                     
            : baseX + this.meleeAttackRange;                    
        return { x: hitboxX, y: hitboxY, width: hitboxWidth, height: hitboxHeight };
    };


    handleEnemyCollision(hitboxX, hitboxY, hitboxWidth, hitboxHeight) {
        this.world.level.enemies.forEach(enemy => {
            const enemyLeft = enemy.x + enemy.offsetX;
            const enemyRight = enemyLeft + enemy.width;
            const enemyBottom = enemy.y;
            const enemyTop = enemy.y - enemy.height;

            const overlap =
                enemyRight > hitboxX &&
                enemyLeft < hitboxX + hitboxWidth &&
                enemyBottom > hitboxY &&
                enemyTop < hitboxY + hitboxHeight;

            if (overlap && !enemy.isDead() && !enemy.isHurt()) {
                if (enemy instanceof meleeDemon) {
                    enemy.killMeleeDemon();
                } else if (enemy instanceof rangeDemon) {
                    enemy.killRangeDemon();
                } else if (enemy instanceof Endboss) {
                    enemy.killEndboss();
                }
            }
        });
    };
};

