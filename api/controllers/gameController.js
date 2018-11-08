var mongoose = require('mongoose'),
    Game = mongoose.model('Games'),
    Player = mongoose.model('Players');

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
// GET
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

// POST
exports.addPlayer = async (req, res) => {
    var game = {};
    
    await Game.findById(req.params.gameId, (err, g) => {
        if (err) res.send(err);
        game = g;
    });

    await Player.findById(req.body.playerId, (err, player) => {
        if (err) res.send(err);
        if (req.body.team == 'spies')
            game.spies.push(player);
        else if (req.body.team == 'resistance')
            game.resistance.push(player);
    });
    res.json(game);
};

// DELETE
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
};