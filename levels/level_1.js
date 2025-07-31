const level_1 = new level (
    [
        new Demon(),
        new Demon(),
        new Demon(),
        new Demon(),
        new Demon(),
        new Demon(),

        new Endboss()
    ],
        
    [
        new Sky('img/background/sky.png', -1343, 720),
        new Sky('img/background/sky.png', 0, 720),
        new Sky('img/background/sky.png', 1343, 720),
        new Sky('img/background/sky.png', 1342 * 2, 720),
        new Sky('img/background/sky.png', 1341 * 3, 720),
        new Sky('img/background/sky.png', 1340 * 4, 720),
        new Sky('img/background/sky.png', 1339 * 4, 720),
        new Sky('img/background/sky.png', 1338 * 5, 720),
        new Sky('img/background/sky.png', 1337 * 6, 720),
        new Sky('img/background/sky.png', 1336 * 7, 720),
        new Sky('img/background/sky.png', 1335 * 8, 720),
        new Sky('img/background/sky.png', 1334 * 9, 720),
        new Sky('img/background/sky.png', 1333 * 10, 720),
        new Sky('img/background/sky.png', 1332 * 11, 720),
        new Sky('img/background/sky.png', 1331 * 12, 720),
    ],

    [
        new BackgroundObject('img/background/graves.png', 0, 720, 0.25),
        new BackgroundObject('img/background/gravesOffset.png', 640, 720, 0.25),
        new BackgroundObject('img/background/graves.png', 1280, 720, 0.25),
        new BackgroundObject('img/background/gravesOffset.png', 1920, 720, 0.25),

        new BackgroundObject('img/background/backTrees.png', 0, 720, 0.5),
        new BackgroundObject('img/background/backTrees.png', 1280, 720, 0.5),

        new BackgroundObject('img/background/crypt.png', 0, 720, 0.75),
        // new BackgroundObject('img/background/crypt.png', 1280, 720, 0.75),

        new BackgroundObject('img/background/wall.png', 0, 720, 0.75),
        new BackgroundObject('img/background/wallOffset.png', 640, 720, 0.75),
        new BackgroundObject('img/background/wall.png', 1280, 720, 0.75),
        new BackgroundObject('img/background/wallOffset.png', 1920, 720, 0.75),

        new BackgroundObject('img/background/ground.png', 0, 720, 1),
        new BackgroundObject('img/background/ground.png', 1280, 720, 1),

        new BackgroundObject('img/background/tree.png', 0, 720, 1),
        // new BackgroundObject('img/background/tree.png', 1280, 720, 1),
        
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
    ]
);