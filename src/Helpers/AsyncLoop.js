const AsyncLoop = (function (_) {
    var _arr, _current, _last, _action, _callback;
    const _execute = function () {
        _action(_arr[_current], function () {
            _current++;
            if (_current < _last)
                _execute();
            else if (_.isFunction(_callback))
                _callback();
        });
    };
    const _asyncLoop = function (array, action, cb) {
        if (!Array.isArray(array) || !array.length) return;
        if (!_.isFunction(action)) return;
        _arr = array;
        _current = 0;
        _last = array.length;
        _action = action;
        _callback = cb;
        _execute();
    };
    return _asyncLoop;
})(Utils);