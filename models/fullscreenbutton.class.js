class FullscreenButton extends DrawableObject {
    buttonImage = new Image();
    buttonWidth = 60;
    buttonHeight = 60;
    buttonX;
    buttonY;
    isHovered = false;

    
    constructor(canvasWidth, canvasHeight) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.buttonX = this.canvasWidth - this.buttonWidth - 20;
        this.buttonY = 20;
        this.loadButtonImage();
    };


    loadButtonImage() {
        this.buttonImage.src = 'img/buttons/fullscreenButton.png';
    };


    draw(ctx) {
        if (this.buttonImage.complete) {
            if (this.isHovered) {
                let glowIntensity = (Math.sin(Date.now() * 0.004) + 1) / 2;
                ctx.shadowColor = `rgba(150, 131, 68, ${glowIntensity})`;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 15;
            }
            ctx.drawImage(this.buttonImage, this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
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
        
        // Skalierungsfaktor berechnen
        const scaleX = this.canvasWidth / rect.width;
        const scaleY = this.canvasHeight / rect.height;
        
        // Mouse-Koordinaten auf Canvas-Koordinaten umrechnen
        const canvasX = mouseX * scaleX;
        const canvasY = mouseY * scaleY;
        
        return canvasX >= this.buttonX && 
               canvasX <= this.buttonX + this.buttonWidth &&
               canvasY >= this.buttonY && 
               canvasY <= this.buttonY + this.buttonHeight;
    };
}