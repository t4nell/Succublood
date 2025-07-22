class Sky extends MovableObject {
    zoom = 0.7;
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.skyAnimation();
    }


    skyAnimation() {
        this.moveLeft();
    }
    

    
};