class CollectableObjects extends MovableObject {
    collected = false;
    zoom = 2;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    };

    collect() {
        this.collected = true;
        this.applyEffect();
    };
};