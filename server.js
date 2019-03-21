const PORT = process.env.PORT || 5000;

var express = require("express");
 
var app = express();

app.use(express.static('public'));
//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));
app.use('/js', express.static(__dirname + '/public/js'));

app.set('GATEWAY_SERVER_URL', process.env.GATEWAY_SERVER_URL);

var server = app.listen(PORT, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});