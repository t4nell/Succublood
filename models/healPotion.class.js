class HealPotion extends CollectableObjects {
    IMAGE_HEAL_POTION = [
        {path:'img/potion/healPotion.png', width: 12, height: 30, offsetX: -6}
    ];
    zoom = 2;
    floatSpeed = 0.1;
    floatAmplitude = 5;
    floatOffset = 0;
    baseY = 490;

    constructor(x, y) {
        super(x, y - 10);
        this.baseY = this.y;
        this.loadImage(this.IMAGE_HEAL_POTION[0].path); 
        this.animate();
    };


    animate() {
        setInterval(() => {
            this.floatOffset += this.floatSpeed;
            this.y = this.baseY + Math.sin(this.floatOffset) * this.floatAmplitude;
        }, 1000 / 60);
    };


    applyEffect() {
        if (this.world && this.world.character) {
            this.world.character.HP = Math.min(100, this.world.character.HP + 20);
            this.world.statusLive.setPercentage(this.world.character.HP);
        }
    };
}