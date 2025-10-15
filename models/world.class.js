class World {
    character = new Character();  
    statusLive = new StatusBar(this.character.HP, 30, 30);
    statusMana = new StatusBar(this.character.MANA, 30, 70, 230);
    level = level_1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    throwableObject = [];
    SPressed = false;
    collectables = [];
    rubyCount = 0;
    enemyProjectiles = [];
    bossProjectiles = [];
    gameStarted = false;
    gameEnded = false;
    imprintVisible = false;
    controlsVisible = false;
    startScreen;
    endScreen;
    imprintScreen;
    controlsScreen;
    fullscreenButton;
    muteButton;
    intervals = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.rubyCounter = new RubyCounter();
        this.startScreen = new StartScreen(canvas.width, canvas.height);
        this.endScreen = new EndScreen(canvas.width, canvas.height);
        this.imprintScreen = new ImprintScreen(canvas.width, canvas.height);
        this.controlsScreen = new ControlsScreen(canvas.width, canvas.height);
        this.fullscreenButton = new FullscreenButton(canvas.width, canvas.height);
        this.muteButton = new MuteButton(canvas.width, canvas.height);
        this.level = createLevel1();
        this.loadSounds();
        this.setupMouseEvents();
        this.draw();
    };


    loadSounds() {
        soundManager.loadSound('startScreenBackgroundMusic', 'audio/gameSounds/startScreenBackground.mp3', true);
        soundManager.loadSound('gameBackground', 'audio/gameSounds/gameBackground.mp3', true);
        soundManager.loadSound('victory', 'audio/gameSounds/victory.mp3');
        soundManager.loadSound('buttonClick', 'audio/gameSounds/buttonClick.mp3');

        
        soundManager.loadSound('characterAttackVoice', 'audio/gameSounds/characterAttackVoice.mp3');
        soundManager.loadSound('footSteps', 'audio/gameSounds/footSteps.mp3', true);
        soundManager.loadSound('characterHurt', 'audio/gameSounds/characterHurt.mp3');
        soundManager.loadSound('characterDeath', 'audio/gameSounds/characterDeath.mp3');
        soundManager.loadSound('jump', 'audio/gameSounds/jump.mp3');
        
        soundManager.loadSound('meleeDemonAttack', 'audio/gameSounds/meleeDemonAttack.mp3');
        soundManager.loadSound('rangeDemonAttack', 'audio/gameSounds/rangeDemonAttack.mp3');
        soundManager.loadSound('demonHurt', 'audio/gameSounds/demonHurt.mp3');
        soundManager.loadSound('meleeDemonDeath', 'audio/gameSounds/meleeDemonDeath.mp3');
        soundManager.loadSound('rangeDemonDeath', 'audio/gameSounds/rangeDemonDeath.mp3');
        
        soundManager.loadSound('bossBackground', 'audio/gameSounds/bossBackground.mp3', true);
        soundManager.loadSound('bossAttack', 'audio/gameSounds/bossAttack.mp3');
        soundManager.loadSound('bossHurt', 'audio/gameSounds/bossHurt.mp3');
        soundManager.loadSound('bossDeath', 'audio/gameSounds/bossDeath.mp3');
        
        soundManager.loadSound('collectRuby', 'audio/gameSounds/collectRuby.mp3');
        soundManager.loadSound('collectPotion', 'audio/gameSounds/collectPotion.mp3');

        soundManager.loadSound('fireball', 'audio/gameSounds/fireball.mp3');
        soundManager.loadSound('whipSwing', 'audio/gameSounds/whipSwing.mp3');
        soundManager.loadSound('whipCrack', 'audio/gameSounds/whipCrack.mp3');
    };


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.gameStarted && !this.imprintVisible && !this.controlsVisible) {
            this.startScreen.draw(this.ctx);
            this.fullscreenButton.draw(this.ctx);
            this.muteButton.draw(this.ctx);
        } else if (!this.gameStarted && this.imprintVisible) {
            this.startScreen.draw(this.ctx);
            this.imprintScreen.draw(this.ctx);
            this.fullscreenButton.draw(this.ctx);
            this.muteButton.draw(this.ctx);
        } else if (!this.gameStarted && this.controlsVisible) { 
            this.startScreen.draw(this.ctx);
            this.controlsScreen.draw(this.ctx);
            this.fullscreenButton.draw(this.ctx);
            this.muteButton.draw(this.ctx);
        } else if (this.gameEnded) {
            if (this.endScreen.fadePhase === 'darkening') {
                this.addObjectsToMap(this.level.sky);
                this.addObjectsToMap(this.level.backgroundCrows);
                this.ctx.translate(this.cameraX, 0);
                this.addObjectsToMap(this.level.backgroundObjects);
                this.addObjectsToMap(this.level.enemies);
                this.addToMap(this.character);
                this.addObjectsToMap(this.throwableObject);
                this.addObjectsToMap(this.collectables);
                this.addObjectsToMap(this.level.manaPotions);
                this.addObjectsToMap(this.level.rubys);
                this.addObjectsToMap(this.enemyProjectiles);
                this.addObjectsToMap(this.bossProjectiles);
                this.ctx.translate(-this.cameraX, 0);
                this.statusLive.draw(this.ctx);
                this.statusMana.draw(this.ctx);
                this.rubyCounter.draw(this.ctx, this.rubyCount, this.canvas.width);
            }
            this.endScreen.draw(this.ctx);
            this.fullscreenButton.draw(this.ctx);
            this.muteButton.draw(this.ctx);
        } else {
            this.addObjectsToMap(this.level.sky);
            this.addObjectsToMap(this.level.backgroundCrows);
            this.ctx.translate(this.cameraX, 0);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.enemies);
            this.addToMap(this.character);
            this.addObjectsToMap(this.throwableObject);
            this.addObjectsToMap(this.collectables);
            this.addObjectsToMap(this.level.manaPotions);
            this.addObjectsToMap(this.level.rubys);
            this.addObjectsToMap(this.enemyProjectiles);
            this.addObjectsToMap(this.bossProjectiles);
            this.ctx.translate(-this.cameraX, 0);
            this.statusLive.draw(this.ctx);
            this.statusMana.draw(this.ctx);
            this.rubyCounter.draw(this.ctx, this.rubyCount, this.canvas.width);
            this.fullscreenButton.draw(this.ctx);
            this.muteButton.draw(this.ctx);
        }

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    };
    

    setupMouseEvents() {
        this.canvas.addEventListener('click', (event) => {
            if (!this.startScreenMusicStarted && !this.gameStarted) {
                soundManager.playSound('startScreenBackgroundMusic', 0.2);
                this.startScreenMusicStarted = true;
            }
            let rect = this.canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;

            if (this.muteButton.isButtonClicked(mouseX, mouseY)) {
                soundManager.playSound('buttonClick', 0.7);
                soundManager.toggleMute();
                return;
            }

            if (this.fullscreenButton.isButtonClicked(mouseX, mouseY)) {
                soundManager.playSound('buttonClick', 0.7);
                fullscreenManager.toggleFullscreen();
                return;
            }

            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const canvasX = mouseX * scaleX;
            const canvasY = mouseY * scaleY;
            
            if (!this.gameStarted && !this.imprintVisible && !this.controlsVisible) {
                if (this.startScreen.isCharacterClicked(canvasX, canvasY)) {
                    soundManager.playSound('characterHurt', 0.7);
                    this.startScreen.triggerHurtAnimation();
                }
                else if (this.startScreen.isButtonClicked(canvasX, canvasY)) {
                    soundManager.playSound('buttonClick', 0.7);
                    this.startGame();
                } else if (this.startScreen.isImprintButtonClicked(canvasX, canvasY)) {
                    soundManager.playSound('buttonClick', 0.7);
                    this.showImprint();
                } else if (this.startScreen.isControlsButtonClicked(canvasX, canvasY)) {
                    soundManager.playSound('buttonClick', 0.7);
                    this.showControls();
                }   
            } else if (!this.gameStarted && this.imprintVisible) {
                if (this.imprintScreen.isBackButtonClicked(canvasX, canvasY)) {
                    soundManager.playSound('buttonClick', 0.7);
                    this.hideImprint();
                }
            } else if (!this.gameStarted && this.controlsVisible) {
                if (this.controlsScreen.isBackButtonClicked(canvasX, canvasY)) {
                    soundManager.playSound('buttonClick', 0.7);
                    this.hideControls();
                }
            } else if (this.gameEnded) {
                if (this.endScreen.isButtonClicked(canvasX, canvasY)) {
                    soundManager.playSound('buttonClick', 0.7);
                    this.restartGame();
                }
            }
        });
        
        this.canvas.addEventListener('mousemove', (event) => {
            let rect = this.canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;

            if (this.muteButton.isButtonClicked(mouseX, mouseY)) {
                this.canvas.style.cursor = 'pointer';
                this.muteButton.setHovered(true);
                this.fullscreenButton.setHovered(false);
                return;
            } else {
                this.muteButton.setHovered(false);
            }

            if (this.fullscreenButton.isButtonClicked(mouseX, mouseY)) {
                this.canvas.style.cursor = 'pointer';
                this.fullscreenButton.setHovered(true);
                return;
            } else {
                this.fullscreenButton.setHovered(false);
            }

            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            const canvasX = mouseX * scaleX;
            const canvasY = mouseY * scaleY;
            if (!this.gameStarted && !this.imprintVisible && !this.controlsVisible) {
                if (this.startScreen.isCharacterClicked(canvasX, canvasY)) {
                    this.canvas.style.cursor = 'pointer';
                    this.startScreen.setHovered(false);
                    this.startScreen.setImprintHovered(false);
                    this.startScreen.setControlsHovered(false);
                }
                else if (this.startScreen.isButtonClicked(canvasX, canvasY)) {
                    this.canvas.style.cursor = 'pointer';
                    this.startScreen.setHovered(true);
                    this.startScreen.setImprintHovered(false);
                    this.startScreen.setControlsHovered(false);
                } else if (this.startScreen.isImprintButtonClicked(canvasX, canvasY)) {
                    this.canvas.style.cursor = 'pointer';
                    this.startScreen.setHovered(false);
                    this.startScreen.setImprintHovered(true);
                    this.startScreen.setControlsHovered(false);
                } else if (this.startScreen.isControlsButtonClicked(canvasX, canvasY)) {
                    this.canvas.style.cursor = 'pointer';
                    this.startScreen.setHovered(false);
                    this.startScreen.setImprintHovered(false);
                    this.startScreen.setControlsHovered(true);
                } else {
                    this.canvas.style.cursor = 'default';
                    this.startScreen.setHovered(false);
                    this.startScreen.setImprintHovered(false);
                    this.startScreen.setControlsHovered(false);
                }
            } else if (!this.gameStarted && this.imprintVisible) {
                if (this.imprintScreen.isBackButtonClicked(canvasX, canvasY)) {
                    this.canvas.style.cursor = 'pointer';
                    this.imprintScreen.setBackHovered(true);
                } else {
                    this.canvas.style.cursor = 'default';
                    this.imprintScreen.setBackHovered(false);
                }
            } else if (!this.gameStarted && this.controlsVisible) {
                if (this.controlsScreen.isBackButtonClicked(canvasX, canvasY)) {
                    this.canvas.style.cursor = 'pointer';
                    this.controlsScreen.setBackHovered(true);
                } else {
                    this.canvas.style.cursor = 'default';
                    this.controlsScreen.setBackHovered(false);
                }
            } else if (this.gameEnded) {
                if (this.endScreen.isButtonClicked(canvasX, canvasY)) {
                    this.canvas.style.cursor = 'pointer';
                    this.endScreen.setMenuHovered(true);
                } else {
                    this.canvas.style.cursor = 'default';
                    this.endScreen.setMenuHovered(false);
                }
            } else {
                this.canvas.style.cursor = 'default';
            }
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.fullscreenButton.setHovered(false);
            this.muteButton.setHovered(false);
            if (!this.gameStarted && !this.imprintVisible && !this.controlsVisible) {
                this.startScreen.setHovered(false);
                this.startScreen.setImprintHovered(false);
                this.startScreen.setControlsHovered(false);
            } else if (!this.gameStarted && this.imprintVisible) {
                this.imprintScreen.setBackHovered(false);
            } else if (!this.gameStarted && this.controlsVisible) {
                this.controlsScreen.setBackHovered(false);
            } else if (this.gameEnded) {
                this.endScreen.setMenuHovered(false);
            }
            this.canvas.style.cursor = 'default';
        });
    };


    showControls() {
        this.controlsVisible = true;
        this.controlsScreen.show();
    };


    startGame() {
        if (!this.gameStarted) {
            soundManager.stopSound('startScreenBackgroundMusic');
            soundManager.playSound('gameBackground', 0.2);
            this.gameStarted = true;
            this.startScreen.hide();
            this.setWorld();
            this.run();
        }
    };


    showImprint() {
        this.imprintVisible = true;
        this.imprintScreen.show();
    };


    hideImprint() {
        this.imprintVisible = false;
        this.imprintScreen.hide();
    };


    hideControls() {
        this.controlsVisible = false;
        this.controlsScreen.hide();
    };


    restartGame() {
        this.clearAllIntervals();
        this.gameStarted = false;
        this.gameEnded = false;
        this.imprintVisible = false;
        this.controlsVisible = false;

        soundManager.stopSound('victory');

        this.character = new Character();
        this.statusLive = new StatusBar(this.character.HP, 30, 30);
        this.statusMana = new StatusBar(this.character.MANA, 30, 70, 230);
        this.rubyCount = 0;

        this.level = createLevel1();

        this.throwableObject = [];
        this.collectables = [];
        this.enemyProjectiles = [];
        this.bossProjectiles = [];
        this.cameraX = 0;

        this.endScreen.hide();
        this.imprintScreen.hide();
        this.controlsScreen.hide();
        this.startScreen.show();

        soundManager.playSound('startScreenBackgroundMusic', 0.2);
        
    };


    clearAllIntervals() {
    // World Intervale clearen
    this.intervals.forEach(id => clearInterval(id));
    this.intervals = [];
    
    // Character Intervale clearen
    if (this.character && this.character.clearIntervals) {
        this.character.clearIntervals();
    }
    
    // Enemy Intervale clearen
    if (this.level && this.level.enemies) {
        this.level.enemies.forEach(enemy => {
            if (enemy.clearIntervals) enemy.clearIntervals();
        });
    }
    
    // Background Object Intervale clearen
    if (this.level && this.level.backgroundObjects) {
        this.level.backgroundObjects.forEach(obj => {
            if (obj.clearIntervals) obj.clearIntervals();
        });
    }
    
    // Sky Intervale clearen
    if (this.level && this.level.sky) {
        this.level.sky.forEach(sky => {
            if (sky.clearIntervals) sky.clearIntervals();
        });
    }
    
    // Crows Intervale clearen
    if (this.level && this.level.backgroundCrows) {
        this.level.backgroundCrows.forEach(crow => {
            if (crow.clearIntervals) crow.clearIntervals();
        });
    }
    
    // Collectables clearen
    [...this.throwableObject, ...this.collectables, ...this.enemyProjectiles, ...this.bossProjectiles].forEach(obj => {
        if (obj.clearIntervals) obj.clearIntervals();
    });
    
    if (this.level && this.level.manaPotions) {
        this.level.manaPotions.forEach(potion => {
            if (potion.clearIntervals) potion.clearIntervals();
        });
    }
    
    if (this.level && this.level.rubys) {
        this.level.rubys.forEach(ruby => {
            if (ruby.clearIntervals) ruby.clearIntervals();
        });
    }
    
    // StartScreen Intervale clearen
    if (this.startScreen && this.startScreen.clearIntervals) {
        this.startScreen.clearIntervals();
    }
};


    checkGameEnd() {
        if (this.character.isDead() && this.character.deathAnimationComplete) {
            this.showGameOverScreen();
        }
        let allEnemiesDead = this.level.enemies.every(enemy => enemy.isDead());
        if (allEnemiesDead && this.level.enemies.length > 0) {
            setTimeout(() => {
                this.showVictoryScreen();
            }, 1000);
        }
    };
    
    
    showVictoryScreen() {
        setTimeout(() => {
            this.gameEnded = true;
            this.endScreen.show('victory'); 
        }, 5000);
    };


    showGameOverScreen() {
        setTimeout(() => {
            soundManager.stopSound('gameBackground');
            this.gameEnded = true;
            this.endScreen.show('defeat');
        }, 250);
    };


    setWorld() {
            this.character.world = this;
        for (const backgroundObject of this.level.backgroundObjects) {
            backgroundObject.world = this
        };
        for (const enemy of this.level.enemies) {
            enemy.world = this;
        };
    };


    run() {
        this.intervals.push(setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkCollisions();
                this.checkGameEnd();
            }
        }, 300));
        this.intervals.push(setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkThrowObjects();
            }    
        }, 125));
        this.intervals.push(setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkFireballCollisions();
            }
        }, 25));
        this.intervals.push(setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkCollectableCollisions();
            }
        }, 50));
        this.intervals.push(setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkEnemyProjectileCollisions();
            }
        }, 25));
        this.intervals.push(setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkBossProjectileCollisions();
            }
        }, 25));
    };

    

    
    spawnFireball() {
        if (!this.character.isDying && this.character.MANA > 0) {
            let fireball = new ThrowableObject(this.character.x + 34, this.character.y + 34);
            this.throwableObject.push(fireball);
            this.character.MANA -= 20;
            this.statusMana.setPercentage(this.character.MANA);
        }
    };

    
    spawnRuby(x, y) {
        let ruby = new Ruby(x, y);
        this.collectables.push(ruby);
    };
    
    
    spawnHealPotion(x, y) {
        let healPotion = new HealPotion(x, y);
        this.collectables.push(healPotion);
    };


    spawnManaPotion(x, y) {
        let manaPotion = new ManaPotion();
        manaPotion.x = x;
        manaPotion.y = y;
        manaPotion.baseY = manaPotion.y;
        this.level.manaPotions.push(manaPotion);
    };

    
    checkThrowObjects() {
        if (this.keyboard.S && !this.SPressed && !this.character.isDying && !this.character.isAttacking && !this.character.isMeleeAttacking) {
            this.character.startRangeAttack();
            this.SPressed = true;
        }
        if (!this.keyboard.S) {
            this.SPressed = false;
        }
    };


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            let characterIsInvulnerable = false;

            if (this.character.isMeleeAttacking) {
                const { x: hitboxX, y: hitboxY, width: hitboxWidth, height: hitboxHeight } = this.character.getMeleeHitbox();

                const enemyLeft = enemy.x + enemy.offsetX;
                const enemyRight = enemyLeft + enemy.width;
                const enemyBottom = enemy.y;
                const enemyTop = enemy.y - enemy.height;

                const enemyInMeleeRange =
                    enemyRight > hitboxX &&
                    enemyLeft < hitboxX + hitboxWidth &&
                    enemyBottom > hitboxY &&
                    enemyTop < hitboxY + hitboxHeight;

                if (enemyInMeleeRange) {
                    characterIsInvulnerable = true;
                }
            }

            if (this.character.isColliding(enemy) &&
                !this.character.isHurt() &&
                !enemy.isDead() &&
                !enemy.isAttacking &&
                !characterIsInvulnerable) {
                this.character.hit();
                this.statusLive.setPercentage(this.character.HP);
            }
        });
    };


    checkFireballCollisions() {
        this.throwableObject.forEach(fireball => {
            this.level.enemies.forEach(enemy => {
                if (fireball.isColliding(enemy)) {
                    this.removeFireball(fireball);
                    if (enemy instanceof meleeDemon) {
                        enemy.world = this;
                        enemy.killMeleeDemon();
                    } else if (enemy instanceof rangeDemon) {
                        enemy.world = this;
                        enemy.killRangeDemon();
                    } else if (enemy instanceof Endboss) {
                        enemy.world = this;
                        enemy.killEndboss();
                    }
                }
            });
        });
    };


    checkCollectableCollisions() {
        this.collectables.forEach((collectable, index) => {
            if (this.character.isColliding(collectable) && !collectable.collected) {
                collectable.world = this;
                collectable.collect();
                this.collectables.splice(index, 1);
            }
        });
        this.level.manaPotions.forEach((manaPotion, index) => {
            if (this.character.isColliding(manaPotion) && !manaPotion.collected) {
                manaPotion.world = this;
                manaPotion.collect();
                this.level.manaPotions.splice(index, 1);
            }
        });
        this.level.rubys.forEach((ruby, index) => {
            if (this.character.isColliding(ruby) && !ruby.collected) {
                ruby.world = this;
                ruby.collect();
                this.level.rubys.splice(index, 1);
            }
        });
    };


    checkEnemyProjectileCollisions() {
        this.enemyProjectiles.forEach((projectile, index) => {
            if (this.character.isColliding(projectile) && !this.character.isHurt() && !this.character.isDying) {
                if (!projectile.isExploding) {
                    projectile.startExplosion();
                    this.character.hit();
                    this.statusLive.setPercentage(this.character.HP);
                }
            }
            if (projectile.isExplosionFinished() || projectile.x < -500 || projectile.x > 6500) {
                this.enemyProjectiles.splice(index, 1);
            }
        });
    };


    checkBossProjectileCollisions() {
        this.bossProjectiles.forEach((projectile, index) => {
            if (this.character.isColliding(projectile) && !this.character.isHurt() && !this.character.isDying) {
                if (!projectile.isExploding) {
                    projectile.startExplosion();
                    this.character.hit();
                    this.statusLive.setPercentage(this.character.HP);
                }
            }
            if (projectile.isExplosionFinished() || projectile.x < -500 || projectile.x > 6500) {
                this.bossProjectiles.splice(index, 1);
            }
        });
    };


    removeEnemy(enemy) {
        let index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.level.enemies.splice(index, 1);
        }
    };


    removeFireball(fireball) {
        let index = this.throwableObject.indexOf(fireball);
        if (index > -1) {
            this.throwableObject.splice(index, 1);
        }
    };


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawBorder(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }

        //wieder entfernen, nur zum Testen der Hitboxen
        if (mo instanceof Character) {
            mo.drawMeleeHitbox(this.ctx);
        }
    };

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.offsetX / 6, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    };

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    };
};

