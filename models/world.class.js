class World {
    character = new Character();  
    enemies = [
        new Demon(),
        new Demon(),
        new Demon(),
    ];
    sky = new Sky();
    canvas;
    ctx;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw()
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.sky.img, this.sky.x, this.sky.y, this.sky.height, this.sky.width);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height)
        })

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
};

