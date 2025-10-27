class ImprintScreen extends DrawableObject {
    isVisible = false;
    backButtonImage = new Image();
    buttonWidth = 150;
    buttonHeight = 60;
    buttonX;
    buttonY;
    isBackHovered = false;
    scrollOffset = 0;
    maxScroll = 0;
    contentHeight = 500;


    constructor(canvasWidth, canvasHeight) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.buttonX = 50;
        this.buttonY = 50;
        this.loadImprintImages();
    };


    loadImprintImages() {
        this.backButtonImage.src = 'img/buttons/backButton.png';
    };


    show() {
        this.isVisible = true;
        this.scrollOffset = 0;
    };


    hide() {
        this.isVisible = false;
        this.scrollOffset = 0;
    };


    scroll(delta) {
        this.scrollOffset += delta;
        if (this.scrollOffset < 0) this.scrollOffset = 0;
        if (this.scrollOffset > this.maxScroll) this.scrollOffset = this.maxScroll;
    };


    draw(ctx) {
        if (!this.isVisible) return;
        this.drawBackground(ctx);
        let { contentY, contentX, contentWidth } = this.drawContentArea(ctx);
        this.clipScrollableArea(ctx, contentX, contentY, contentWidth);
        this.drawScrollableContent(ctx, contentY, contentX);
        ctx.restore();
        this.drawBackButton(ctx);
        this.resetContext(ctx);
    };


    drawBackground(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    };


    drawContentArea(ctx) {
        let contentWidth = 800;
        let contentX = (this.canvasWidth - contentWidth) / 2;
        let contentY = (this.canvasHeight - this.contentHeight) / 2;
        this.drawContentBox(ctx, contentX, contentY, contentWidth);
        return { contentY, contentX, contentWidth };
    };


    drawContentBox(ctx, contentX, contentY, contentWidth) {
        ctx.fillStyle = '#26212bff';
        ctx.fillRect(contentX, contentY, contentWidth, this.contentHeight);
        ctx.strokeStyle = '#968344';
        ctx.lineWidth = 3;
        ctx.strokeRect(contentX, contentY, contentWidth, this.contentHeight);
    };


    clipScrollableArea(ctx, contentX, contentY, contentWidth) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(contentX, contentY, contentWidth, this.contentHeight);
        ctx.clip();
    };


    drawScrollableContent(ctx, contentY, contentX) {
        this.drawTitle(ctx, contentY - this.scrollOffset);
        this.drawImpressumText(ctx, contentY - this.scrollOffset, contentX);
    };


    drawTitle(ctx, contentY) {
        this.setTitleStyle(ctx);
        this.addTitleShadow(ctx);
        ctx.fillText('Impressum', this.canvasWidth / 2, contentY + 40);
        this.removeShadow(ctx);
    };


    setTitleStyle(ctx) {
        ctx.font = 'bold 48px antiquityPrint';
        ctx.fillStyle = '#968344';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
    };


    addTitleShadow(ctx) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 3;
    };


    removeShadow(ctx) {
        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
    };


    drawImpressumText(ctx, contentY, contentX) {
        this.setTextStyle(ctx);
        const textLines = this.getImpressumTextLines();
        const lineHeight = 28;
        const startY = contentY + 100;
        this.renderTextLines(ctx, textLines, contentX, startY, lineHeight);
        this.calculateMaxScroll(textLines.length, lineHeight);
    };


    setTextStyle(ctx) {
        ctx.font = '18px antiquityPrint';
        ctx.fillStyle = '#968344';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
    };


    getImpressumTextLines() {
        return [
            'Angaben gemäß § 5 TMG:',
            'Michel Korfmacher',
            'Salinenstrasse 8',
            '83435 Bad Reichenhall',
            'Deutschland',
            '',
            'Kontakt:',
            'E-Mail: michelkorfmacher@yahoo.de',
            '',
            'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:',
            'Michel Korfmacher',
            'Salinenstrasse 8',
            '83435 Bad Reichenhall',
            '',
            'Haftungsausschluss:',
            'Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir',
            'keine Haftung für die Inhalte externer Links.',
            '',
            'Urheberrecht:',
            'Die Inhalte unterliegen dem deutschen Urheberrecht.'
        ];
    };


    renderTextLines(ctx, textLines, contentX, startY, lineHeight) {
        textLines.forEach((line, index) => {
            ctx.fillText(line, contentX + 40, startY + (index * lineHeight) + 20);
        });
    };


    calculateMaxScroll(lineCount, lineHeight) {
        this.maxScroll = Math.max(0, (lineCount * lineHeight + 150) - this.contentHeight);
    };


    drawBackButton(ctx) {
        if (this.backButtonImage.complete) {
            this.applyHoverEffect(ctx);
            this.renderBackButton(ctx);
            this.resetShadow(ctx);
        }
    };


    applyHoverEffect(ctx) {
        if (this.isBackHovered) {
            let glowIntensity = (Math.sin(Date.now() * 0.004) + 1) / 2;
            ctx.shadowColor = `rgba(150, 131, 68, ${glowIntensity})`;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 15;
        }
    };


    renderBackButton(ctx) {
        ctx.drawImage(
            this.backButtonImage, 
            this.buttonX, 
            this.buttonY, 
            this.buttonWidth, 
            this.buttonHeight
        );
    };


    resetShadow(ctx) {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    };


    resetContext(ctx) {
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