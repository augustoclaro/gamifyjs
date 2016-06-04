const Gamify = (function (Game) {
    const games = {};

    const gameFn = function (name, config, modules) {
        if (config === modules === undefined) {
            const game = games[name];
            if (!game)
                throw "Could not find game import '" + name + "'";
            return game;
        }
        return (games[name] = new Game(name, config, modules));
    };

    return {
        game: gameFn
    };
}) (Game);