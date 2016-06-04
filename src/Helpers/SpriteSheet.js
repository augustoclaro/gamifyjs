const SpriteSheet = function (image, data) {
    var _image = image,
        _width = data.width,
        _height = data.height,
        _margin = data.margin || 0,
        _sprites = data.sprites;
    this.getOffset = function (name) {
        for (var _i = 0; _i < _sprites.length; _i++) {
            const _sprite = _sprites[_i];
            if (_sprite.name === name)
                return {
                    x: _sprite.x * _width + _margin,
                    y: _sprite.y * _height + _margin,
                    width: _width - 2 * _margin,
                    height: _height - 2 * _margin,
                    rotate: _sprite.rotate
                };
        }
        return null;
    };
    this.getImage = function () {
        return _image;
    };
    this.size = {
        width: _width,
        height: _height
    };
};