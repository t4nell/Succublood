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
    isCharacterHurt = false;
    hurtTimer = 0;
    intervals = [];

    
    constructor(canvasWidth, canvasHeight) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.calculateButtonPositions();
        this.createStartScreenBackground();
        this.createStartScreenCharacter();
        this.loadStartScreenImages();
    };


    calculateButtonPositions() {
        this.buttonX = (this.canvasWidth / 2) - this.buttonWidth + 400;
        this.buttonY = (this.canvasHeight / 2) - 100;
        this.controlsButtonX = (this.canvasWidth / 2) - this.controlsButtonWidth + 400;
        this.controlsButtonY = (this.canvasHeight / 2) + 50;
        this.imprintButtonX = (this.canvasWidth / 2) - this.imprintButtonWidth + 400;
        this.imprintButtonY = (this.canvasHeight / 2) + 150;
    };


    createStartScreenBackground() {
        this.createSkyObjects();
        this.createBackgroundObjects();
    };


    createSkyObjects() {
        this.skyObjects = [
            new Sky('img/background/sky.png', 0, 720),
            new Sky('img/background/sky.png', 1279, 720),
            new Sky('img/background/sky.png', 1278 * 2, 720),
            new Sky('img/background/sky.png', 1277 * 3, 720)
        ];
    };


    createBackgroundObjects() {
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
    };
    

    createStartScreenCharacter() {
        this.initializeCharacterData();
        this.setCharacterPosition();
        this.loadCharacterImages();
        this.startCharacterAnimation();
    };


    initializeCharacterData() {
        this.character = {
            IMAGES_IDLE: this.getIdleImages(),
            IMAGES_HURT: this.getHurtImages(),
            currentImage: 0,
            zoom: 4,
            imageCash: {},
            img: new Image()
        };
    };


    getIdleImages() {
        return [
            {path:'img/character/idle/idle1.png',width: 68, height: 75, offsetX: -37}, 
            {path:'img/character/idle/idle2.png',width: 68, height: 75, offsetX: -38}, 
            {path:'img/character/idle/idle3.png',width: 68, height: 75, offsetX: -39}, 
            {path:'img/character/idle/idle4.png',width: 68, height: 75, offsetX: -40}, 
            {path:'img/character/idle/idle5.png',width: 68, height: 75, offsetX: -38}, 
            {path:'img/character/idle/idle6.png',width: 68, height: 75, offsetX: -36}
        ];
    };


    getHurtImages() {
        return [
            {path:'img/character/hurt/hurt1.png',width: 54, height: 72, offsetX: -31},
            {path:'img/character/hurt/hurt2.png',width: 57, height: 73, offsetX: -28},
            {path:'img/character/hurt/hurt3.png',width: 57, height: 73, offsetX: -32},
        ];
    };


    setCharacterPosition() {
        this.characterX = this.canvasWidth - 1000;
        this.characterY = this.canvasHeight - 130;
    };


    loadCharacterImages() {
        this.character.img.src = this.character.IMAGES_IDLE[0].path;
        this.cacheIdleImages();
        this.cacheHurtImages();
    };


    cacheIdleImages() {
        this.character.IMAGES_IDLE.forEach(sprite => {
            let img = new Image();
            img.src = sprite.path;
            this.character.imageCash[sprite.path] = img;
        });
    };


    cacheHurtImages() {
        this.character.IMAGES_HURT.forEach(sprite => {
            let img = new Image();
            img.src = sprite.path;
            this.character.imageCash[sprite.path] = img;
        });
    };


    startCharacterAnimation() {
        this.intervals.push(setInterval(() => {
            if (this.isVisible) {
                this.updateCharacterAnimation();
            }
        }, 1000 / 8));
    };


    updateCharacterAnimation() {
        if (this.isCharacterHurt) {
            this.updateHurtAnimation();
            this.updateHurtTimer();
        } else {
            this.updateIdleAnimation();
        }
    };


    updateHurtTimer() {
        this.hurtTimer++;
        if (this.hurtTimer >= this.character.IMAGES_HURT.length * 1) {
            this.resetHurtState();
        }
    };


    resetHurtState() {
        this.isCharacterHurt = false;
        this.hurtTimer = 0;
        this.character.currentImage = 0;
    };


    updateHurtAnimation() {
        let spriteIndex = this.character.currentImage % this.character.IMAGES_HURT.length;
        let sprite = this.character.IMAGES_HURT[spriteIndex];
        this.applyCharacterSprite(sprite);
        this.character.currentImage++;
    };


    updateIdleAnimation() {
        let spriteIndex = this.character.currentImage % this.character.IMAGES_IDLE.length;
        let sprite = this.character.IMAGES_IDLE[spriteIndex];
        this.applyCharacterSprite(sprite);
        this.character.currentImage++;
    };


    applyCharacterSprite(sprite) {
        this.character.img = this.character.imageCash[sprite.path];
        this.character.width = sprite.width * this.character.zoom;
        this.character.height = sprite.height * this.character.zoom;
        this.character.offsetX = sprite.offsetX * this.character.zoom;
    };
    

    loadStartScreenImages() {
        this.playButtonImage.src = 'img/buttons/startButton.png';
        this.imprintButtonImage.src = 'img/buttons/imprintButton.png';
        this.controlsButtonImage.src = 'img/buttons/controlsButton.png';
    };


    draw(ctx) {
        if (!this.isVisible) return;
        this.drawBackground(ctx);
        this.drawCharacter(ctx);
        this.drawStartButton(ctx);
        this.drawImprintButton(ctx);
        this.drawControlsButton(ctx);
        this.resetContextSettings(ctx);
    };


    drawBackground(ctx) {
        this.drawBackgroundLayers(ctx);
        this.drawDarkOverlay(ctx);
        this.drawTitle(ctx);
    };


    drawBackgroundLayers(ctx) {
        this.skyObjects.forEach(sky => sky.draw(ctx));
        this.backgroundObjects.forEach(bg => bg.draw(ctx));
    };


    drawDarkOverlay(ctx) {
        ctx.fillStyle = 'rgba(38, 33, 43, 0.8)';
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    };


    drawTitle(ctx) {
        this.setTitleStyle(ctx);
        this.addTitleShadow(ctx);
        ctx.fillText('Succublood', this.canvasWidth / 2, this.canvasHeight / 2 - 200);
        this.removeTitleShadow(ctx);
    };


    setTitleStyle(ctx) {
        ctx.font = 'bold 120px antiquityPrint';
        ctx.fillStyle = '#968344';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
    };


    addTitleShadow(ctx) {
        ctx.shadowColor = 'rgba(71, 71, 71, 0.75)';
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 6;
        ctx.shadowBlur = 10;
    };


    removeTitleShadow(ctx) {
        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
    };


    drawStartButton(ctx) {
        if (this.playButtonImage.complete) {
            this.applyButtonGlow(ctx, this.isHovered);
            this.renderButton(ctx, this.playButtonImage, this.buttonX, this.buttonY);
            this.removeGlow(ctx);
        }
    };


    drawControlsButton(ctx) {
        if (this.controlsButtonImage.complete) {
            this.applyButtonGlow(ctx, this.isControlsHovered);
            this.renderButton(ctx, this.controlsButtonImage, this.controlsButtonX, this.controlsButtonY);
            this.removeGlow(ctx);
        }
    };


    drawImprintButton(ctx) {
        if (this.imprintButtonImage.complete) {
            this.applyButtonGlow(ctx, this.isImprintHovered);
            this.renderButton(ctx, this.imprintButtonImage, this.imprintButtonX, this.imprintButtonY);
            this.removeGlow(ctx);
        }
    };


    applyButtonGlow(ctx, isHovered) {
        if (isHovered) {
            let glowIntensity = (Math.sin(Date.now() * 0.004) + 1) / 2;
            ctx.shadowColor = `rgba(150, 131, 68, ${glowIntensity})`;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 30;
        }
    };


    renderButton(ctx, image, x, y) {
        let width, height;
        
        if (x === this.buttonX && y === this.buttonY) {
            width = this.buttonWidth;
            height = this.buttonHeight;
        } else if (x === this.controlsButtonX && y === this.controlsButtonY) {
            width = this.controlsButtonWidth;
            height = this.controlsButtonHeight;
        } else if (x === this.imprintButtonX && y === this.imprintButtonY) {
            width = this.imprintButtonWidth;
            height = this.imprintButtonHeight;
        }
        
        ctx.drawImage(image, x, y, width, height);
    };


    removeGlow(ctx) {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    };


    drawCharacter(ctx) {
        if (this.character.img.complete) {
            this.applyCharacterGlow(ctx);
            this.drawCharacterImage(ctx);
            this.removeGlow(ctx);
        }
    };


    applyCharacterGlow(ctx) {
        ctx.shadowColor = 'rgba(150, 131, 68, 0.8)';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 2;
    };


    drawCharacterImage(ctx) {
        ctx.drawImage(
            this.character.img,
            this.characterX + this.character.offsetX,
            this.characterY - this.character.height,
            this.character.width,
            this.character.height
        );
    };


    resetContextSettings(ctx) {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
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


    isCharacterClicked(mouseX, mouseY) {
        return mouseX >= this.characterX + this.character.offsetX && 
               mouseX <= this.characterX + this.character.offsetX + this.character.width &&
               mouseY >= this.characterY - this.character.height && 
               mouseY <= this.characterY;
    };


    triggerHurtAnimation() {
        if (!this.isCharacterHurt) {
            this.isCharacterHurt = true;
            this.hurtTimer = 0;
            this.character.currentImage = 0;
        }
    };


    hide() {
        this.isVisible = false;
    };


    show() {
        this.isVisible = true;
    };


    clearIntervals() {
        this.intervals.forEach(id => clearInterval(id));
        this.intervals = [];
    };

};