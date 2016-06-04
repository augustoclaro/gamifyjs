const InputManager = function (canvas) {
    var _canvas = canvas.getElement();
    var _input;
    this.clearInput = function () {
        _input = {
            leftMouseClick: 0,
            rightMouseClick: 0,
            pressedKeys: []
        };
    };
    this.clearInput();
    this.checkForInput = function () {
        _canvas.onmousedown = function (e) {
            if (e.button === 0)
                _input.leftMouseClick = 1;
            else
                _input.rightMouseClick.leftMouseClick = 1;
        };
        _canvas.onmouseup = function () {
            _input.leftMouseClick = _input.rightMouseClick = 0;
        };
        document.onkeydown = function (e) {
            const _key = e.keyCode || e.which;
            if (_input.pressedKeys.indexOf(_key) === -1)
                _input.pressedKeys.push(_key);
        };
        document.onkeyup = function (e) {
            const _key = e.keyCode || e.which;
            const _i = _input.pressedKeys.indexOf(_key);
            if (_i > -1)
                _input.pressedKeys.splice(_i, 1);
        };
    };
    this.getInput = function () {
        return _input;
    };
};