var express = require('express');
var app = express();
var StatsD = require('hot-shots');
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);
//var serialport = require('serialport');
var qs = require('qs');
var request = require('request');
var merge = require('merge');

/*
var PORT_NAME = '/dev/ttyACM0';
if(process.argv.length > 2)
    PORT_NAME = process.argv[2];

var sp = serialport.SerialPort;
var ardu = new sp(PORT_NAME, 
{
    baudRate:9600, 
    parser:serialport.parsers.readline("\r\n")
});
var client = new StatsD(
{
    "telegraf": "true"
});
client.socket.on('error', function(error)
{
    console.error("Error in socket: ", error);
});
*/

var mqtt    = require('mqtt');
var cl  = mqtt.connect('mqtt://localhost:1883');
var ledColor = '#00000000';

cl.on('connect', function ()
{
	console.log('cl conn');
	cl.subscribe('rcr/rcr/desk/#');
});

cl.on('message', function (topic, message)
{
	//console.log(message.toString());
	//console.log(topic);
	//console.log(ledColor);
	if(topic == 'rcr/rcr/desk/rgbled/status')
	{
		ledColor = message.toString();
		//console.log(ledColor);
	}
	io.sockets.emit(topic, message.toString());
	//cl.end();
});


io.on('connection', function (socket)
{
	//console.log('io');
	io.sockets.emit('rcr/rcr/desk/rgbled/status', ledColor);
	socket.on('button', function (data)
	{
		cl.publish('rcr/rcr/desk/rgbled/set', data, { qos: 1, retain: true });
	});
});






app.use(express.static('public'));
app.use('/static', express.static('public'));



var queryParams =
{
	u: 'public',
	p: 'public',
	db: 'mydb',
	epoch: 'ms'
};


app.get('/query', function(req, res)
{
	queryParams = merge(queryParams, req.query);
	request(
	{
		method:'GET',
		uri: 'http://localhost:8086/query?',
		qs: queryParams,
		json: 'true'
	}, 
	function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			res.json(body);
		}
	});
});

app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/index.html');
});

/*
ardu.on('open', function() { console.log("open"); });

ardu.on('data', function(data)
{
    try
    {
        var jsonData = JSON.parse(data);
        io.sockets.emit('temp', [Date.now(), jsonData.temp]);
        io.sockets.emit('atm', [Date.now(), jsonData.atm]);
		
		//client.gauge('temp', jsonData.temp);
		//client.gauge('atm', jsonData.atm);
		
    }
	catch(e)
    {
        console.log('json error: ' + e);
    }
});
*/

var PING_URL = "http://ipecho.net/plain";
var OWN_URL = "http://racerzeroone.ddns.net/";
http.get(PING_URL, function (res)
{
    res.on("data", function (data)
    {
		console.log("================================================================================");
        console.log("    " + "ip:  " + data + ":8081");
		console.log("    " + "url: " + OWN_URL);
		console.log("================================================================================");
    }).setEncoding("utf8");
});


server.listen(8081, function()
{
    console.log('listening');
});
