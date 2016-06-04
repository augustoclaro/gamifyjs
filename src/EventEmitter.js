const EventEmitter = (function(_){
    const events = {};
    const oEventEmitter = function(){};
    
    oEventEmitter.prototype.on = function(event, fn){
        if (!event)
            throw "Event name can't be null";
        if (!_.isFunction(fn))
            throw "Invalid event function";
        if (!events[event])
            events[event] = [];
        events[event].push(fn);
        return this;
    };
    oEventEmitter.prototype.emit = function(event){
        if (!event)
            throw "Event name can't be null";
        var args = Array.prototype.slice.call(arguments, 1);
        var fns = events[event];
        if (fns && fns.length)
            fns.forEach(function(fn){
                fn.apply(null, args);
            });   
    };
    return oEventEmitter;
})(Utils);