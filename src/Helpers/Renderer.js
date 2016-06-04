const Renderer = function (canvasGame, canvasBuffer) {
    if (!canvasGame)
        throw "No game canvas found.";
    if (!canvasBuffer)
        throw "No buffer canvas found.";
    const _ctx = canvasBuffer.getContext();
    this.getContext = function () {
        return _ctx;
    };
    this.render = function (action) {
        canvasBuffer.clear();
        action();
        canvasBuffer.transferTo(canvasGame);
    };
};