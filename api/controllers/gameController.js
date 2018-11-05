var mongoose = require('mongoose'),
    Game = mongoose.model('Games'),
    Player = mongoose.model('Players'),
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
exports.getPlayers = async (req, res) => {
    var game = {};
    await Game.findOne(
        {_id: req.params.gameId},
        (err, g) => {
            if (err) res.send(err);
            game = g;
        }
    ).populate('playerGames');

    console.log(game);

    PlayerGame
        .find({game: game})
        .exec(async (err, playerGames) => {
            if (err)
                res.send(err);

            var players = [];
            var mapping = await playerGames.map(async pg => {
                await Player.findOne(
                    {_id: pg.player._id},
                    (err, player) => {
                        if (err) res.send(err);
                        console.log('here: ' + player);
                        players.push(player);
                    }
                );
            });

            Promise.all(mapping).then(() => {
                console.log('res');
                console.log(players);
                res.json(players);  
            })
        }
    );
};

// /game/:gameId/players/:playerId
exports.addPlayer = async (req, res) => {
    var player = {};
    await Player.findOne({_id: req.params.playerId}, (err, p) => {
        if (err) res.send(err);
        player = p;
    });
    var game = {};
    await Game.findOne({_id: req.params.gameId}, (err, g) => {
        if (err) res.send(err);
        game = g;
    });

    var playerGame = new PlayerGame();
    playerGame.game = game;
    playerGame.player = player;
    playerGame.team = req.body.team;

    playerGame.save((err,playergame) => {
        if (err) res.send(err);
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