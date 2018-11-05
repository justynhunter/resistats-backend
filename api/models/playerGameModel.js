var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerGameSchema = new Schema({
    team: {
        type: String,
        required: 'team is required'
    },
    isWinner: {
        type: Boolean,
        default: false
    },
    game: { type: Schema.Types.ObjectId, ref: 'games' },
    player: { type: Schema.Types.ObjectId, ref: 'players' }
});

module.exports = mongoose.model('PlayerGames', playerGameSchema);