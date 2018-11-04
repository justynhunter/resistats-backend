var mongoose = require('mongoose'),
    Game = mongoose.model('Game');

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
    var newGame = new Game(req.body);
    newGame.save((err,game) => {
        if (err)
            res.send(err);
        res.json(game);
    });
};

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