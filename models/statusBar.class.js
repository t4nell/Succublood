class StatusBar extends DrawableObject {
    IMAGES_STATUSBAR_BACKGROUND = [
        {path:'img/statusBar/hpAndMana/1b.png',width: 16, height: 8},
        {path:'img/statusBar/hpAndMana/2b.png',width: 16, height: 8},
        {path:'img/statusBar/hpAndMana/3b.png',width: 16, height: 8},
        {path:'img/statusBar/hpAndMana/4b.png',width: 16, height: 8},
        {path:'img/statusBar/hpAndMana/5b.png',width: 16, height: 8},
    ];
    IMAGES_STATUSBAR_FULL = [
        {path:'img/statusBar/hpAndMana/1f.png',width: 16, height: 8},
        {path:'img/statusBar/hpAndMana/2f.png',width: 16, height: 8},
        {path:'img/statusBar/hpAndMana/3f.png',width: 16, height: 8},
        {path:'img/statusBar/hpAndMana/4f.png',width: 16, height: 8},
        {path:'img/statusBar/hpAndMana/5f.png',width: 16, height: 8},
    ];
    zoom = 4;
    hue = 0;

    constructor(percentage, x, y, hue =0) {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_BACKGROUND.map(sprite => sprite.path));
        this.loadImages(this.IMAGES_STATUSBAR_FULL.map(sprite => sprite.path));
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.setPercentage(percentage);
    };

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_FULL[this.resolveImageIndex()].path;
        this.img = this.imageCash[path];
    };

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
    };

    draw(ctx) {
        this.drawStatusBarBackground(ctx);
        this.drawStatusBarSegments(ctx);
    };

    drawStatusBarBackground(ctx) {
        this.IMAGES_STATUSBAR_BACKGROUND.forEach((segment, index) => {
            let img = this.imageCash[segment.path];
            ctx.drawImage(img, this.x + (index * segment.width * this.zoom), this.y, segment.width * this.zoom, segment.height * this.zoom);
        });
    };

    drawStatusBarSegments(ctx) {
        let segments = Math.ceil(this.percentage / 20);
        for (let i = 0; i < segments; i++) {
            let segment = this.IMAGES_STATUSBAR_FULL[i];
            let img = this.imageCash[segment.path];
            if (this.hue !== 0) {
                ctx.filter = `hue-rotate(${this.hue}deg)`;
            }
            ctx.drawImage(img, this.x + (i * segment.width * this.zoom), this.y, segment.width * this.zoom, segment.height * this.zoom);
            ctx.filter = 'none';
        }
    };
};