const PORT = process.env.PORT || 5001;

var express = require("express");
var app = express();

app.use(express.static('public'));

app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});

var server = app.listen(PORT, function() {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});