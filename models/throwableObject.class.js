class ThrowableObject extends MovableObject {
    IMAGES_fireball = [
        {path:'img/fireball/fireball1.png', width: 20, height: 36, offsetX: -10},
        {path:'img/fireball/fireball2.png', width: 20, height: 36, offsetX: -10},
        {path:'img/fireball/fireball3.png', width: 20, height: 36, offsetX: -10},
        {path:'img/fireball/fireball4.png', width: 20, height: 36, offsetX: -10},
        {path:'img/fireball/fireball5.png', width: 20, height: 36, offsetX: -10},
        {path:'img/fireball/fireball6.png', width: 20, height: 36, offsetX: -10},
        {path:'img/fireball/fireball7.png', width: 20, height: 36, offsetX: -10},
        {path:'img/fireball/fireball8.png', width: 20, height: 36, offsetX: -10},
        {path:'img/fireball/fireball9.png', width: 20, height: 36, offsetX: -10},
        {path:'img/fireball/fireball10.png', width: 20, height: 36, offsetX: -10},
        {path:'img/fireball/fireball11.png', width: 20, height: 36, offsetX: -10},
        {path:'img/fireball/fireball12.png', width: 20, height: 36, offsetX: -10}
    ];
    currentImage = 0;
    zoom = 2;

    constructor(x, y) {
        super().loadImage('img/fireball/fireball1.png');
        this.loadImages(this.IMAGES_fireball.map(sprite => sprite.path));
        this.x = x;
        this.y = y - 100;
        this.height = 36;
        this.width = 20;
        this.offsetX = -10;
        this.throw();
        this.animate();
    };

    animate() {
        setInterval(() => {
            this.animateImages(this.IMAGES_fireball);
        }, 1000 / 20);
    }


    throw() {
        // this.speedY = 35;
        // this.applyGravity();
        setInterval(() => {
            this.x += 20;
        }, 25);
    };
    

}