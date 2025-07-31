class level {
    enemies;
    sky;
    backgroundObjects;
    backgroundCrows;
    levelStartX = -100;
    levelEndX = 6000;


    constructor(enemies, sky, backgroundObjects, backgroundCrows = []) {
        this.enemies = enemies;
        this.sky = sky;
        this.backgroundObjects = backgroundObjects;
        this.backgroundCrows = backgroundCrows;
    };

};