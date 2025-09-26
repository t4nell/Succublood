class RubyCounter extends DrawableObject {
    constructor() {
        super();
        this.rubyImage = new Image();
        this.rubyImage.src = 'img/ruby/ruby.png';
    };
    

    draw(ctx, rubyCount, canvasWidth) {
        let rubySize = 60;
        let padding = 30;
        let rubyX = canvasWidth - padding - rubySize;
        let rubyY = padding;
        let textX = rubyX - 10;
        let textY = rubyY + (rubySize / 2);

        this.setTextStyle(ctx);
        this.drawRubyCountText(ctx, rubyCount, textX, textY);
        this.drawRubyImage(ctx, rubyX, rubyY, rubySize);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
    };


    setTextStyle(ctx) {
        ctx.font = 'bold 81px antiquityPrint';
        ctx.fillStyle = '#000000ff';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;
    };


    drawRubyCountText(ctx, rubyCount, textX, textY) {
        ctx.fillText(rubyCount, textX, textY);

        ctx.shadowColor = 'transparent';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
    };


    drawRubyImage(ctx, rubyX, rubyY, rubySize) {
        if (this.rubyImage.complete) {
            ctx.drawImage(this.rubyImage, rubyX, rubyY, rubySize, rubySize);
        }
    };
}