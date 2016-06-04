const ModuleInjection = (function (_, ModuleBase) {
    const oModuleInjection = function (game) {
        var _getModuleSafe = function (name) {
            var fn = game.getContainerInstance(name);
            if (!fn)
                throw "Could not find module '" & name & "'";
            return fn;
        };
        this.load = function (modules, cb) {
            if (!Array.isArray(modules))
                modules = [modules];
            modules.forEach(function (m) {
                var mod = typeof m === "string" ?
                    new (_getModuleSafe(m))() :
                    m;
                if (typeof m === "string")
                    mod.type = m;
                _.inherit(mod, ModuleBase);
                game.moduleManager.register(mod);
            });
            game.moduleManager.loadAll(function(){
                if (_.isFunction(cb)) cb();
            });
        };  
        this.unload = function (modules) {
            if (!Array.isArray(modules))
                modules = [modules];
            modules.forEach(function (m) {
                game.moduleManager.unregister(m);
            });
        };
        this.create = function (name) {
            var Fn = _getModuleSafe(name);
            //all args but name
            var args = Array.prototype.slice.call(arguments, 1);
            //adds null to arg list to use bind
            args.unshift(null);
            Fn = Function.prototype.bind.apply(Fn, args);
            var obj = new (Fn)();
            obj.type = name;
            return obj;
        };
    };
    return oModuleInjection;
})(Utils, ModuleBase);