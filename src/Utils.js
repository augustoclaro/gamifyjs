const Utils = (function () {
    const _allValues = function (obj) {
        const vals = [];
        for (var key in obj)
            vals.push(obj[key]);
        return vals;
    };
    const _isFunction = function (obj) {
        return typeof obj === "function";
    };
    const _extend = function (target) {
        const length = arguments.length;
        if (length < 2 || !target) return target;
        const transferProps = function(source, dest, propName) {
            Object.defineProperty(dest, propName,
                Object.getOwnPropertyDescriptor(source, propName));
        };
        for (var i = 1; i < length; i++) {
            var source = arguments[i];
            var props = Object.getOwnPropertyNames(source);
            for (var x = 0; x < props.length; x++)
                transferProps(source, target, props[x]);
        }
        return target;
    };
    const _inherit = function (SubC, SuperC) {
        var subProto = Object.create(SuperC.prototype);
        _extend(subProto || {}, SubC.prototype || {});
        SubC.prototype = subProto;
    };
    const _pushMany = function(destArr, sourceArr){
        sourceArr.forEach(function(item){
            destArr.push(item);
        });
    };
    const _box = function(mod){
      return {
          x: mod.pos.x,
          y: mod.pos.y,
          w: mod.size.width,
          h: mod.size.height
      };
    };
    const _boxCollision = function(box1, box2){
      return box1.x < box2.x + box2.w &&
              box1.x + box1.w > box2.x &&
              box1.y < box2.y + box2.h &&
              box1.y + box1.h > box2.y;
    };
    return {
        extend: _extend,
        isFunction: _isFunction,
        allValues: _allValues,
        inherit: _inherit,
        pushMany: _pushMany,
        box: _box,
        boxCollision: _boxCollision
    };
})();