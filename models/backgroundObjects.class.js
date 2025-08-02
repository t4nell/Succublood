class BackgroundObject extends MovableObject {
    zoom = 1280 / 1920;
    speed = 0;

    constructor(imagePath, x, y, speed = 0) {
        super().loadImage(imagePath); 
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.animate();
    };

    animate() {
        setInterval(() => {
            if (!this.world || !this.world.keyboard || this.world.character.isDying) {
                return;
            }

            if (this.world.keyboard.RIGHT) {
                this.x += (1 - this.speed) * settings.characterSpeed;
                if (this.world.cameraX < -(this.width + this.x)) {
                    this.x += this.width * 2;
                }
            }

            if (this.world.keyboard.LEFT) {
                this.x -= (1 - this.speed) * settings.characterSpeed;
                if (this.world.cameraX > (this.width - this.x)) {
                    this.x -= this.width * 2;
                }
            }
        }, 1000 / 60);
    };
};