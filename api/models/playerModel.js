var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: {
        type: String,
        required: 'name is required'
    },
    phone: {
        type: string
    },
    playersGames: {
        type: Schema.Types.ObjectId, ref: 'playerGames'
    }
});

module.exports = mongoose.model('Players', playerSchema);