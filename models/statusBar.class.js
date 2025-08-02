class StatusBar extends DrawableObject {
    IMAGES_STATUSBAR_BACKGROUND = [
        {path:'img/statusBar/1b.png',width: 16, height: 8},
        {path:'img/statusBar/2b.png',width: 16, height: 8},
        {path:'img/statusBar/3b.png',width: 16, height: 8},
        {path:'img/statusBar/4b.png',width: 16, height: 8},
        {path:'img/statusBar/5b.png',width: 16, height: 8},
    ];
    IMAGES_STATUSBAR_FULL = [
        {path:'img/statusBar/1f.png',width: 16, height: 8},
        {path:'img/statusBar/2f.png',width: 16, height: 8},
        {path:'img/statusBar/3f.png',width: 16, height: 8},
        {path:'img/statusBar/4f.png',width: 16, height: 8},
        {path:'img/statusBar/5f.png',width: 16, height: 8},
    ];
    percentage = 100;
    zoom = 4;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_BACKGROUND.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_STATUSBAR_FULL.map(sprite => sprite.path));
        this.x = 30;
        this.y = 30;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_FULL[this.resolveImageIndex()].path;
        this.img = this.imageCash[path];
    }

    resolveImageIndex() {
        if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

    draw(ctx) {
        this.IMAGES_STATUSBAR_BACKGROUND.forEach((segment, index) => {
            let img = this.imageCash[segment.path];
            ctx.drawImage(img, this.x + (index * segment.width * this.zoom), this.y, segment.width * this.zoom, segment.height * this.zoom);
        });

        let segments = Math.ceil(this.percentage / 20);
        for(let i = 0; i < segments; i++) {
            let segment = this.IMAGES_STATUSBAR_FULL[i];
            let img = this.imageCash[segment.path];
            ctx.drawImage(img, this.x + (i * segment.width * this.zoom), this.y, segment.width * this.zoom, segment.height * this.zoom);
        }
    }
}