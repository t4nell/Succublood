class Crow extends MovableObject {
    IMAGES_FLY = [
        {path:'img/crow/crow1.png', width: 32, height: 32, offsetX: -16},
        {path:'img/crow/crow2.png', width: 32, height: 32, offsetX: -16},
        {path:'img/crow/crow3.png', width: 32, height: 32, offsetX: -16},
        {path:'img/crow/crow4.png', width: 32, height: 32, offsetX: -16},
        {path:'img/crow/crow5.png', width: 32, height: 32, offsetX: -16},
        {path:'img/crow/crow6.png', width: 32, height: 32, offsetX: -16}
    ];
    currentImage = 0;
    zoom = 1;

    constructor() {
        super().loadImage('img/crow/crow1.png');
        this.loadImages(this.IMAGES_FLY.map(sprite => sprite.path));
        this.x = 1200 + Math.random() * 5000;
        this.y = 30 + Math.random() * 100;
        this.speed = 0.5 + Math.random() * 0.5;
        this.animate();
    };

    animate() {
        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);

        setInterval(() => {
            this.animateImages(this.IMAGES_FLY);
        }, 1000 / 10);
    };
};