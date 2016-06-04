const ModuleBase = (function(_, EventEmitter){
    var oModuleBase = function(){
        this.loaded = false;
    };
    _.inherit(oModuleBase, EventEmitter);
    return oModuleBase;
})(Utils, EventEmitter);