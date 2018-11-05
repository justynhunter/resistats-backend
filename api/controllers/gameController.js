var mongoose = require('mongoose'),
    Game = mongoose.model('Games'),
    PlayerGame = mongoose.model('PlayerGames');

// /game
exports.listRecent = (req, res) => {
    Game.find(
        {},
        null,
        {sort: 'datePlayed'},
        (err,game) => {
            if (err)
                res.send(err);
            res.json(game);
        }
    );
};

exports.create = (req, res) => {
    var newGame = new Game();
    newGame.datePlayed = new Date();
    
    newGame.save((err,game) => {
        if (err)
            res.send(err);
        res.json(game);
    });
};

// /game/:gameId
exports.get = (req, res) => {
    Game.findById(req.params.gameId, (err, game) => {
        if (err)
            res.send(err);
        res.json(game);
    });
};

exports.update = (req, res) => {
    Game.findOneAndUpdate(
        {_id: req.params.gameId},
        req.body,
        {new: true},
        (err, game) => {
            if (err)
                res.send(err);
            res.json(game);
        }
    );
};

exports.delete = (req,res) => {
    Game.remove(
        { _id: req.params.gameId },
        (err, game) => {
            if (err)
                res.send(err)
            res.json({message: 'Game deleted'});
        }
        
    )
}

// /game/:gameId/players
exports.getPlayers = (req, res) => {
    var playerGame = PlayerGame.find({gameId: req.params.gameId});
    var players = [];
    playerGame.forEach((playerGame) => {
        players.push(playerGame.player);
    });
    res.json(players);
};

// /game/:gameId/players/:playerId
exports.addPlayer = (req, res) => {
    var playerGame = new PlayerGame();
    playerGame.gameId = req.params.gameId;
    playerGame.playerId = req.params.playerId;
    playerGame.team = req.body.team;
    
    playerGame.save((err,playergame) => {
        if (err)
            res.send(err);
        res.json(playerGame);
    });
}

exports.removePlayer = (req, res) => {
    PlayerGame.remove(
        {
            gameId: req.params.gameId,
            playerId: req.params.playerId
        },
        (err, playerGame) => {
            if (err)
                res.send(err);
            res.json({message: 'player removed'});
        }
    )
}