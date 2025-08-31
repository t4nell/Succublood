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
    startScreen;
    endScreen;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.rubyCounter = new RubyCounter();
        this.startScreen = new StartScreen(canvas.width, canvas.height);
        this.endScreen = new EndScreen(canvas.width, canvas.height);
        this.setupMouseEvents();
        this.draw();
    };


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.gameStarted) {
            this.startScreen.draw(this.ctx);
        } else if (this.gameEnded) {
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

            if (!this.gameStarted) {
                if (this.startScreen.isButtonClicked(mouseX, mouseY)) {
                    this.startGame();
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

            if (!this.gameStarted) {
                if (this.startScreen.isButtonClicked(mouseX, mouseY)) {
                    this.canvas.style.cursor = 'pointer';
                } else {
                    this.canvas.style.cursor = 'default';
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
    };


    startGame() {
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.startScreen.hide();

            this.setWorld();
            this.run();
        }
    };


    // Spiel neu starten
    restartGame() {
        // Spiel-Status zurücksetzen
        this.gameStarted = false;
        this.gameEnded = false;
        
        // Character zurücksetzen
        this.character = new Character();
        
        // Status Bars neu erstellen
        this.statusLive = new StatusBar(this.character.HP, 30, 30);
        this.statusMana = new StatusBar(this.character.MANA, 30, 70, 230);
        
        // Ruby Count zurücksetzen
        this.rubyCount = 0;
        
        // Level neu laden
        this.level = level_1;
        
        // Arrays leeren
        this.throwableObject = [];
        this.collectables = [];
        this.enemyProjectiles = [];
        this.bossProjectiles = [];
        
        // Kamera zurücksetzen
        this.cameraX = 0;
        
        // World-Referenzen neu setzen
        this.setWorld();
        
        // EndScreen verstecken, StartScreen anzeigen
        this.endScreen.hide();
        this.startScreen.show();
    };


    // Spiel-Ende prüfen
    checkGameEnd() {
        // Prüfe ob Character tot ist
        if (this.character.isDead() && this.character.deathAnimationComplete) {
            this.showGameOverScreen();
        }
        
        // Prüfe ob alle Enemies tot sind
        let allEnemiesDead = this.level.enemies.every(enemy => enemy.isDead());
        if (allEnemiesDead && this.level.enemies.length > 0) {
            setTimeout(() => {
                this.showVictoryScreen();
            }, 1000);
        }
    }


    // Victory Screen anzeigen
    showVictoryScreen() {
        this.gameEnded = true;
        this.endScreen.show('victory');
    };


    // Game Over Screen anzeigen
    showGameOverScreen() {
        this.gameEnded = true;
        this.endScreen.show('defeat');
    }


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
                this.checkGameEnd(); // Methode aufrufen
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
        if (this.keyboard.SPACE && !this.spacePressed && !this.character.isDying && !this.character.isAttacking) {
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

