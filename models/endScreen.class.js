class EndScreen extends DrawableObject {
    isVisible = false;
    screenType = '';
    menuButton = new Image();
    buttonWidth = 250;
    buttonHeight = 150;
    buttonX;
    buttonY;
    fadePhase = 'none';
    fadeProgress = 0;
    fadeSpeed = 0.015;
    isMenuHovered = false;

    constructor(canvasWidth, canvasHeight) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.buttonX = (this.canvasWidth / 2) - (this.buttonWidth / 2);
        this.buttonY = (this.canvasHeight / 2) + 100;
        this.loadEndScreenImages();
    };


    loadEndScreenImages() {
        this.menuButton.src = 'img/buttons/menuButton2.png';
    };


    show(screenType) {
        this.isVisible = true;
        this.screenType = screenType;
        if (screenType === 'defeat') {
            this.fadePhase = 'darkening';
            this.fadeProgress = 0;
            this.startFadeAnimation();
        } else {
            this.fadePhase = 'complete';
            this.fadeProgress = 1;
        }
    };

    
    hide() {
        this.isVisible = false;
        this.fadePhase = 'none';
        this.fadeProgress = 0;
    };


    startFadeAnimation() {
        let animationInterval = setInterval(() => {
            if (!this.isVisible) {
                clearInterval(animationInterval);
                return;
            }
            this.fadeProgress += this.fadeSpeed;
            this.handleFadeTransition(animationInterval);
        }, 1000 / 30);
    };


    handleFadeTransition(animationInterval) {
        switch (this.fadePhase) {
            case 'darkening':
                if (this.fadeProgress >= 1) {
                    this.fadePhase = 'text-fade';
                    this.fadeProgress = 0;
                }
                break;
            case 'text-fade':
                if (this.fadeProgress >= 1) {
                    this.fadePhase = 'button-fade';
                    this.fadeProgress = 0;
                }
                break;
            case 'button-fade':
                if (this.fadeProgress >= 1) {
                    this.fadePhase = 'complete';
                    this.fadeProgress = 1;
                    clearInterval(animationInterval);
                }
                break;
        }
    };


    draw(ctx) {
        if (!this.isVisible) return;
        if (this.fadePhase === 'darkening') {
            let darknessOpacity = this.fadeProgress;
            ctx.fillStyle = `rgba(0, 0, 0, ${darknessOpacity * 0.9})`;
            ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
            return;
        }
        this.drawBlackBackground(ctx);
        this.fadeInText(ctx);
        this.fadeInMenuButton(ctx);
    };


    drawBlackBackground(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    };


    fadeInText(ctx) {
        if (this.fadePhase === 'text-fade' || this.fadePhase === 'button-fade' || this.fadePhase === 'complete') {
            let textOpacity = this.fadePhase === 'text-fade' ? this.fadeProgress : 1;

            ctx.font = 'bold 80px antiquityPrint';
            ctx.fillStyle = this.screenType === 'victory' ?
                `rgba(0, 255, 0, ${textOpacity})` :
                `rgba(255, 0, 0, ${textOpacity})`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.shadowColor = `rgba(71, 71, 71, ${textOpacity * 0.75})`;
            ctx.shadowOffsetX = 6;
            ctx.shadowOffsetY = 6;
            ctx.shadowBlur = 10;

            let titleText = this.screenType === 'victory' ? 'VICTORY!' : 'YOU DIED';
            ctx.fillText(titleText, this.canvasWidth / 2, this.canvasHeight / 2 - 50);

            ctx.shadowColor = 'transparent';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
        }
    };


    fadeInMenuButton(ctx) {
        if (this.fadePhase === 'button-fade' || this.fadePhase === 'complete') {
            if (this.menuButton.complete) {
                let buttonOpacity = this.fadePhase === 'button-fade' ? this.fadeProgress : 1;
                if (this.isMenuHovered) {
                    let glowIntensity = (Math.sin(Date.now() * 0.005) + 1) / 2 * buttonOpacity;
                    ctx.shadowColor = `rgba(150, 131, 68, ${glowIntensity})`;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = 20;
                }

                ctx.globalAlpha = buttonOpacity;
                ctx.drawImage(this.menuButton, this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
                ctx.globalAlpha = 1;

                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
            }
        }
    };


    setMenuHovered(hovered) {
        this.isMenuHovered = hovered;
    };


    isButtonClicked(mouseX, mouseY) {
        if (this.fadePhase !== 'complete') return false;

        return mouseX >= this.buttonX && 
               mouseX <= this.buttonX + this.buttonWidth &&
               mouseY >= this.buttonY && 
               mouseY <= this.buttonY + this.buttonHeight;
    };
};