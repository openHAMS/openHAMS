var app = require('express')();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var serialport = require('serialport');

var jsonContent;
var portName = process.argv[2];
var sp = serialport.SerialPort;
var ardu = new sp(portName, 
{
    baudRate:9600, 
    parser:serialport.parsers.readline("\r\n")
});


var url = "http://ipecho.net/plain";

function sensorWrite()


ardu.on('open', function() { console.log("open"); });

app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket)
{
    ardu.on('data', function(data)
    {
        jsonContent = JSON.parse(data);
        io.emit('temp', jsonContent.temp);
        io.emit('atm', jsonContent.atm / 100);
    });

});

http.get(url, function (response)
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