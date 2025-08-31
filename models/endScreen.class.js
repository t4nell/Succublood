class EndScreen extends DrawableObject {
    isVisible = false;
    screenType = '';
    restartButtonImage = new Image();
    buttonWidth = 250;
    buttonHeight = 150;
    buttonX;
    buttonY;
    
    constructor(canvasWidth, canvasHeight) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.buttonX = (this.canvasWidth / 2) - (this.buttonWidth / 2);
        this.buttonY = (this.canvasHeight / 2) + 100;
        this.loadEndScreenImages();
    };

    loadEndScreenImages() {
        this.restartButtonImage.src = 'img/buttons/restartButton.png';
    };

    show(screenType) {
        this.isVisible = true;
        this.screenType = screenType;
    };

    hide() {
        this.isVisible = false;
    };

    draw(ctx) {
        if (!this.isVisible) return;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        ctx.font = 'bold 80px antiquityPrint';
        ctx.fillStyle = this.screenType === 'victory' ? '#00ff00' : '#ff0000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.shadowColor = 'rgba(71, 71, 71, 0.75)';
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 6;
        ctx.shadowBlur = 10;
        
        let titleText = this.screenType === 'victory' ? 'VICTORY!' : 'YOU DIET!';
        ctx.fillText(titleText, this.canvasWidth / 2, this.canvasHeight / 2 - 50);
        
        if (this.restartButtonImage.complete) {
            let glowIntensity = (Math.sin(Date.now() * 0.005) + 1) / 2;
            ctx.shadowColor = `rgba(150, 131, 68, ${glowIntensity})`;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 20;
            
            ctx.drawImage(this.restartButtonImage, this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);

            ctx.shadowColor = 'transparent';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
        }
    };

    isButtonClicked(mouseX, mouseY) {
        return mouseX >= this.buttonX && 
               mouseX <= this.buttonX + this.buttonWidth &&
               mouseY >= this.buttonY && 
               mouseY <= this.buttonY + this.buttonHeight;
    };
};