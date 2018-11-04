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
    games: { type: Schema.Types.ObjectId, ref: 'games' },
    players: { type: Schema.Types.ObjectId, ref: 'players' }
});

module.exports = mongoose.model('PlayerGames', playerGameSchema);