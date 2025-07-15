class Sky extends MovableObject {
    x = 0;
    y = 0;
    constructor() {
        super().loadImage('../img/background/sky.png');
        this.height = 720;
        this.width = 480;
    }

}