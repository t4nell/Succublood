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
    spacePressed = false;
    collectables = [];
    rubyCount = 0;
    enemyProjectiles = [];
    bossProjectiles = [];
    gameStarted = false;
    gameEnded = false;
    imprintVisible = false;
    startScreen;
    endScreen;
    imprintScreen;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.rubyCounter = new RubyCounter();
        this.startScreen = new StartScreen(canvas.width, canvas.height);
        this.endScreen = new EndScreen(canvas.width, canvas.height);
        this.imprintScreen = new ImprintScreen(canvas.width, canvas.height);
        this.level = createLevel1();
        this.setupMouseEvents();
        this.draw();
    };


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.gameStarted && !this.imprintVisible) {
            this.startScreen.draw(this.ctx);
        } else if (!this.gameStarted && this.imprintVisible) {
            this.startScreen.draw(this.ctx);
            this.imprintScreen.draw(this.ctx);
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
        }


        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    };
    

    setupMouseEvents() {
        this.canvas.addEventListener('click', (event) => {
            let rect = this.canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;
            
            if (!this.gameStarted && !this.imprintVisible) {
                if (this.startScreen.isButtonClicked(mouseX, mouseY)) {
                    this.startGame();
                } else if (this.startScreen.isImprintButtonClicked(mouseX, mouseY)) {
                    this.showImprint();
                } else if (this.startScreen.isControlsButtonClicked(mouseX, mouseY)) {
                    this.showControls();
                }   
            } else if (!this.gameStarted && this.imprintVisible) {
                if (this.imprintScreen.isBackButtonClicked(mouseX, mouseY)) {
                    this.hideImprint();
                }
            } else if (this.gameEnded) {
                if (this.endScreen.isButtonClicked(mouseX, mouseY)) {
                    this.restartGame();
                }
            }
        });
        
        this.canvas.addEventListener('mousemove', (event) => {
            let rect = this.canvas.getBoundingClientRect();
            let mouseX = event.clientX - rect.left;
            let mouseY = event.clientY - rect.top;

            if (!this.gameStarted && !this.imprintVisible) {
                if (this.startScreen.isButtonClicked(mouseX, mouseY)) {
                    this.canvas.style.cursor = 'pointer';
                    this.startScreen.setHovered(true);
                    this.startScreen.setImprintHovered(false);
                    this.startScreen.setControlsHovered(false);
                } else if (this.startScreen.isImprintButtonClicked(mouseX, mouseY)) {
                    this.canvas.style.cursor = 'pointer';
                    this.startScreen.setHovered(false);
                    this.startScreen.setImprintHovered(true);
                    this.startScreen.setControlsHovered(false);
                } else if (this.startScreen.isControlsButtonClicked(mouseX, mouseY)) {
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
                if (this.imprintScreen.isBackButtonClicked(mouseX, mouseY)) {
                    this.canvas.style.cursor = 'pointer';
                    this.imprintScreen.setBackHovered(true);
                } else {
                    this.canvas.style.cursor = 'default';
                    this.imprintScreen.setBackHovered(false);
                }
            } else if (this.gameEnded) {
                if (this.endScreen.isButtonClicked(mouseX, mouseY)) {
                    this.canvas.style.cursor = 'pointer';
                } else {
                    this.canvas.style.cursor = 'default';
                }
            } else {
                this.canvas.style.cursor = 'default';
            }
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            if (!this.gameStarted && !this.imprintVisible) {
                this.startScreen.setHovered(false);
                this.startScreen.setImprintHovered(false);
                this.startScreen.setControlsHovered(false);
            } else if (!this.gameStarted && this.imprintVisible) {
                this.imprintScreen.setBackHovered(false);
            }
            this.canvas.style.cursor = 'default';
        });
    };


    showControls() {
        console.log('Controls button clicked!');
    };


    startGame() {
        if (!this.gameStarted) {
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


    restartGame() {
        this.clearAllIntervals();
        this.gameStarted = false;
        this.gameEnded = false;
        this.imprintVisible = false;

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
        this.startScreen.show();
    };


    clearAllIntervals() {
        location.reload();
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
        this.gameEnded = true;
        this.endScreen.show('victory');
    };


    showGameOverScreen() {
        setTimeout(() => {
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
        setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkCollisions();
                this.checkGameEnd();
            }
        }, 300);
        setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkThrowObjects();
            }    
        }, 125);
        setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkFireballCollisions();
            }
        }, 25);
        setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkCollectableCollisions();
            }
        }, 50);
        setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkEnemyProjectileCollisions();
            }
        }, 25);
        setInterval(() => {
            if (this.gameStarted && !this.gameEnded) {
                this.checkBossProjectileCollisions();
            }
        }, 25);
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
        if (this.keyboard.SPACE && !this.spacePressed && !this.character.isDying && !this.character.isAttacking && !this.character.isMeleeAttacking) {
            this.character.startAttack();
            this.spacePressed = true;
        }
        if (!this.keyboard.SPACE) {
            this.spacePressed = false;
        }
    };


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isDead() && !enemy.isAttacking) {
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
        if(mo.otherDirection) {
            this.flipImage(mo);
        };
        mo.draw(this.ctx);

        mo.drawBorder(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        };
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

