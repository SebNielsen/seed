/**
 * Created by sebastiannielsen on 07/04/2016.
 */
var express = require("express");
var router = express.Router();

router.get("/names",function(req,res){
    res.json([{msg: "Peter"}, {msg: "Kurt"},{msg: "Hanne"}]);
});

router.get("/hellos",function(req,res){
    res.json([{msg: "Hello World" }, {msg: "Hello all"},{msg: "Hello guys"}]);
});

module.exports = router;