class World {
    character = new Character();  
    enemies = [
        new Demon(),
        new Demon(),
        new Demon(),
    ];
    sky = new Sky();
    backgroundObjects = [
        new BackgroundObject('img/background/graves.png', 0, 0),
        new BackgroundObject('img/background/backTrees.png', 0, 0),
        new BackgroundObject('img/background/crypt.png', 0, 0),
        new BackgroundObject('img/background/wall.png', 0, 0),
        new BackgroundObject('img/background/ground.png', 0, 0),
        new BackgroundObject('img/background/tree.png', 0, 0),
        new BackgroundObject('img/background/bones.png', 0, 0),

        new BackgroundObject('img/background/graves.png', 1344, 0),
        new BackgroundObject('img/background/backTrees.png', 1344, 0),
        new BackgroundObject('img/background/crypt.png', 1344, 0),
        new BackgroundObject('img/background/wall.png', 1344, 0),
        new BackgroundObject('img/background/ground.png', 1344, 0),
        new BackgroundObject('img/background/tree.png', 1344, 0),
        new BackgroundObject('img/background/bones.png', 1344, 0),
    ];
    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0)
        this.addToMap(this.sky);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.ctx.translate(-this.cameraX, 0)


        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    setWorld() {
        this.character.world = this;
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    addToMap(mo) {
        if(mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width / 6, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }

        this.ctx.drawImage(mo.img, mo.x + mo.offsetX, mo.y, mo.width, mo.height);

        if(mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }


};

