class Demon extends MovableObject {
    IMAGES_WALK = [
        {path:'img/enemies/demon1/walk/walk10.png',width: 44, height: 69, offsetX: -22}, 
        {path:'img/enemies/demon1/walk/walk9.png',width: 40, height: 70, offsetX: -20}, 
        {path:'img/enemies/demon1/walk/walk8.png',width: 31, height: 71, offsetX: -15.5}, 
        {path:'img/enemies/demon1/walk/walk7.png',width: 36, height: 71, offsetX: -18}, 
        {path:'img/enemies/demon1/walk/walk6.png',width: 39, height: 70, offsetX: -18.5}, 
        {path:'img/enemies/demon1/walk/walk5.png',width: 44, height: 69, offsetX: -22}, 
        {path:'img/enemies/demon1/walk/walk4.png',width: 40, height: 70, offsetX: -20}, 
        {path:'img/enemies/demon1/walk/walk3.png',width: 32, height: 71, offsetX: -16}, 
        {path:'img/enemies/demon1/walk/walk2.png',width: 36, height: 71, offsetX: -18}, 
        {path:'img/enemies/demon1/walk/walk1.png',width: 39, height: 70, offsetX: -18.5}, 
    ];
    currentImage = 0;
    zoom = 2;


    constructor() {
        super().loadImage('img/enemies/demon1/idle/idle1.png');
        this.loadImages(this.IMAGES_WALK.map(sprite => sprite.path));
        this.x = 1000 + Math.random() * 4000;
        this.y = 410;
        this.speed = 0.25 + Math.random() * 1.5;
        this.applyGravity();
        this.animate();
    };


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);   
        

        setInterval(() => {
            this.animateImages(this.IMAGES_WALK);
        }, 200);
    };
};

