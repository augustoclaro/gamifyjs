const Canvas = (function () {
    const _clear = function () {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    };
    const _getElement = function () {
        return this.element;
    };
    const _getContext = function () {
        return this.context;
    };

    const _transferTo = function (canvasTo) {
        var _imgData = this.context.getImageData(0, 0, this.element.width, this.element.height);
        canvasTo.getContext().putImageData(_imgData, 0, 0, 0, 0, this.element.width, this.element.height);
    };
    
    const _drawTo = function(canvasTo){
        canvasTo.getContext().drawImage(
            this.getElement(),
            0, 0,
            this.size.width,
            this.size.height
        );
    };
    
    const _canvas = function (id, size) {
        this.element = document.createElement("canvas");
        if (id)
            this.element.setAttribute("id", id);
        this.element.setAttribute("width", size.width);
        this.element.setAttribute("height", size.height);
        this.context = this.element.getContext("2d");
        this.size = size;
    };
    _canvas.prototype = {
        clear: _clear,
        getElement: _getElement,
        getContext: _getContext,
        transferTo: _transferTo,
        drawTo: _drawTo
    };
    return _canvas;
})();