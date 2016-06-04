const Game = (function (consts,
    ModuleManager,
    InputManager,
    InputInjection,
    AnimationInjection,
    PosInjection,
    CollisionInjection,
    SpriteInjection,
    ImageLoaderInjection,
    Renderer,
    FrameTimer,
    GameLoop,
    Canvas,
    AssignmentObject,
    GameInjection,
    ModuleInjection,
    RendererInjection,
    TimedFunctionInjection,
    _) {
    const oGame = function (name, config, inheritGames) {
        var gameObj = this;
        const _defaultConfigs = {
            size: {
                width: 500,
                height: 500
            },
            fps: 50,
            canvasId: "game-canvas-" + new Date().getTime()
        };
        const _name = name,
            _config = _.extend(_defaultConfigs, config),
            _services = {},
            _states = {},
            _modules = {},
            _consts = {},
            _container = {};
        inheritGames.forEach(function (game) {
            _.extend(_services, game.services);
            _.extend(_states, game.states);
            _.extend(_modules, game.modules);
            _.extend(_consts, game.consts);
        });

        const _getAssignment = function (name, data, obj, context) {
            if (!name) throw context + " must have a name";
            if (!data || (!Array.isArray(data) && !_.isFunction(data)))
                throw context + " '" & name & "' implementation must be a function or array containing a function.";
            const injections = [];
            var fn = data;
            if (Array.isArray(data)) {
                while (data.length && !_.isFunction(data[0]))
                    injections.push(data.shift());
                if (!data.length || !_.isFunction(data[0]))
                    throw "Last parameter must be a function at " + name;
                fn = data[0];
            }
            if (obj[name])
                throw context + " '" & name & "' exists.";
            obj[name] = new AssignmentObject(name, context, injections, fn);
        };

        const _serviceFn = function (name, data) {
            _getAssignment(name, data, _services, "Service");
        };

        const _stateFn = function (name, data) {
            _getAssignment(name, data, _states, "State");
        };

        const _moduleFn = function (name, data) {
            _getAssignment(name, data, _modules, "Module");
        };

        const _constFn = function (name, data) {
            if (!name) throw "Constant must have a name";
            if (_consts[name])
                throw " '" & name & "' exists.";
            _consts[name] = data;
        };

        var _instantiating;
        const _instantiate = function (assObj, subInstance) {
            if (!subInstance)
                _instantiating = assObj;
            const deps = [];
            assObj.dependencies.forEach(function (dep) {
                if (!_container[dep]) {
                    var depObj = _services[dep] || _states[dep] || _modules[dep];
                    if (!depObj)
                        throw "Could not find dependency '" & dep & "' at '" & assObj.name & "'.";
                    if (depObj === _instantiating)
                        throw "Circular dependency found: '" & _instantiating.name & "' -> '" & dep & "'";
                    _instantiate(depObj, true);
                }
                deps.push(_container[dep]);
            });
            switch (assObj.type) {
                case "Service":
                    deps.unshift(null);
                    _container[assObj.name] = new (Function.prototype.bind.apply(assObj.fn, deps))();
                    break;
                case "State":
                case "Module":
                    _container[assObj.name] = assObj.fn.apply(null, deps);
                    break;
            }
        };

        const _fillContainer = function () {
            _.extend(_container, _consts);
            _container.$game = new GameInjection(gameObj);
            _container.$module = new ModuleInjection(gameObj);
            _container.$renderer = new RendererInjection(gameObj);
            _container.$imageLoader = new ImageLoaderInjection();
            _container.$sprite = new SpriteInjection();
            _container.$input = new InputInjection(gameObj);
            _container.$animation = new AnimationInjection(gameObj);
            _container.$collision = new CollisionInjection(gameObj);
            _container.$state = new StateInjection(gameObj);
            _container.$timedFunction = new TimedFunctionInjection();
            _container.$pos = new PosInjection();
            _container.$keys = consts.keys;
            _.allValues(_services).forEach(_instantiate);
            _.allValues(_states).forEach(_instantiate);
            _.allValues(_modules).forEach(_instantiate);
        };

        var _canvasGame, _canvasBuffer;
        const _setupCanvas = function () {
            _canvasGame = new Canvas(_config.canvasId, _config.size);
            _canvasBuffer = new Canvas("buffer-canvas-" + new Date().getTime(), _config.size);
            var gameElement = document.querySelector("[gmf-app='" + _name + "']");
            if (!gameElement)
                throw "Could not find element to bootstrap game.";
            gameElement.parentNode.replaceChild(_canvasGame.getElement(), gameElement);
        };

        const _moduleManager = new ModuleManager();
        var _currentState;
        const _setState = function (data) {
            if (!data)
                throw "Invalid null argument 'data'.";
            var state = data;
            if (typeof data === "string")
                state = _states[data];
            if (!state)
                throw "Could not find state " + data;
            if (gameObj.inputManager)
                gameObj.inputManager.clearInput();
            _moduleManager.clear();
            gameObj.animations = [];
            gameObj.collisionWatchs = {};
            _currentState = new (_container[state.name])();
        };

        var gameLoop;
        gameObj.animations = [];
        const _timer = new FrameTimer();
        const _updateAnimations = function (renderer) {
            gameObj.animations = gameObj.animations.filter(function (anim) {
                return anim.animating;
            });
            gameObj.animations.forEach(function (anim) {
                anim.animate(renderer, _timer.getElapsedTicks());
            });
        };
        const _getContainerInstance = function (k) {
            return _container[k];
        };

        gameObj.collisionWatchs = {};
        const _checkForCollisions = function () {
            _.allValues(gameObj.collisionWatchs)
                .forEach(function (watch) {
                    const arrModules1 = [];
                    const arrModules2 = [];
                    watch.modules1.forEach(function (mod) {
                        if (typeof mod === "string")
                            _.pushMany(arrModules1, _moduleManager.getByType(mod));
                        else arrModules1.push(mod);
                    });
                    watch.modules2.forEach(function (mod) {
                        if (typeof mod === "string")
                            _.pushMany(arrModules2, _moduleManager.getByType(mod));
                        else arrModules2.push(mod);
                    });
                    arrModules1.forEach(function (mod1) {
                        arrModules2.forEach(function (mod2) {
                            if (mod1.loaded &&
                                mod2.loaded &&
                                _.boxCollision(_.box(mod1), _.box(mod2)))
                                watch.callback(mod1, mod2);
                        });
                    });
                });
        };
        var _stateLoading = false;
        const _startLoop = function () {
            gameObj.renderer = new Renderer(_canvasGame, _canvasBuffer);
            gameObj.inputManager = new InputManager(_canvasGame);
            gameObj.inputManager.checkForInput();
            _timer.tick();
            gameLoop = new GameLoop(_config.fps, function (elapsedTime) {
                const _continue = function () {
                    _currentState.update(function () {
                        gameObj.renderer.render(function () {
                            _checkForCollisions();
                            _moduleManager.renderAll();
                            _timer.tick();
                            _updateAnimations(_getContainerInstance("$renderer"));
                        });
                    });
                };
                if (_currentState.loaded) {
                    if (!_stateLoading)
                        _continue();
                } else {
                    _stateLoading = _currentState.loaded = true;
                    _currentState.load(function () {
                        _stateLoading = false;
                    });
                }
            });
            gameLoop.start();
        };

        const _start = function () {
            _fillContainer();
            _setupCanvas();
            _setState(_config.initialState || _.allValues(_states)[0]);
            _startLoop();
        };

        gameObj.name = _name;
        gameObj.config = _config;
        gameObj.services = _services;
        gameObj.states = _states;
        gameObj.modules = _modules;
        gameObj.consts = _consts;
        gameObj.service = _serviceFn;
        gameObj.state = _stateFn;
        gameObj.module = _moduleFn;
        gameObj.const = _constFn;
        gameObj.start = _start;
        gameObj.getContainerInstance = _getContainerInstance;
        gameObj.moduleManager = _moduleManager;
        gameObj.setState = _setState;
    };
    return oGame;
})(Constants,
    ModuleManager,
    InputManager,
    InputInjection,
    AnimationInjection,
    PosInjection,
    CollisionInjection,
    SpriteInjection,
    ImageLoaderInjection,
    Renderer,
    FrameTimer,
    GameLoop,
    Canvas,
    AssignmentObject,
    GameInjection,
    ModuleInjection,
    RendererInjection,
    TimedFunctionInjection,
    Utils);