var mongoose = require('mongoose'),
    Player = mongoose.model('Player');

exports.list = (req, res) => {
    Player.find({}, (err,player) => {
            if (err)
                res.send(err);
            res.json(player);
        }
    );
};

exports.create = (req, res) => {
    var newPlayer = new Player(req.body);
    newPlayer.save((err,player) => {
        if (err)
            res.send(err);
        res.json(player);
    });
};

exports.get = (req, res) => {
    Player.findById(req.params.playerId, (err, player) => {
        if (err)
            res.send(err);
        res.json(player);
    });
};

exports.update = (req, res) => {
    Player.findOneAndUpdate(
        {_id: req.params.playerId},
        req.body,
        {new: true},
        (err, player) => {
            if (err)
                res.send(err);
            res.json(player);
        }
    );
};

exports.delete = (req,res) => {
    Player.remove(
        { _id: req.params.playerId },
        (err, player) => {
            if (err)
                res.send(err)
            res.json({message: 'Player deleted'});
        }
        
    )
}