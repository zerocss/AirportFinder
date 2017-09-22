var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

Airport = require("./models/airport");
State = require("./models/state");

mongoose.connect("mongodb://localhost/airportfinder");
let db = mongoose.connection;

//CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Alow-Headers", "X-Requested-With,content-type");
    next();
});

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.send("Please use /api/airports or /api/states");
});

//Airports
app.get("/api/airports", function(req, res) {
    Airport.getAirports(function(err, docs) {
        if(err) {
            console.log(err);
            res.send(err)
        }
        res.json(docs);
    })
})
//States
app.get("/api/states", function(req, res) {
    State.getStates(function(err, docs) {
        if(err) {
            console.log(err);
            res.send(err)
        }
        res.json(docs);
    });
})

app.get('/api/airports/state/:state', (req, res) => {
  Airport.getAirportsState(req.params.state, (err, docs) => {
    if(err){
      console.log(err);
      res.send(err);
    }
    res.json(docs);
  });
});
// app.get("/api/airports/state/:state", function(req, res) {
//     Airport.getAirportsState(req.params.state, function(err, docs) {
        
//     })
// })

app.listen(3000, function() {
    console.log("AirportFinder started...");
})