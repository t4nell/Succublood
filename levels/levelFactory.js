function createLevel1() {
    return new level (
        [
            new meleeDemon(),
            new meleeDemon(),
            new meleeDemon(),
            new meleeDemon(),
            new meleeDemon(),

            new rangeDemon(),
            new rangeDemon(),
            new rangeDemon(),
            new rangeDemon(),
            new rangeDemon(),

            new Endboss()
        ],

        [
            new Sky('img/background/sky.png', 0, 720),
            new Sky('img/background/sky.png', 1279, 720),
            new Sky('img/background/sky.png', 1278 * 2, 720),
            new Sky('img/background/sky.png', 1277 * 3, 720),
            new Sky('img/background/sky.png', 1276 * 4, 720),
            new Sky('img/background/sky.png', 1275 * 4, 720),
            new Sky('img/background/sky.png', 1274 * 5, 720),
            new Sky('img/background/sky.png', 1273 * 6, 720),
            new Sky('img/background/sky.png', 1272 * 7, 720),
            new Sky('img/background/sky.png', 1271 * 8, 720),
            new Sky('img/background/sky.png', 1270 * 9, 720),
            new Sky('img/background/sky.png', 1269 * 10, 720),
            new Sky('img/background/sky.png', 1268 * 11, 720),
            new Sky('img/background/sky.png', 1267 * 12, 720),
        ],

        [
            new BackgroundObject('img/background/graves.png', 0, 720, 0.25),
            new BackgroundObject('img/background/gravesOffset.png', 640, 720, 0.25),
            new BackgroundObject('img/background/graves.png', 1280, 720, 0.25),
            new BackgroundObject('img/background/gravesOffset.png', 1920, 720, 0.25),

            new BackgroundObject('img/background/backTrees.png', 0, 720, 0.5),
            new BackgroundObject('img/background/backTrees.png', 1280, 720, 0.5),

            new BackgroundObject('img/background/crypt.png', 0, 720, 0.75),

            new BackgroundObject('img/background/wall.png', 0, 720, 0.75),
            new BackgroundObject('img/background/wallOffset.png', 640, 720, 0.75),
            new BackgroundObject('img/background/wall.png', 1280, 720, 0.75),
            new BackgroundObject('img/background/wallOffset.png', 1920, 720, 0.75),

            new BackgroundObject('img/background/ground.png', 0, 720, 1),
            new BackgroundObject('img/background/ground.png', 1280, 720, 1),

            new BackgroundObject('img/background/tree.png', 0, 720, 1),
            
            new BackgroundObject('img/background/bones.png', 0, 720, 1),
            new BackgroundObject('img/background/bones.png', 1280, 720, 1)
        ],

        [
            new Crow(),
            new Crow(),
            new Crow(),
            new Crow(),
            new Crow(),
            new Crow(),
            new Crow(),
            new Crow(),
            new Crow(),
            new Crow()
        ],
        
        [
            new ManaPotion(),
            new ManaPotion(),
            new ManaPotion(),
            new ManaPotion(),
            new ManaPotion(),
            new ManaPotion(),
            new ManaPotion(),
            new ManaPotion(),
            new ManaPotion(),
            new ManaPotion()
        ],

        [
            new Ruby(1000, 490),
            new Ruby(1500, 490),
            new Ruby(2200, 490),
            new Ruby(2500, 490),
            new Ruby(2400, 490),
            new Ruby(3100, 490),
            new Ruby(3700, 490)
        ]
    );
};