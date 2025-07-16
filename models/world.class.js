class World {
    character = new Character();  
    enemies = [
        new Demon(),
        new Demon(),
        new Demon(),
    ];
    sky = new Sky();
    backgroundObjects = [
        new BackgroundObject('../img/background/graves.png', 0, 0),
        new BackgroundObject('../img/background/backTrees.png', 0, 0),
        new BackgroundObject('../img/background/crypt.png', 0, 0),
        new BackgroundObject('../img/background/wall.png', 0, 0),
        new BackgroundObject('../img/background/ground.png', 0, 0),
        new BackgroundObject('../img/background/ground.png', 0, 0),
        new BackgroundObject('../img/background/tree.png', 0, 0),
        new BackgroundObject('../img/background/bones.png', 0, 0),
    ];
    canvas;
    ctx;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw()
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addToMap(this.sky);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);



        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x + mo.offsetX, mo.y, mo.width, mo.height);
    }


};

