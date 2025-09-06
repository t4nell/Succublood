class StartScreen extends DrawableObject {
    isVisible = true;
    playButtonImage = new Image();
    buttonWidth = 200;
    buttonHeight = 130;
    buttonX;
    buttonY;
    isHovered = false;
    
    constructor(canvasWidth, canvasHeight) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.buttonX = (this.canvasWidth / 2) - (this.buttonWidth / 2) - 400;
        this.buttonY = (this.canvasHeight / 2) - 100;
        this.loadStartScreenImages();
    };

    loadStartScreenImages() {
        this.playButtonImage.src = 'img/buttons/startButton.png';
    };

    draw(ctx) {
        if (!this.isVisible) return;

        ctx.fillStyle = '#26212bff';
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
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    };


    setHovered(hovered) {
        this.isHovered = hovered;
    };
 
    isButtonClicked(mouseX, mouseY) {
        return mouseX >= this.buttonX && 
               mouseX <= this.buttonX + this.buttonWidth &&
               mouseY >= this.buttonY && 
               mouseY <= this.buttonY + this.buttonHeight;
    };


    hide() {
        this.isVisible = false;
    };


    show() {
        this.isVisible = true;
    };
};