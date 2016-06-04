const Constants = (function () {
    const _keys = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        A: 65,
        W: 87,
        D: 68,
        S: 83,
        SPACE: 32
    };
    const _directions = {
        left: "l",
        up: "u",
        right: "r",
        down: "d"
    };
    const _directionKeys = [
        _keys.ARROW_LEFT,
        _keys.ARROW_UP,
        _keys.ARROW_RIGHT,
        _keys.ARROW_DOWN,
        _keys.A,
        _keys.W,
        _keys.D,
        _keys.S
    ];
    return {
        keys: _keys,
        directions: _directions,
        directionKeys: _directionKeys
    };
})();