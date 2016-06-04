const CollisionInjection = (function (_) {
    return function (game) {
        const _watch = function (name, mods1, mods2, fn) {
            if (!mods1)
                throw "Watch argument mods1 can't be null";
            if (!mods2)
                throw "Watch argument mods2 can't be null";
            if (!_.isFunction(fn))
                throw "Watch argument fn must be a function";
            if (!Array.isArray(mods1))
                mods1 = [mods1];
            if (!Array.isArray(mods2))
                mods2 = [mods2];
            game.collisionWatchs[name] = {
               modules1: mods1, 
               modules2: mods2,
               callback: fn
            };
        };
        this.watch = _watch;
    };
})(Utils);