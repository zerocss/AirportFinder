var mongoose = require("mongoose");

//State Schema
var stateSchema = mongoose.Schema({
    loc: {
        type: {
            type: String
        },
        coordinates: {
            type: Array
        }
    },
    name: {
        type: String
    },
    code: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var State = module.exports = mongoose.model("State", stateSchema);

//Fetch States
module.exports.getStates = function(callback, limit) {
    State.find(callback);
}






