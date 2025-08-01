class Sky extends MovableObject {
    speed = 0.25;
    zoom = 1280 / 1920;
    
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.skyAnimation();
    };


    skyAnimation() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    };
    
};