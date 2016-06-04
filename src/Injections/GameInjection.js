const GameInjection = (function (TimedFunction) {
    return function (game) {
        var timedFunction = new TimedFunction();
        this.getConfig = function () {
            return game.config;
        };
        this.createTimedFunction = function (action, interval) {
            return timedFunction.create(action, interval);
        };
    };
})(TimedFunction);