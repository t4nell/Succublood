class StartScreen extends DrawableObject {
    isVisible = true;
    playButtonImage = new Image();
    imprintButtonImage = new Image();
    controlsButtonImage = new Image();
    buttonWidth = 200;
    buttonHeight = 130;
    buttonX;
    buttonY;
    imprintButtonX;
    imprintButtonY;
    imprintButtonWidth = 200;
    imprintButtonHeight = 80;
    controlsButtonX;
    controlsButtonY;
    controlsButtonWidth = 200;
    controlsButtonHeight = 80;
    isHovered = false;
    isImprintHovered = false;
    isControlsHovered = false;
    character;
    characterX;
    characterY;

    
    constructor(canvasWidth, canvasHeight) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.buttonX = (this.canvasWidth / 2) - this.buttonWidth + 400;
        this.buttonY = (this.canvasHeight / 2) - 100;
        this.controlsButtonX = (this.canvasWidth / 2) - this.controlsButtonWidth + 400;
        this.controlsButtonY = (this.canvasHeight / 2) + 50;
        this.imprintButtonX = (this.canvasWidth / 2) - this.imprintButtonWidth + 400;
        this.imprintButtonY = (this.canvasHeight / 2) + 150;
        this.skyObjects = [
            new Sky('img/background/sky.png', 0, 720),
            new Sky('img/background/sky.png', 1279, 720),
            new Sky('img/background/sky.png', 1278 * 2, 720),
            new Sky('img/background/sky.png', 1277 * 3, 720)
        ];
        this.backgroundObjects = [
            new BackgroundObject('img/background/graves.png', 0, 720, 0.25),
            new BackgroundObject('img/background/gravesOffset.png', 640, 720, 0.25),
            new BackgroundObject('img/background/backTrees.png', 0, 720, 0.5),
            new BackgroundObject('img/background/crypt.png', 0, 720, 0.75),
            new BackgroundObject('img/background/wall.png', 0, 720, 0.75),
            new BackgroundObject('img/background/ground.png', 0, 720, 1),
            new BackgroundObject('img/background/tree.png', 0, 720, 1),
            new BackgroundObject('img/background/bones.png', 0, 720, 1),
        ];
        this.createStartScreenCharacter();
        this.loadStartScreenImages();
    };


    createStartScreenCharacter() {
        this.character = {
            IMAGES_IDLE: [
                {path:'img/character/idle/idle1.png',width: 68, height: 75, offsetX: -37}, 
                {path:'img/character/idle/idle2.png',width: 68, height: 75, offsetX: -38}, 
                {path:'img/character/idle/idle3.png',width: 68, height: 75, offsetX: -39}, 
                {path:'img/character/idle/idle4.png',width: 68, height: 75, offsetX: -40}, 
                {path:'img/character/idle/idle5.png',width: 68, height: 75, offsetX: -38}, 
                {path:'img/character/idle/idle6.png',width: 68, height: 75, offsetX: -36}
            ],
            currentImage: 0,
            zoom: 4,
            imageCash: {},
            img: new Image()
        };

        this.characterX = this.canvasWidth - 1000;
        this.characterY = this.canvasHeight - 130;

        this.loadCharacterImages();
        this.startCharacterAnimation();
    };


    loadCharacterImages() {
        this.character.img.src = this.character.IMAGES_IDLE[0].path;
        
        this.character.IMAGES_IDLE.forEach(sprite => {
            let img = new Image();
            img.src = sprite.path;
            this.character.imageCash[sprite.path] = img;
        });
    };


    startCharacterAnimation() {
        setInterval(() => {
            if (this.isVisible) {
                let spriteIndex = this.character.currentImage % this.character.IMAGES_IDLE.length;
                let sprite = this.character.IMAGES_IDLE[spriteIndex];
                
                this.character.img = this.character.imageCash[sprite.path];
                this.character.width = sprite.width * this.character.zoom;
                this.character.height = sprite.height * this.character.zoom;
                this.character.offsetX = sprite.offsetX * this.character.zoom;
                
                this.character.currentImage++;
            }
        }, 1000 / 8);
    };


    loadStartScreenImages() {
        this.playButtonImage.src = 'img/buttons/startButton.png';
        this.imprintButtonImage.src = 'img/buttons/imprintButton.png';
        this.controlsButtonImage.src = 'img/buttons/controlsButton.png';
    };


    draw(ctx) {
        if (!this.isVisible) return;

        // Parallax Hintergrund zeichnen
        this.skyObjects.forEach(sky => sky.draw(ctx));
        this.backgroundObjects.forEach(bg => bg.draw(ctx));

        ctx.fillStyle = 'rgba(38, 33, 43, 0.8)';
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        ctx.font = 'bold 120px antiquityPrint';
        ctx.fillStyle = '#968344';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.shadowColor = 'rgba(71, 71, 71, 0.75)';
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 6;
        ctx.shadowBlur = 10;
        
        ctx.fillText('Succublood', this.canvasWidth / 2, this.canvasHeight / 2 - 200);
        
        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;

        this.drawCharacter(ctx);

        // Start-Button zeichnen
        if (this.playButtonImage.complete) {
            if (this.isHovered) {
                let glowIntensity = (Math.sin(Date.now() * 0.004) + 1) / 2;
                ctx.shadowColor = `rgba(150, 131, 68, ${glowIntensity})`;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 30;
            }
            ctx.drawImage(this.playButtonImage, this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }

        // Imprint-Button zeichnen
        if (this.imprintButtonImage.complete) {
            if (this.isImprintHovered) {
                let glowIntensity = (Math.sin(Date.now() * 0.004) + 1) / 2;
                ctx.shadowColor = `rgba(150, 131, 68, ${glowIntensity})`;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 30;
            }
            ctx.drawImage(this.imprintButtonImage, this.imprintButtonX, this.imprintButtonY, this.imprintButtonWidth, this.imprintButtonHeight);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }

        // Controls-Button zeichnen
        if (this.controlsButtonImage.complete) {
            if (this.isControlsHovered) {
                let glowIntensity = (Math.sin(Date.now() * 0.004) + 1) / 2;
                ctx.shadowColor = `rgba(150, 131, 68, ${glowIntensity})`;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 30;
            }
            ctx.drawImage(this.controlsButtonImage, this.controlsButtonX, this.controlsButtonY, this.controlsButtonWidth, this.controlsButtonHeight);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }
        
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    };


    drawCharacter(ctx) {
        if (this.character.img.complete) {
            ctx.shadowColor = 'rgba(150, 131, 68, 0.8)';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 2;

            ctx.drawImage(
                this.character.img, 
                this.characterX + this.character.offsetX, 
                this.characterY - this.character.height, 
                this.character.width, 
                this.character.height
            );

            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }
    };


    setHovered(hovered) {
        this.isHovered = hovered;
    };


    setControlsHovered(hovered) {
        this.isControlsHovered = hovered;
    };
    

    setImprintHovered(hovered) {
        this.isImprintHovered = hovered;
    };
 

    isButtonClicked(mouseX, mouseY) {
        return mouseX >= this.buttonX && 
               mouseX <= this.buttonX + this.buttonWidth &&
               mouseY >= this.buttonY && 
               mouseY <= this.buttonY + this.buttonHeight;
    };


    isImprintButtonClicked(mouseX, mouseY) {
        return mouseX >= this.imprintButtonX && 
               mouseX <= this.imprintButtonX + this.imprintButtonWidth &&
               mouseY >= this.imprintButtonY && 
               mouseY <= this.imprintButtonY + this.imprintButtonHeight;
    };


    isControlsButtonClicked(mouseX, mouseY) {
        return mouseX >= this.controlsButtonX && 
               mouseX <= this.controlsButtonX + this.controlsButtonWidth &&
               mouseY >= this.controlsButtonY && 
               mouseY <= this.controlsButtonY + this.controlsButtonHeight;
    };


    hide() {
        this.isVisible = false;
    };


    show() {
        this.isVisible = true;
    };
};