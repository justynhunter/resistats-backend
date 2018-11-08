var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    datePlayed: {
        type: Date,
        required: 'datePlayed is required'
    },
    spies: [{
        type: Schema.Types.ObjectId, ref: 'Players'
    }],
    resistance: [{
        type: Schema.Types.ObjectId, ref: 'Players'
    }],
    winner: {
        type: String
    }
});

module.exports = mongoose.model('Games', gameSchema);