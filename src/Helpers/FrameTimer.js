const FrameTimer = function () {
    this.lastTick = new Date().getTime();
    this.getElapsedTicks = function () {
        return this.frameSpacing || 0;
    };
    this.tick = function (expectedInterval) {
        const _currentTick = new Date().getTime();
        this.frameSpacing = _currentTick - this.lastTick;
        this.lastTick = _currentTick;
        if (expectedInterval)
            this.lastTick -= this.frameSpacing % expectedInterval;
    };
};