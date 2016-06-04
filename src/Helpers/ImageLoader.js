const ImageLoader = (function (_) {
    const _images = {};
    const _loadImages = function (images, cb) {
        const _results = {};
        const _checkFinish = function () {
            if (Object.keys(_results).length === Object.keys(images).length && _.isFunction(cb))
                cb(_results);
        };
        const imgLoaded = function () {
            _images[this.alt] = _results[this.alt] = this;
            _checkFinish();
        };
        for (var _key in images) {
            if (!images.hasOwnProperty(_key))
                continue;
            if (_images.hasOwnProperty(_key)) {
                _results[_key] = _images[_key];
                _checkFinish();
            } else {
                const _img = new Image();
                _img.alt = _key;
                _img.onload = imgLoaded;
                _img.src = images[_key];
            }
        }
    };

    return {
        loadImages: _loadImages
    };
})(Utils);