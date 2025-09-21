class ControlsScreen extends DrawableObject {
    isVisible = false;
    backButtonImage = new Image();
    buttonWidth = 150;
    buttonHeight = 60;
    buttonX;
    buttonY;
    isBackHovered = false;
    
    constructor(canvasWidth, canvasHeight) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.buttonX = 50;
        this.buttonY = 50;
        this.loadControlsImages();
    };

    loadControlsImages() {
        this.backButtonImage.src = 'img/buttons/backButton.png';
    };

    show() {
        this.isVisible = true;
    };

    hide() {
        this.isVisible = false;
    };

    draw(ctx) {
        if (!this.isVisible) return;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Content-Bereich
        let contentWidth = 800;
        let contentHeight = 500;
        let contentX = (this.canvasWidth - contentWidth) / 2;
        let contentY = (this.canvasHeight - contentHeight) / 2;

        ctx.fillStyle = '#26212bff';
        ctx.fillRect(contentX, contentY, contentWidth, contentHeight);

        ctx.strokeStyle = '#968344';
        ctx.lineWidth = 3;
        ctx.strokeRect(contentX, contentY, contentWidth, contentHeight);

        // Titel
        ctx.font = 'bold 48px antiquityPrint';
        ctx.fillStyle = '#968344';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 3;
        
        ctx.fillText('Controls', this.canvasWidth / 2, contentY + 40);

        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;

        // Controls-Text
        ctx.font = '16px antiquityPrint';
        ctx.fillStyle = '#968344';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        let textLines = [
            'Movement:',
            'A - Move Left',
            'D - Move Right', 
            'W - Jump',
            '',
            'Attack:',
            'SPACE - Fireball',
            'E - whip',
            '',
            'Objective:',
            'Defeat all enemies to win!',
            'Collect potions to restore HP/Mana',
            'Collect rubies for points'
        ];

        let lineHeight = 28;
        let startY = contentY + 100;

        textLines.forEach((line, index) => {
            if (line.includes(':')) {
                ctx.font = 'bold 18px antiquityPrint';
            } else {
                ctx.font = '18px antiquityPrint';
            }
            ctx.fillText(line, contentX + 40, startY + (index * lineHeight) + 20);
        });

        if (this.backButtonImage.complete) {
            if (this.isBackHovered) {
                let glowIntensity = (Math.sin(Date.now() * 0.004) + 1) / 2;
                ctx.shadowColor = `rgba(150, 131, 68, ${glowIntensity})`;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 15;
            }
            ctx.drawImage(this.backButtonImage, this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        }

        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    };


    setBackHovered(hovered) {
        this.isBackHovered = hovered;
    };


    isBackButtonClicked(mouseX, mouseY) {
        return mouseX >= this.buttonX && 
               mouseX <= this.buttonX + this.buttonWidth &&
               mouseY >= this.buttonY && 
               mouseY <= this.buttonY + this.buttonHeight;
    };
};