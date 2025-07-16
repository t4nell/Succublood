class Character extends MovableObject {
    IMAGES_IDLE = [
        {path:'../img/character/idle/idle1.png',width: 68, height: 75, offsetX: -37}, 
        {path:'../img/character/idle/idle2.png',width: 68, height: 75, offsetX: -38}, 
        {path:'../img/character/idle/idle3.png',width: 68, height: 75, offsetX: -39}, 
        {path:'../img/character/idle/idle4.png',width: 68, height: 75, offsetX: -40}, 
        {path:'../img/character/idle/idle5.png',width: 68, height: 75, offsetX: -38}, 
        {path:'../img/character/idle/idle6.png',width: 68, height: 75, offsetX: -36}, 
    ];
    currentImage = 0;
    zoom = 2;


    constructor() {
        super().loadImage('../img/character/idle/idle1.png');
        this.loadImages(this.IMAGES_IDLE.map(sprite => sprite.path));
        this.x = 120;
        this.y = 405;
        this.height = 150;
        this.width = 136;

        this.animate();
    }

    
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_IDLE.length;
            let sprite = this.IMAGES_IDLE[i];
            this.swapImg(sprite);
            this.currentImage++;
        }, 200);
        
    }

    jump() {

    }

};

