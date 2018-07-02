const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * The Win model
 */
module.exports = mongoose.model('Win', new Schema({

    /**
     * Define a 'Win' model
     * 
     * Requirements:
     * 
     * Each win should contain (at least):
     * 
     *  1) The name of the winner (string)
     *  2) The name of the game played (string)
     *  3) The date the game was played (date)
     * 
     */
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    game: {type: String, required: true},
    score: {type: Number, required: true},
    symbol: {type: String}
}));