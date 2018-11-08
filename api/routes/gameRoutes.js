module.exports = function(app) {
    var games = require('../controllers/gameController');

    // routes
    app.route('/game')
        .get(games.listRecent)
        .post(games.create);

    app.route('/game/:gameId')
        .get(games.get)
        .put(games.update)
        .delete(games.delete);

    app.route('/game/:gameId/players')
        .get(games.getPlayers)
        .post(games.addPlayer)
        .delete(games.removePlayer);
    
    app.route('/game/:gameId/players/spies')
        .get(games.getSpies);
    
    app.route('/game/:gameId/players/resistance')
        .get(games.getResistance);
};