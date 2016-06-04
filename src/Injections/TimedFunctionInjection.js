const TimedFunctionInjection = (function (TimedFunction) {
    return function () {
        const timedFunction = new TimedFunction();
        this.create = function (action, interval) {
            return timedFunction.create(action, interval);
        };
    };
})(TimedFunction);