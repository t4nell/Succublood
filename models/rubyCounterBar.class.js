class RubyCounter extends DrawableObject {
    constructor() {
        super();
        this.rubyImage = new Image();
        this.rubyImage.src = 'img/ruby/ruby.png';
    }

    draw(ctx, rubyCount, canvasWidth) {
        // Position definieren
        let rubySize = 60;
        let padding = 30;
        let rubyX = canvasWidth - padding - rubySize;
        let rubyY = padding;
        let textX = rubyX - 10;
        let textY = rubyY + (rubySize / 2);
        
        // Schriftart und Stil
        ctx.font = 'bold 81px antiquityPrint';
        ctx.fillStyle = '#000000ff';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        
        // Text-Schatten
        ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
        
        // Ruby Count zeichnen
        ctx.fillText(rubyCount, textX, textY);
        
        // Schatten zurücksetzen
        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        
        // Ruby-Bild zeichnen
        if (this.rubyImage.complete) {
            ctx.drawImage(this.rubyImage, rubyX, rubyY, rubySize, rubySize);
        }
        
        // Text-Eigenschaften zurücksetzen
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    }
}