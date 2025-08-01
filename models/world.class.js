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
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.addObjectsToMap(this.level.sky);
        this.addObjectsToMap(this.level.backgroundCrows);

        this.ctx.translate(this.cameraX, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.enemies);
        
        this.ctx.translate(-this.cameraX, 0);
        
        this.statusLive.draw(this.ctx);
        this.statusMana.draw(this.ctx);


        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    };


    setWorld() {
        this.character.world = this;
        for (const backgroundObject of this.level.backgroundObjects) {
            backgroundObject.world = this
        };
    };


    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 300);

        setInterval(() => {
            this.checkThrowObjects();
        }, 125);

        setInterval(() => {
            this.checkFireballCollisions();
        }, 25);
    };


    checkThrowObjects() {
        if (this.keyboard.SPACE && !this.character.isDying) {
            let fireball = new ThrowableObject(this.character.x + 34, this.character.y + 34);
            this.throwableObject.push(fireball);
        }
    };


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt() && !enemy.isDead()) {
                this.character.hit();
                this.statusLive.setPercentage(this.character.HP);
            }
        });
    };


    checkFireballCollisions() {
        this.throwableObject.forEach(fireball => {
            this.level.enemies.forEach(enemy => {
                if (fireball.isColliding(enemy)) {
                    this.removefireball(fireball);
                    if (enemy instanceof Demon) {
                        enemy.hit();
                        if (enemy.isDead()) {
                            setTimeout(() => {
                                this.removeEnemy(enemy);
                            }, enemy.IMAGES_DEAD.length * 200);
                        }
                    }
                }
            });
        });
    };


    removeEnemy(enemy) {
        let index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.level.enemies.splice(index, 1);
        }
    };


    removefireball(fireball) {
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

