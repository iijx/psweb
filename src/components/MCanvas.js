export default class MCanvas {

    constructor(opt) {
        this._canvas = opt.canvas;
        this.ctx = opt.canvas.getContext('2d');

        this._queue = [];


    }

    _drawImage(item) {
        console.log(this, item);
        this.ctx.drawImage(item.image, item.x, item.y, item.w, item.h);
    }

    _drawText(item) {
        console.log(item);
        this.ctx.fillText(item.text, item.x, item.y);
    }

    add(item) {
        this._queue.push(item);
        this.draw();
    }

    draw() {
        // 重置canvas
        this._canvas.width = Number(this._canvas.width);
        this._canvas.height = Number(this._canvas.height);

        for(const item of this._queue) {
            if (item.type === 'img') {
                // ...
                this._drawImage(item);

            }
            else if (item.type === 'text') {
                // ...
                this._drawText(item);
            }
        }
    }
}