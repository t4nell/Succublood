const level_1 = new level (
    [
        new Demon(),
        new Demon(),
        new Demon(),
        new Demon(),
        new Demon(),
        new Demon(),

        new Crow(),
        new Crow(),
        new Crow(),
        new Crow(),
        new Crow(),
        new Crow(),
        new Crow(),
        new Crow(),
        new Crow(),
        new Crow(),
        
        new Endboss()
    ],
        
    [
        new Sky('img/background/sky.png', -1343, 0),
        new Sky('img/background/sky.png', 0, 0),
        new Sky('img/background/sky.png', 1343, 0),
        new Sky('img/background/sky.png', 1342 * 2, 0),
        new Sky('img/background/sky.png', 1341 * 3, 0),
        new Sky('img/background/sky.png', 1340 * 4, 0),
        new Sky('img/background/sky.png', 1339 * 4, 0),
        new Sky('img/background/sky.png', 1338 * 5, 0),
        new Sky('img/background/sky.png', 1337 * 6, 0),
        new Sky('img/background/sky.png', 1336 * 7, 0),
        new Sky('img/background/sky.png', 1335 * 8, 0),
        new Sky('img/background/sky.png', 1334 * 9, 0),
        new Sky('img/background/sky.png', 1333 * 10, 0),
        new Sky('img/background/sky.png', 1332 * 11, 0),
        new Sky('img/background/sky.png', 1331 * 12, 0),
    ],

    [
        new BackgroundObject('img/background/graves.png', 0, 0, 0.25),
        new BackgroundObject('img/background/gravesOffset.png', 640, 0, 0.25),
        new BackgroundObject('img/background/graves.png', 1280, 0, 0.25),
        new BackgroundObject('img/background/gravesOffset.png', 1920, 0, 0.25),

        new BackgroundObject('img/background/backTrees.png', 0, 0, 0.5),
        new BackgroundObject('img/background/backTrees.png', 1280, 0, 0.5),

        new BackgroundObject('img/background/crypt.png', 0, 0, 0.75),
        // new BackgroundObject('img/background/crypt.png', 1280, 0, 0.75),

        new BackgroundObject('img/background/wall.png', 0, 0, 0.75),
        new BackgroundObject('img/background/wallOffset.png', 640, 0, 0.75),
        new BackgroundObject('img/background/wall.png', 1280, 0, 0.75),
        new BackgroundObject('img/background/wallOffset.png', 1920, 0, 0.75),

        new BackgroundObject('img/background/ground.png', 0, 0, 1),
        new BackgroundObject('img/background/ground.png', 1280, 0, 1),

        new BackgroundObject('img/background/tree.png', 0, 0, 1),
        // new BackgroundObject('img/background/tree.png', 1280, 0, 1),
        
        new BackgroundObject('img/background/bones.png', 0, 0, 1),
        new BackgroundObject('img/background/bones.png', 1280, 0, 1)

    ]
);