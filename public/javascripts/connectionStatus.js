var socket = io();
socket.on('connect', function()
{
	changeStatus('Connected', 'connect');
	queryData();
});
socket.on('connect_error', function()
{
	changeStatus('Disconnected.', 'connect_error');
});
socket.on('reconnect_attempt', function()
{
	changeStatus('Reconnecting...', 'reconnect_attempt');
});
function changeStatus(text, style)
{
	$('#conntext').text(text).removeClass().addClass(style);
	$('#connbull').removeClass().addClass(style);
}
