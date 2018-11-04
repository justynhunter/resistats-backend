var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    datePlayed: {
        type: Date,
        required: 'datePlayed is required'
    },
    playersGames: {
        type: Schema.Types.ObjectId, ref: 'playerGames'
    }
});

module.exports = mongoose.model('Games', gameSchema);