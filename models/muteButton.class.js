class MuteButton extends DrawableObject {
    buttonImage = new Image();
    mutedButtonImage = new Image();
    buttonWidth = 60;
    buttonHeight = 60;
    buttonX;
    buttonY;
    isHovered = false;

    constructor(canvasWidth, canvasHeight) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.buttonX = this.canvasWidth - (this.buttonWidth * 2) - 30;
        this.buttonY = 20;
        this.loadButtonImages();
    }

    loadButtonImages() {
        this.buttonImage.src = 'img/buttons/soundButtonOn.png';
        this.mutedButtonImage.src = 'img/buttons/soundButtonOff.png';
    }

    draw(ctx) {
        const currentImage = soundManager.isMuted ? this.mutedButtonImage : this.buttonImage;
        
        if (currentImage.complete) {
            if (this.isHovered) {
                let glowIntensity = (Math.sin(Date.now() * 0.004) + 1) / 2;
                ctx.shadowColor = `rgba(150, 131, 68, ${glowIntensity})`;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 15;
            }
            ctx.drawImage(currentImage, this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }
    };


    setHovered(hovered) {
        this.isHovered = hovered;
    };


    isButtonClicked(mouseX, mouseY) {
        const canvas = document.getElementById('canvas');
        const rect = canvas.getBoundingClientRect();
        
        const scaleX = this.canvasWidth / rect.width;
        const scaleY = this.canvasHeight / rect.height;
        
        const canvasX = mouseX * scaleX;
        const canvasY = mouseY * scaleY;
        
        return canvasX >= this.buttonX && 
               canvasX <= this.buttonX + this.buttonWidth &&
               canvasY >= this.buttonY && 
               canvasY <= this.buttonY + this.buttonHeight;
    };

}