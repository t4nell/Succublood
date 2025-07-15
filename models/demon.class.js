class Demon extends MovableObject {
    constructor() {
        super().loadImage('../img/enemies/demon1/idle/idle1.png');
        this.x = 350 + Math.random() * 500;
        this.y = 300;
        this.height = 75;
        this.width = 39;
    }
};

