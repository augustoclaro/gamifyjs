const GameInjection = (function () {
    return function (game) {
        this.getConfig = function () {
            return game.config;
        };
    };
})();