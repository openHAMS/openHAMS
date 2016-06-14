var app = require('express')();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
var serialport = require('serialport');

var clients = [];
var jsonContent;
var portName = process.argv[2];
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
    for(var i = 0; i < clients.length; i++)
    {
        clients[i].emit('temp', jsonData.temp);
        clients[i].emit('atm', jsonData.atm);
    }
});

io.on('connection', function(socket)
{
    clients.push(socket);
    socket.once('disconnect', function()
    {
        clients.splice(clients.indexOf(socket), 1);
    });
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