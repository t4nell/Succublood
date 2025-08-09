class HealPotion extends CollectableObjects {
    IMAGE_HEALPOTION = [
        {path:'img/icons/healPotion.png', width: 12, height: 30, offsetX: -6}
    ];
    zoom = 2;

    constructor(x, y) {
        super(x, y);
        this.loadImage(this.IMAGE_HEALPOTION[0].path);
    }

    applyEffect() {
        if (this.world && this.world.character) {
            this.world.character.HP = Math.min(100, this.world.character.HP + 20);
            this.world.statusLive.setPercentage(this.world.character.HP);
        }
    }
}