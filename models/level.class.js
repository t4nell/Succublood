class level {
    enemies;
    sky;
    backgroundObjects;
    backgroundCrows;
    manaPotions;
    rubys;
    levelStartX = -100;
    levelEndX = 6000;


    constructor(enemies, sky, backgroundObjects, backgroundCrows = [], manaPotions = [], rubys = []) {
        this.enemies = enemies;
        this.sky = sky;
        this.backgroundObjects = backgroundObjects;
        this.backgroundCrows = backgroundCrows;
        this.manaPotions = manaPotions;
        this.rubys = rubys;
    };

};