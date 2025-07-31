class ThrowableObject extends MovableObject {
    IMAGES_skull = [
        {path:'img/skull/skull1.png', width: 18, height: 24, offsetX: -9},
        {path:'img/skull/skull2.png', width: 18, height: 24, offsetX: -9},
        {path:'img/skull/skull3.png', width: 18, height: 24, offsetX: -9},
        {path:'img/skull/skull4.png', width: 18, height: 24, offsetX: -9},
        {path:'img/skull/skull5.png', width: 18, height: 24, offsetX: -9}
    ];
    currentImage = 0;
    zoom = 2;

    constructor(x, y) {
        super().loadImage('img/skull/skull1.png');
        this.loadImages(this.IMAGES_skull.map(sprite => sprite.path));
        this.x = x;
        this.y = y - 100;
        this.height = 24;
        this.width = 18;
        this.offsetX = -9;
        this.throw();
        this.animate();
    };

    animate() {
        setInterval(() => {
            this.animateImages(this.IMAGES_skull);
        }, 1000 / 20);
    }


    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 30;
        }, 25);
    };
    

}