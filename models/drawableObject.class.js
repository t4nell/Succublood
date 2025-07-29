class DrawableObject {
    x;
    y;
    offsetX = 0; 
    height;
    width;
    img;
    imageCash = {};
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x + this.offsetX, this.y, this.width, this.height); 
    };

    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {
            this.width = this.img.width * this.zoom;
            this.height = this.img.height * this.zoom;
        };
        this.img.src = path;
    };

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCash[path] = img;
        });  
    };

}