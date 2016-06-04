const InputInjection = (function (consts) {
    return function (game) {
        this.pressedKeys = function () {
            var input = game.inputManager.getInput();
            var obj = {
                allKeys: input.pressedKeys
            };
            obj.directionKeys = obj.allKeys.filter(function(k){
               return consts.directionKeys.indexOf(k) > -1;
            });
            return obj;
        };
    };
})(Constants);