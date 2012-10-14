$(function() {

    // create the socket for the local OSC server

    var APP = {
        nodes : [],
        nodesname : []
    };

    var socket = io.connect();
    var txt = "";

    window.APP = APP;

    // bind callbacks for each events.
    socket.on('connect', function() {
        notify('System Connected');
    });

    socket.on('test', function(msg) {
        notify('System Connected '+msg);
    });

    socket.on('oscmessage', function(msg) {
        if(msg.address === "/groupclient/ping"){
            notify(msg.args[0].value + " pingando!");
        } else {
            //console.log(msg.address, msg.args[0].value);
            viz(msg.address,msg.args);
        }
    });
    
    function notify(msg) {
        $('<div></div>')
            .addClass('notification')
            .text(msg)
            .appendTo('#info')
            .fadeIn(1000)
            .delay(2000)
            .fadeOut(500);

        console.log(msg);
    }

    function viz(addr,args){
        
        txt = addr + " /// " + args[0].value;
        
        var addr_a = addr.split('/');
        var nodename = addr_a[1];
        var msg = addr;//.split('/'+nodename).join('');

        if(!APP.nodes[nodename]){
            // create node
            APP.nodesname.push(nodename);
            APP.nodes[nodename] = { paramsname : [], params : [] };
        }

        // create node param
        var node = APP.nodes[nodename];
        var param = 'value';
        if(msg != ''){
            param = msg;
        }
        if(!node.params[param]){
            node.paramsname.push(param);
            node.params[param] = { val: [], c : 0 };
        }
        node.params[param].val[node.params[param].c] = args[0].value;
        node.params[param].c = (node.params[param].c + 1) % 200;
    }

    function sketchProc(processing) {

        var sans = processing.createFont('sans-serif',32);
        var mono = processing.createFont('monospace',14);

        processing.setup = function(){

            processing.size(960,960);
            console.log(processing.PFont.list());

        }

        processing.draw = function() {

            processing.background(0);

            var h = 20;
            var uniqcolor = 0;

            for (var i = 0; i < APP.nodesname.length; i++) {
                var node = APP.nodes[APP.nodesname[i]];
                processing.fill(goodcolor(uniqcolor));
                processing.textFont(mono, 24);
                processing.text( APP.nodesname[i], 0, h );
                for (var j = node.paramsname.length - 1; j >= 0; j--) {
                    var param = node.paramsname[j];
                    var val = node.params[param].val;
                    var c = node.params[param].c;
                    processing.fill(goodcolor(uniqcolor));
                    processing.textFont(mono); 
                    processing.text( node.paramsname[j] + '     ' + val[c-1], 100, h);
                    h += 20;
                    for(var k = 1; k < 200; k++){
                        processing.stroke(goodcolor(uniqcolor));
                        processing.strokeWeight(1);
                        if(val[k]){
                            processing.line(200+760/200*(k-1), i*100 + 100*val[k-1], 200+760/200*(k), i*100 + 100*val[k]);
                        }
                    }
                    processing.ellipse( 200+760/200*(c-1), i*100 + 100*val[c-1], 5, 5);
                    uniqcolor+=2.5;
                };
                uniqcolor += 3;
                h += 100;
            }
            
           
        };

        function goodcolor(col){
            var frequency = 0.25;
            var r = ( Math.sin(frequency * col + 0) * 127 + 128 );
            var g = ( Math.sin(frequency * col + 2) * 127 + 128 );
            var b = ( Math.sin(frequency * col + 4) * 127 + 128 );
            return processing.color(r,g,b);
        }
    }

    var canvas = document.getElementById("canvas");
    var processingInstance = new Processing(canvas, sketchProc);


});

