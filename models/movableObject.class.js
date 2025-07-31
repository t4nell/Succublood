class MovableObject extends DrawableObject{
    speed = 0.15;
    zoom = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    HP = 100;
    lastHit = 0;
    
    
    drawBorder(ctx){
        if (this instanceof Character || this instanceof Demon) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offsetX, this.y,  this.width, this.height);
            ctx.stroke();
        };
    };


    isColliding(mo) {
        return this.x + mo.offsetX + this.width > mo.x && 
        this.y + this.height > mo.y &&
        this.x + mo.offsetX < mo.x + mo.width &&
        this.y < mo.y + mo.height;
    };


    hit() {
        this.HP -= 20;
        if (this.HP < 0) {
           this.HP = 0 
        } else {
            this.lastHit = new Date().getTime();
        };
    };


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.4;
    };


    isDead() {
        return this.HP == 0;
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
        if (this instanceof ThrowableObject) {
            return true;
        }else {
            return this.y < 400;
        }
    };

    
    swapImg(sprite) {
        this.img = this.imageCash[sprite.path];
        this.width = sprite.width * this.zoom;
        this.height = sprite.height * this.zoom;
        this.offsetX = sprite.offsetX * this.zoom;
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
        this.speedY = 35;
    };


    moveCamera() {
        this.world.cameraX = -this.x + settings.characterOffsetLeft;
    };
};

