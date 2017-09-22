var mongoose = require("mongoose");
State = require("./state");
//Airport Schema
var airportSchema = mongoose.Schema({
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

var Airport = module.exports = mongoose.model("Airport", airportSchema);

//Fetch Aiports
module.exports.getAirports = function(callback, limit) {
    Airport.find(callback);
}

module.exports.getAirportsState = (stateCode, callback, limit) => {
  State.findOne({code: stateCode}, (err, state) => {
    Airport.find({
      loc: {
        $geoWithin:{
          $geometry: state.loc
        }
      }
    },
  {
    name: 1,
    type: 1,
    code: 1,
    _id:0
  }, callback).limit().sort([['name', 'ascending']]);
  });
}

// module.exports.getAirportsState = function(stateCode, callback, limit) {
//     State.findOne({code: stateCode}, function(err, state) {
//         Airport.find({
//             loc: {
//                 $geoWithin: {
//                     $geometry: state.loc
//                 }
//             }
//         },
//         {
//             name: 1,
//             type: 1,
//             code: 1,
//             _id: 0
//         }, callback).limit().sort([["name", "ascending"]]);
//     });
// }






