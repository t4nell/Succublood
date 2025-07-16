class Sky extends MovableObject {
    width = 1280;
    height = 720;
    constructor() {
        super().loadImage('../img/background/sky.png'); 
        this.x = 0;
        this.y = 0;
        this.skyAnimation();
    }


    skyAnimation() {
        this.moveLeft();
    }
    

    
};