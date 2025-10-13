class BossProjectile extends MovableObject {
    IMAGES_CHARGE = [
        {path:'img/boss/charge/charge1.png', width: 43, height: 8, offsetX: -22},
        {path:'img/boss/charge/charge2.png', width: 42, height: 14, offsetX: -21},
        {path:'img/boss/charge/charge3.png', width: 30, height: 22, offsetX: -15},
        {path:'img/boss/charge/charge4.png', width: 24, height: 31, offsetX: -12},
        {path:'img/boss/charge/charge5.png', width: 22, height: 40, offsetX: -11}
    ];
    currentImage = 0;
    zoom = 4;
    isExploding = false;
    maxFlightImages = 1;
    damage = 40;

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
        this.intervals.push(setInterval(() => {
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
        }, 120));
    };

    shoot() {
        this.intervals.push(setInterval(() => {
            if (!this.isExploding) {
                this.x -= 25;
            }
        }, 50));
    };

    startExplosion() {
        if (!this.isExploding) {
            this.isExploding = true;
            this.currentImage = 1;
        }
    };

    isExplosionFinished() {
        return this.isExploding && this.currentImage >= this.IMAGES_CHARGE.length;
    };
};