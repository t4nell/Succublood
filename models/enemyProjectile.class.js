class EnemyProjectile extends MovableObject {
    IMAGES_CHARGE = [
        {path:'img/enemies/demon1/charge/charge1.png', width: 23, height: 3, offsetX: -12},
        {path:'img/enemies/demon1/charge/charge2.png', width: 28, height: 3, offsetX: -14},
        {path:'img/enemies/demon1/charge/charge3.png', width: 6, height: 6, offsetX: -3},
        {path:'img/enemies/demon1/charge/charge4.png', width: 13, height: 17, offsetX: -7},
        {path:'img/enemies/demon1/charge/charge5.png', width: 21, height: 31, offsetX: -11},
        {path:'img/enemies/demon1/charge/charge6.png', width: 31, height: 44, offsetX: -16},
        {path:'img/enemies/demon1/charge/charge7.png', width: 32, height: 53, offsetX: -16}
    ];
    currentImage = 0;
    zoom = 3;
    isExploding = false;
    maxFlightImages = 2;


    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_CHARGE[0].path);
        this.loadImages(this.IMAGES_CHARGE.map(sprite => sprite.path));
        this.x = x;
        this.y = y;
        this.shoot();
        this.animate();
    };


    animate() {
        setInterval(() => {
            if (this.isExploding) {
                if (this.currentImage < this.IMAGES_CHARGE.length) {
                    this.animateImages(this.IMAGES_CHARGE);
                }
            } else {
                let flightImage = this.currentImage % this.maxFlightImages;
                let sprite = this.IMAGES_CHARGE[flightImage];
                this.swapImg(sprite);
                this.currentImage = (this.currentImage + 1) % this.maxFlightImages;
            }
        }, 100);
    };


    shoot() {
        setInterval(() => {
            if (!this.isExploding) {
                this.x -= 20;
            }
        }, 40);
    };


    startExplosion() {
        if (!this.isExploding) {
            this.isExploding = true;
            this.currentImage = 2;
        }
    };


    isExplosionFinished() {
        return this.isExploding && this.currentImage >= this.IMAGES_CHARGE.length;
    };
};