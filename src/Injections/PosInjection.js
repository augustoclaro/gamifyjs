const PosInjection = (function () {
    return function () {
        this.getCenterPoint = function(pos, size){
            return {
                x: pos.x + size.width / 2,
                y: pos.y + size.height / 2  
            };  
        };
        this.fromCenterPoint = function(pos, size){
            return {
                x: pos.x - size.width / 2,
                y: pos.y - size.height / 2  
            };  
        };
    };
})();