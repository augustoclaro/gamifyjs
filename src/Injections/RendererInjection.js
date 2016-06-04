const RendererInjection = (function (_) {
    return function (game) {
        const ORenderer = function (layer) {
            var rendererObj = this;
            rendererObj.layer = layer || 0;
            rendererObj.layers = {};
            rendererObj.renderCircle = function (destPos, radius, color) {
                const _ctx = rendererObj.getContext(rendererObj.layer);
                _ctx.beginPath();
                _ctx.fillStyle = color;
                _ctx.arc(destPos.x, destPos.y, radius, 0, 2 * Math.PI, false);
                _ctx.fill();
                _ctx.closePath();
            };
            rendererObj.renderLine = function (from, to, lineWidth, color) {
                const _ctx = rendererObj.getContext(rendererObj.layer);
                _ctx.beginPath();
                if (color)
                    _ctx.strokeStyle = color;
                if (lineWidth)
                    _ctx.lineWidth = lineWidth;
                _ctx.moveTo(from.x, from.y);
                _ctx.lineTo(to.x, to.y);
                _ctx.stroke();
                _ctx.closePath();
            };

            rendererObj.fillBG = function (color) {
                const _ctx = rendererObj.getContext(rendererObj.layer);
                _ctx.beginPath();
                _ctx.fillStyle = color;
                _ctx.rect(0, 0, _ctx.canvas.width, _ctx.canvas.height);
                _ctx.fill();
                _ctx.closePath();
            };

            const _drawImageFromCenterPoint = function (img, centerPoint, offset, size, deg) {
                const _ctx = rendererObj.getContext(rendererObj.layer);
                deg = deg || 0;
                var rad = deg * Math.PI / 180;
                _ctx.translate(centerPoint.x, centerPoint.y);
                _ctx.rotate(rad);
                _ctx.drawImage(img,
                    offset.x,
                    offset.y,
                    offset.width,
                    offset.height,
                    size.width / 2 * -1,
                    size.height / 2 * -1,
                    size.width,
                    size.height);
                _ctx.rotate(rad * -1);
                _ctx.translate(centerPoint.x * -1, centerPoint.y * -1);
            };

            const _getCenterPoint = function (pos, size) {
                return {
                    x: pos.x + size.width / 2,
                    y: pos.y + size.height / 2
                };
            };

            rendererObj.renderSprite = function (spriteSheet, spriteName, destPos, destSize, fromCenter) {
                const $pos = game.getContainerInstance("$pos");
                destPos = destPos || {
                    x: 0,
                    y: 0
                };
                const _offset = spriteSheet.getOffset(spriteName);
                destSize = destSize || {
                    height: _offset.height,
                    width: _offset.width
                };
                const centerPoint = fromCenter ?
                    destPos : $pos.getCenterPoint(destPos, destSize);
                _drawImageFromCenterPoint(spriteSheet.getImage(), centerPoint,
                    _offset, destSize,
                    (_offset.rotate || 0) + (destPos.rotate || 0));
            };

            rendererObj.renderText = function (text, opt) {
                const _ctx = rendererObj.getContext(rendererObj.layer);
                if (opt.font)
                    _ctx.font = opt.font;
                if (opt.color)
                    _ctx.fillStyle = opt.color;
                if (opt.align)
                    _ctx.textAlign = opt.align;
                var maxWidth;
                if (opt.maxWidth)
                    maxWidth = opt.maxWidth;
                _ctx.fillText(text, opt.pos.x, opt.pos.y, maxWidth);
            };
        };
        this.fromLayer = function (layer) {
            var renderer = new ORenderer(layer);
            renderer.getContext = game.renderer.getContext;
            return renderer;
        };
        this.fromContext = function (context) {
            var renderer = new ORenderer();
            renderer.getContext = function(){return context;};
            return renderer;
        };
        this.renderNow = function(fn){
            if (!_.isFunction(fn)) return;
            fn(game.renderer.canvasGame.getContext());
        };
    };
})(Utils);