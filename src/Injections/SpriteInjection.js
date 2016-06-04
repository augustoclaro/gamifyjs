const SpriteInjection = (function (SpriteSheet) {
    return function () {
        this.create = function (image, data) {
            return new SpriteSheet(image, data);
        };
    };
})(SpriteSheet);