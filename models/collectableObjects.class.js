class CollectableObjects extends MovableObject {
    collected = false;
    zoom = 2;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.applyGravity();
    }

    collect() {
        this.collected = true;
        this.applyEffect();
    }

    applyEffect() {
        // Override in subclasses
    }

    animate() {
        if (this.IMAGES && this.IMAGES.length > 1) {
            setInterval(() => {
                this.animateImages(this.IMAGES);
            }, 200);
        }
    }
};