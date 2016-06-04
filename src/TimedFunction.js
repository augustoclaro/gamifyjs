var TimedFunction = (function (FrameTimer) {
    return function () {
        this.create = function (action, interval) {
            const _timer = new FrameTimer();
            var _duration, _interval = interval;
            return {
                run: function () {
                    if (_duration) _duration -= _timer.getElapsedTicks();
                    else _duration = _interval;

                    if (_duration <= 0) {
                        _duration = 0;
                        action.apply(null, arguments);
                    }
                    _timer.tick();
                },
                setInterval: function(interval){
                    _interval = interval;
                }
            };
        };
    };
})(FrameTimer);