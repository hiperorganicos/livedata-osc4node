var express = require('express')
  , fs = require('fs')
  , socket = require('socket.io')
  , osc = require('./lib/osc4node');

/***********************************************************/
var app = module.exports = express.createServer();

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
        title: 'hip3rorganicos osc viz',
        app_js: 'hiper3'
    });
});

app.get('/example', function(req, res){
    res.render('index', {
        title: 'node4osc client demo'
    });
});

app.listen(3000);
console.log("Express server listening in %s mode", app.settings.env);

/***********************************************************/

var oscServer
  , oscClient
  , io = socket.listen(app);

oscServer = new osc.Server(22244, 'localhost');
oscClient = new osc.Client('localhost', 22243);

console.log(oscClient);

// bind callbacks.
io.sockets.on('connection', function(client) {
    
    oscServer.on('oscmessage', function(msg, rinfo) {
        client.emit('oscmessage', {
            address: msg.address
          , typetag: msg.typetag
          , args: msg.arguments
        });
    });
    //*/
/*
    var contador = 0;
    function test(){
        contador++;
        client.emit('test',contador)
        setTimeout(test,1000);
    }
    test();
    //*/
});
