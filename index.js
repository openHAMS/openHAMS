var app = require('express')();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var serialport = require('serialport');

var jsonContent;
var portName = '/dev/ttyACM0';
if(process.argv.length > 2)
{
    portName = process.argv[2];
}

var sp = serialport.SerialPort;
var ardu = new sp(portName, 
{
    baudRate:9600, 
    parser:serialport.parsers.readline("\r\n")
});


var pingUrl = "http://ipecho.net/plain";


app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/index.html');
});

ardu.on('open', function() { console.log("open"); });

ardu.on('data', function(data)
{
    var jsonData = JSON.parse(data);
    io.sockets.emit('temp', jsonData.temp);
    io.sockets.emit('atm', jsonData.atm);
});

http.get(pingUrl, function (response)
{
    response.on("data", function (data)
    {
        console.log(data + ":8081");
    }).setEncoding("utf8");
});

server.listen(8081, function()
{
    console.log('listening');
});