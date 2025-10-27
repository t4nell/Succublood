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
        this.loadCharacterImages();
        this.initializeCharacterPosition();
        this.applyGravity();
        this.animate();
    };


    loadCharacterImages() {
        this.loadImages(this.IMAGES_IDLE.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_WALK.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_DEAD.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_ATTACK_RANGE.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_HURT.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_ATTACK_MELEE.map(sprite => sprite.path));
    };


    initializeCharacterPosition() {
        this.x = 200;
        this.y = 500;
        this.offsetX = -34 * this.zoom;
        this.speed = settings.characterSpeed;
    };


    drawMeleeHitbox(ctx) {
        if (this.isMeleeAttacking) {
            const hitbox = this.getMeleeHitbox();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
            ctx.stroke();
        }
    };


    animate() {
        this.handleCharacterMovement(); 
        this.handleCharacterAnimations();
        this.handleMeleeAttackInput();
    };


    handleMeleeAttackInput() {
        this.intervals.push(setInterval(() => {
            if (this.canStartMeleeAttack()) {
                this.startMeleeAttack();
            }
        }, 1000 / 30));
    };


    canStartMeleeAttack() {
        return this.world && 
               this.world.gameStarted && 
               this.world.keyboard.W && 
               !this.isMeleeAttacking && 
               !this.isDying && 
               !this.isHurt();
    };


    handleCharacterMovement() {
        this.intervals.push(setInterval(() => {
            if (this.shouldMove()) {
                this.processMovement();
            } else {
                this.stopFootsteps();
            }
        }, 1000 / 60));
    };


    shouldMove() {
        return this.world && this.world.gameStarted && !this.isDying;
    };


    processMovement() {
        let moving = false;
        moving = this.handleRightMovement() || moving;
        moving = this.handleLeftMovement() || moving;
        this.handleJump();
        this.handleFootsteps(moving);
        this.moveCamera();
    };


    handleRightMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
            this.moveRight();
            return true;
        } else if (this.world.keyboard.RIGHT && this.x === this.world.level.levelEndX) {
            this.world.keyboard.RIGHT = false;
        }
        return false;
    };


    handleLeftMovement() {
        if (this.world.keyboard.LEFT && this.x > this.world.level.levelStartX) {
            this.moveLeft();
            return true;
        } else if (this.world.keyboard.LEFT && this.x === this.world.level.levelStartX) {
            this.world.keyboard.LEFT = false;
        }
        return false;
    };


    handleJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            soundManager.playSound('jump', 0.5);
            this.jump();
        }
    };


    handleFootsteps(moving) {
        if (this.shouldPlayFootsteps(moving)) {
            soundManager.playSound('footSteps', 0.5);
        } else {
            this.stopFootsteps();
        }
    };


    shouldPlayFootsteps(moving) {
        return moving && 
               !this.isAboveGround() && 
               !this.isMeleeAttacking && 
               !this.isAttacking && 
               !this.isHurt();
    };


    stopFootsteps() {
        if (soundManager.isPlaying('footSteps')) {
            soundManager.stopSound('footSteps');
        }
    };


    handleCharacterAnimations() {
        this.intervals.push(setInterval(() => {
            if (this.shouldPlayDeathAnimation()) {
                this.playDeathAnimation();
            } else if (this.shouldPlayMeleeAttack()) {
                this.playMeleeAttackAnimation();
            } else if (this.shouldPlayRangeAttack()) {
                this.playRangeAttackAnimation();
            } else if (this.isHurt()) {
                this.playHurtAnimation();
            } else if (this.shouldPlayWalkAnimation()) {
                this.animateImages(this.IMAGES_WALK);
            } else {
                this.animateImages(this.IMAGES_IDLE);
            }
        }, 1000 / 10));
    };


    shouldPlayDeathAnimation() {
        return this.world && this.world.gameStarted && this.isDying;
    };


    playDeathAnimation() {
        if (this.currentImage < this.IMAGES_DEAD.length) {
            this.animateImages(this.IMAGES_DEAD);
            soundManager.playSound('characterDeath', 0.2);
        } else {
            this.deathAnimationComplete = true;
        }
    };


    shouldPlayMeleeAttack() {
        return this.world && this.world.gameStarted && this.isMeleeAttacking;
    };


    shouldPlayRangeAttack() {
        return this.world && this.world.gameStarted && this.isAttacking && this.MANA > 0;
    };


    playHurtAnimation() {
        this.animateImages(this.IMAGES_HURT);
        soundManager.playSound('characterHurt', 0.4);
    };


    shouldPlayWalkAnimation() {
        return this.world && 
               this.world.gameStarted && 
               (this.world.keyboard.RIGHT || this.world.keyboard.LEFT);
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
        if (this.canStartRangeAttack()) {
            this.isAttacking = true;
            this.attackAnimationStarted = false;
            this.currentImage = 0;
            this.playRangeAttackSounds();
        }
    };


    canStartRangeAttack() {
        return !this.isAttacking && !this.isDying && this.MANA > 0;
    };


    playRangeAttackSounds() {
        setTimeout(() => {
            soundManager.playSound('characterAttackVoice', 0.3);
            soundManager.playSound('fireball', 0.3);
        }, 600);
    };


    playMeleeAttackAnimation() {
        if (this.currentImage < this.IMAGES_ATTACK_MELEE.length) {
            if (this.currentImage === 6) {
                this.checkMeleeHit();
            }
            this.animateImages(this.IMAGES_ATTACK_MELEE);
        } else {
            this.resetMeleeAttack();
        }
    };


    resetMeleeAttack() {
        this.isMeleeAttacking = false;
        this.currentImage = 0;
    };


    playRangeAttackAnimation() {
        if (this.currentImage < this.IMAGES_ATTACK_RANGE.length) {
            this.handleFireballSpawn();
            this.animateImages(this.IMAGES_ATTACK_RANGE);
        } else {
            this.resetRangeAttack();
        }
    };


    handleFireballSpawn() {
        if (this.currentImage === 6 && !this.attackAnimationStarted) {
            this.world.spawnFireball();
            this.attackAnimationStarted = true;
        }
    };


    resetRangeAttack() {
        this.isAttacking = false;
        this.attackAnimationStarted = false;
        this.currentImage = 0;
    };


    checkMeleeHit() {
        if (!this.world) return;
        const hitbox = this.getMeleeHitbox();
        this.handleEnemyCollision(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
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
            if (this.isEnemyHit(enemy, hitboxX, hitboxY, hitboxWidth, hitboxHeight)) {
                this.damageEnemy(enemy);
            }
        });
    };


    isEnemyHit(enemy, hitboxX, hitboxY, hitboxWidth, hitboxHeight) {
        const enemyBounds = this.getEnemyBounds(enemy);
        const overlap = this.checkOverlap(enemyBounds, hitboxX, hitboxY, hitboxWidth, hitboxHeight);
        return overlap && !enemy.isDead() && !enemy.isHurt();
    };


    getEnemyBounds(enemy) {
        const enemyLeft = enemy.x + enemy.offsetX;
        const enemyRight = enemyLeft + enemy.width;
        const enemyBottom = enemy.y;
        const enemyTop = enemy.y - enemy.height;
        return { left: enemyLeft, right: enemyRight, top: enemyTop, bottom: enemyBottom };
    };


    checkOverlap(enemyBounds, hitboxX, hitboxY, hitboxWidth, hitboxHeight) {
        return enemyBounds.right > hitboxX &&
               enemyBounds.left < hitboxX + hitboxWidth &&
               enemyBounds.bottom > hitboxY &&
               enemyBounds.top < hitboxY + hitboxHeight;
    };


    damageEnemy(enemy) {
        if (enemy instanceof meleeDemon) {
            enemy.killMeleeDemon();
        } else if (enemy instanceof rangeDemon) {
            enemy.killRangeDemon();
        } else if (enemy instanceof Endboss) {
            enemy.killEndboss();
        }
    };

};

