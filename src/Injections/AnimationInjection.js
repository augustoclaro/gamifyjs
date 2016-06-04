const AnimationInjection = (function (Animation) {
    return function (game) {
        const _stop = function (anim) {
            var i = game.animations.map(function(a){
                return a.id;
            }).indexOf(anim.id);
            if (i < 0)
                throw "Could not found animation " + anim;
            game.animations.splice(i, 1);
        };
        this.create = function (frames, spriteSheet, pos, size) {
            return new Animation(frames, spriteSheet, pos, size);
        };
        this.animateOnce = function (anim) {
            game.animations.push(anim.on("animated", function(a){
                a.animating = false;
            }));
        };
        this.animate = function (anim) {
            game.animations.push(anim);
        };
        this.stop = _stop;
    };
})(Animation);