class Ruby extends CollectableObjects {
    IMAGES = [
        {path:'img/ruby/ruby.png', width: 25, height: 30, offsetX: -13}
    ];
    zoom = 2;
    floatSpeed = 0.08;
    floatAmplitude = 3;
    floatOffset = 0;
    baseY = 490;
    value = 1;

    constructor(x, y) {
        super(x, y - 10);
        this.baseY = this.y;
        this.loadImage(this.IMAGES[0].path);
        this.animate();
    };


    animate() {
        setInterval(() => {
            this.floatOffset += this.floatSpeed;
            this.y = this.baseY + Math.sin(this.floatOffset) * this.floatAmplitude;
        }, 1000 / 30);
    };


    applyEffect() {
        if (this.world && this.world.character) {
            this.world.rubyCount += this.value;
            soundManager.playSound('collectRuby', 0.3);
        }
    };
};