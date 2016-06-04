const StateInjection = (function () {
    return function (game) {
        this.changeTo = function (state) {
            game.setState(state);
        };
    };
})();