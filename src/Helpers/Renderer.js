const Renderer = function (canvasGame, canvasBuffer) {
    if (!canvasGame)
        throw "No game canvas found.";
    if (!canvasBuffer)
        throw "No buffer canvas found.";
    this.canvasGame = canvasGame;
    const _ctx = canvasBuffer.getContext();
    const _layers = [];
    this.getContext = function (layer) {
        if (_layers.length <= layer)
            for (var i = _layers.length; i<=layer; i++)
                _layers.push(new Canvas("layer-canvas-"+i, canvasGame.size));
        return _layers[layer].getContext();
    };
    this.render = function (action) {
        _layers.forEach(function(canvas){
            canvas.clear();
        });
        action();
        _layers.forEach(function(canvas){
            canvasGame.getContext().save();
            canvas.drawTo(canvasGame);
            canvasGame.getContext().restore();
        });
    };
};