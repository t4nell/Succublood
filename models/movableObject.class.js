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

    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {
            this.width = this.img.width * this.zoom;
            this.height = this.img.height * this.zoom;
        }
        this.img.src = path;
    }
    
    swapImg(sprite) {
        this.img = this.imageCash[sprite.path];
        this.width = sprite.width * this.zoom;
        this.height = sprite.height * this.zoom;
        this.offsetX = sprite.offsetX * this.zoom;
    }
    
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCash[path] = img;
        });
        
    }


    moveRight() {
        console.log('hi');
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
};

