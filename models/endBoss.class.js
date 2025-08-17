class Endboss extends MovableObject {
    IMAGES_IDLE = [
        {path:'img/boss/idle/idle1.png', width: 44, height: 50, offsetX: -34},   
        {path:'img/boss/idle/idle2.png', width: 44, height: 50, offsetX: -34},   
        {path:'img/boss/idle/idle3.png', width: 44, height: 50, offsetX: -34},   
        {path:'img/boss/idle/idle4.png', width: 44, height: 50, offsetX: -34},   
        {path:'img/boss/idle/idle5.png', width: 44, height: 50, offsetX: -34},   
        {path:'img/boss/idle/idle6.png', width: 44, height: 50, offsetX: -34},   
        {path:'img/boss/idle/idle7.png', width: 44, height: 50, offsetX: -34},   
    ];
    currentImage = 0;
    zoom = 5;
    isAnimating = false;
    floatSpeed = 0.05;
    floatAmplitude = 12;
    floatOffset = 0;
    baseY = 530;


    constructor() {
        super().loadImage(this.IMAGES_IDLE[0].path);
        this.loadImages(this.IMAGES_IDLE.map(img => img.path));
        this.x = 5500;
        this.y = 530;
        this.baseY = this.y;
        this.animate();
    };

    animate() {
        setInterval(() => {
            this.startIdleAnimation();
        }, 3000);

        setInterval(() => {
            if (this.isAnimating) {
                this.animateImages(this.IMAGES_IDLE);
                if (this.currentImage >= this.IMAGES_IDLE.length) {
                    this.isAnimating = false;
                    this.currentImage = 0;
                    this.swapImg(this.IMAGES_IDLE[0]);
                }
            }
        }, 100);

        setInterval(() => {
            this.floatOffset += this.floatSpeed;
            this.y = this.baseY + Math.sin(this.floatOffset) * this.floatAmplitude;
        }, 1000 / 60);
    };


    startIdleAnimation() {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.currentImage = 0;
        }
    };
};