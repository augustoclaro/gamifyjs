const Animation = (function (_, EventEmitter) {
    const oAnimation = function(frames, spriteSheet, pos, size){
        const animObj = this;
        animObj.id = "anim-" + frames.length + "-" + new Date().getTime();
        animObj.animating = true;
        animObj.frameIndex = 0;
        
        const _frames = frames;
        const _sprideSheet = spriteSheet;
        const _pos = pos;
        const _size = size;
        
        var _frameDuration = frames[0].time;
        var _animated;
        
        const _render = function($renderer){
            $renderer.fromLayer(_pos.layer || 0).renderSprite(_sprideSheet,
                                   _frames[animObj.frameIndex].sprite,
                                   _pos,
                                   _size);
        };
        
        const _animate = function (renderer, elapsedTime) {
            if (!animObj.animating) return;
            _render(renderer);
            _frameDuration -= elapsedTime;
            if (_frameDuration <= 0) {
                animObj.frameIndex++;
                if (animObj.frameIndex === _frames.length){
                    animObj.frameIndex = 0;
                    animObj.emit("animated", animObj);
                }
                _frameDuration = _frames[animObj.frameIndex].time;
            }
        };
        
        animObj.render = _render;
        animObj.animate = _animate;
    };
    _.inherit(oAnimation, EventEmitter);
    return oAnimation;
})(Utils, EventEmitter);