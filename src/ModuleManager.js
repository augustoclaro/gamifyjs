const ModuleManager = (function (asyncLoop) {
    const _modules = [];
    const _register = function (module) {
        _modules.push(module);
    };
    const _unregister = function (module) {
        _modules.splice(_modules.indexOf(module), 1);
        module.loaded = false;
    };
    const _clear = function (module) {
        _modules.length = 0;
    };
    const _loadAll = function (cb) {
        asyncLoop(_modules, function (module, next) {
            if (!module.loaded)
                module.load(function(){
                    module.loaded = true;
                    next();
                });
            else next();
        }, cb);
    };
    const _renderAll = function () {
        _modules.forEach(function (m) {
            if (m.loaded){
                m.update();
                m.render();
            }
        });
    };
    const _getByType = function (type) {
        return _modules.filter(function (m) {
            return m.type === type;
        });
    };
    const _moduleManager = function () { };
    _moduleManager.prototype = {
        register: _register,
        unregister: _unregister,
        clear: _clear,
        loadAll: _loadAll,
        renderAll: _renderAll,
        getByType: _getByType
    };
    return _moduleManager;
})(AsyncLoop);