class Canvas {
    constructor(el) {
        this.ctx = document.querySelector(el).getContext('2d');
    }
    drawRectangular(data, type, color) {
        this.ctx.fillStyle = color;
        type === 'fill' ? this.ctx.fillRect(...data) : '';
        type === 'stroke' ? this.ctx.strokeRect(...data) : '';
        type === 'clear' ? this.ctx.clearRect(...data) : '';
    }
    draw(data, type, color) {
        this.ctx.fillStyle = color || '#000';
        this.ctx.beginPath();
        this.ctx.moveTo(...data[0]);
        for (let i = 1; i < data.length; i++) {
            this.ctx.lineTo(...data[i]);
        }
        this.ctx.closePath();
        type === 'fill' ? this.ctx.fill() : this.ctx.stroke();
    }
}

export default Canvas