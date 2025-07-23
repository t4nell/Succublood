class World {
    character = new Character();  
    level = level_1;
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
    };


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.sky);
        this.addObjectsToMap(this.level.enemies.filter(e => e instanceof Crow));
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies.filter(e => !(e instanceof Crow)));
        
        this.ctx.translate(-this.cameraX, 0);


        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    };


    setWorld() {
        this.character.world = this;
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

