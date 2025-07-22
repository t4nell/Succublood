class Sky extends MovableObject {
    constructor() {
        super().loadImage('img/background/sky.png'); 
        this.x = 0;
        this.y = 0;
        this.skyAnimation();
    }


    skyAnimation() {
        this.moveLeft();
    }
    

    
};