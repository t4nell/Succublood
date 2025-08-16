class ManaPotion extends CollectableObjects {
        IMAGES = [
        {path:'img/potion/manaPotion.png', width: 12, height: 30, offsetX: -6}
    ];
    zoom = 2;
    floatSpeed = 0.1;
    floatAmplitude = 5;
    floatOffset = 0;
    baseY = 490;


    constructor() {
        super(700 + Math.random() * 4000, 490);
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
            this.world.character.MANA = Math.min(100, this.world.character.MANA + 20);
            this.world.statusMana.setPercentage(this.world.character.MANA);
        }
    };
};