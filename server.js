const PORT = process.env.PORT || 5001;

var express = require("express");
var app = express();
var cors = require('cors');

app.use(cors());
app.use(express.static('public'));

var server = app.listen(PORT, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});