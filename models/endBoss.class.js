class Endboss extends MovableObject {
    IMAGES_WALK = [
        {path:'img/boss/idle/idle1.png', width: 44 * 3, height: 50 * 3, offsetX: -34 / 3},   
        {path:'img/boss/idle/idle2.png', width: 44 * 3, height: 50 * 3, offsetX: -34 / 3},   
        {path:'img/boss/idle/idle3.png', width: 44 * 3, height: 50 * 3, offsetX: -34 / 3},   
        {path:'img/boss/idle/idle4.png', width: 44 * 3, height: 50 * 3, offsetX: -34 / 3},   
        {path:'img/boss/idle/idle5.png', width: 44 * 3, height: 50 * 3, offsetX: -34 / 3},   
        {path:'img/boss/idle/idle6.png', width: 44 * 3, height: 50 * 3, offsetX: -34 / 3},   
        {path:'img/boss/idle/idle7.png', width: 44 * 3, height: 50 * 3, offsetX: -34 / 3},   
    ];
    currentImage = 0;
    zoom = 2;


    constructor() {
        super().loadImage(this.IMAGES_WALK[0].path);
        this.loadImages(this.IMAGES_WALK.map(img => img.path));
        this.x = 3500;
        this.y = 250;
        this.animate();
    }

   animate() {
        setInterval(() => {
            this.animateImages(this.IMAGES_WALK)
        }, 1000 / 60);
    }
};