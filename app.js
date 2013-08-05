var express = require('express')
  , app = express()
  , http = require('http')
  , fs = require('fs')
  , server = http.createServer(app)
  , osc = require('node-osc');

/***********************************************************/

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    app.use(express.errorHandler()); 
});

app.get('/', function(req, res){
    res.render('hiper3', {
        title: 'hiperorganicos osc viz',
        app_js: 'hiper3'
    });
});

var oscServer
  , oscClient
  , io = require('socket.io').listen(server)

oscServer = new osc.Server(22244, 'localhost');
oscClient = new osc.Client('localhost', 22243);

console.log(oscClient);

// bind callbacks.
io.sockets.on('connection', function(client) {
    oscServer.on('message', function(msg, rinfo) {
        console.log(msg);
        client.emit('message', {
            address: msg[0]
          , args: msg[1]
        });
    });
});


server.listen(3000);
console.log("Express server listening in %s mode", app.settings.env);
