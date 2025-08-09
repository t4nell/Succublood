class ManaPotion extends CollectableObjects {
        IMAGES = [
        {path:'img/icons/manaPotion.png', width: 12, height: 30, offsetX: -6}
    ];
    zoom = 2;


    constructor() {
        super(700 + Math.random() * 4000, 500);
        this.loadImage(this.IMAGES[0].path);
    };


    applyEffect() {
        if (this.world && this.world.character) {
            this.world.character.MANA = Math.min(100, this.world.character.MANA + 20);
            this.world.statusMana.setPercentage(this.world.character.MANA);
        }
    };
};