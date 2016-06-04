const GameLoop = (function (FrameTimer, _) {
    const _timer = new FrameTimer();
    var _fps, _action, _running;

    const oGameLoop = function (fps, action) {
        _fps = parseFloat(fps);
        if (_.isFunction(action))
            _action = action;
        else throw "GameLoop parameter must be a function.";
    };

    const _mainLoop = function () {
        const interval = 1000 / _fps;
        if (_running)
            window.requestAnimationFrame(_mainLoop);
        const elapsed = _timer.getElapsedTicks();
        if (elapsed > interval)
            _action(elapsed);
        _timer.tick(interval);
    };

    const _start = function () {
        _running = true;
        _timer.tick();
        _mainLoop();
    };

    const _stop = function () {
        _running = false;
    };

    oGameLoop.prototype = {
        start: _start,
        stop: _stop
    };

    return oGameLoop;
}) (FrameTimer, Utils);