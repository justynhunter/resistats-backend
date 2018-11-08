var mongoose = require('mongoose'),
    Game = mongoose.model('Games'),
    Player = mongoose.model('Players');

// /game
exports.listRecent = (req, res) => {
    Game
        .find()
        .sort('-date')
        .limit(10)
        .populate('spies')
        .populate('resistance')
        .exec((err, games) => {
            if (err)
                res.send(err);
            res.json(games);
        });
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
exports.getPlayers = (req, res) => {
    var players = [];
    Game.findOne({_id: req.params.gameId})
        .populate('spies')
        .populate('resistance')
        .exec((err, game) => {
            if (err) res.send(err);
            players.push(...game.resistance);
            players.push(...game.spies);
            players = shuffle(players);
            res.json(players);
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

    await Game.updateOne({_id: req.params.gameId}, game);

    res.json(game);
};

// DELETE
exports.removePlayer = (req, res) => {
    Game.findById(req.params.gameId, (err, game) => {
        var index = game.spies.indexOf(req.body.playerId);
        if (index > -1) {
            game.spies.splice(index, 1);
        }
        index = game.resistance.indexOf(req.body.playerId);
        if (index > -1) {
            game.resistance.splice(index, 1);
        }
        Game.updateOne({_id: req.params.gameId}, game, (err) => {
            if (err) res.send(err);
            res.json(game);
        });

    });
};

// /games/:gameId/players/spies
exports.getSpies = (req, res) => {
    Game.findById(req.params.gameId, (err, game) => {
        if (err) res.send(err);
        res.json(game.spies);
    }).populate('spies');
};

// /games/:gameId/players/resistance
exports.getResistance = (req, res) => {
    Game.findById(req.params.gameId, (err, game) => {
        if (err) res.send(err);
        res.json(game.resistance);
    }).populate('resistance');
};

// Util
const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }