class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCash = {};
    speed = 0.15;
    zoom = 1;
    offsetX = 0; 
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x + this.offsetX, this.y, this.width, this.height); 
    };

    drawBorder(ctx){
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x + this.offsetX, this.y,  this.width, this.height);
        ctx.stroke();
    };


    

    applyGravity() {
        setInterval (() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            };
        }, 1000 /60);
    };

    
    isAboveGround() {
        return this.y < 400;
    };


    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {
            this.width = this.img.width * this.zoom;
            this.height = this.img.height * this.zoom;
        };
        this.img.src = path;
    };
    
    swapImg(sprite) {
        this.img = this.imageCash[sprite.path];
        this.width = sprite.width * this.zoom;
        this.height = sprite.height * this.zoom;
        this.offsetX = sprite.offsetX * this.zoom;
    };
    
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCash[path] = img;
        });  
    };

    animateImages(images) {
        let i = this.currentImage % images.length;
        let sprite = images[i];
        this.swapImg(sprite);
        this.currentImage++;
    };


    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    };


    moveLeft() {
        this.otherDirection = true;
        this.x -= this.speed; 
    };

    jump() {
        this.speedY = 30;
    };

    moveCamera() {
        this.world.cameraX = -this.x + 200;
    };
};

