class Demon extends MovableObject {
        IMAGES_IDLE = [
        {path:'../img/enemies/demon1/walk/walk10.png',width: 44, height: 69, offsetX: -22}, 
        {path:'../img/enemies/demon1/walk/walk9.png',width: 40, height: 70, offsetX: -20}, 
        {path:'../img/enemies/demon1/walk/walk8.png',width: 31, height: 71, offsetX: -15.5}, 
        {path:'../img/enemies/demon1/walk/walk7.png',width: 36, height: 71, offsetX: -18}, 
        {path:'../img/enemies/demon1/walk/walk6.png',width: 39, height: 70, offsetX: -18.5}, 
        {path:'../img/enemies/demon1/walk/walk5.png',width: 44, height: 69, offsetX: -22}, 
        {path:'../img/enemies/demon1/walk/walk4.png',width: 40, height: 70, offsetX: -20}, 
        {path:'../img/enemies/demon1/walk/walk3.png',width: 32, height: 71, offsetX: -16}, 
        {path:'../img/enemies/demon1/walk/walk2.png',width: 36, height: 71, offsetX: -18}, 
        {path:'../img/enemies/demon1/walk/walk1.png',width: 39, height: 70, offsetX: -18.5}, 
    ];
    currentImage = 0;
    speed = 1;
    zoom = 2;


    constructor() {
        super().loadImage('../img/enemies/demon1/idle/idle1.png');
        this.loadImages(this.IMAGES_IDLE.map(sprite => sprite.path));
        this.x = 450 + Math.random() * 800;
        this.y = 405;

        this.animate();
    }


    animate() {
        
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_IDLE.length;
            let sprite = this.IMAGES_IDLE[i];
            this.swapImg(sprite);
            this.currentImage++;
        }, 200);
        
    }
};

