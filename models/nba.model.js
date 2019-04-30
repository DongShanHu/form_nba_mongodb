const mongoose = require('mongoose');

var nbaSchema = new mongoose.Schema({
    Create_time: {
        type: String,
        required: 'This field is required.'
    },
    HomeName: {
        type: String
    },
    AwayName: {
        type: String
    },
    B2B: {
        type: String
    },
    Item: {
        type: String
    },
    compansate: {
        type: String
    },
    AwayScore: {
        type: String
    },
    HomeScore: {
        type: String
    },
    Pass: {
        type: String
    },
    HalfAwayScore: {
        type: String
    },
    HalfHomeScore: {
        type: String
    },
    HalfScore: {
        type: String
    },
    Comment: {
        type: String
    }
});



mongoose.model('nba', nbaSchema);