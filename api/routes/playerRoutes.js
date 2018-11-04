module.exports = function(app) {
    var players = require('../controllers/playerController');

    // routes
    app.route('/player')
        .get(players.list)
        .post(players.create);

    app.route('/player/:playerId')
        .get(players.get)
        .put(players.update)
        .delete(players.delete);
};