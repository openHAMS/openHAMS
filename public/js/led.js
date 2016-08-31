function val2hex(val)
{
	var i = parseInt(val, 10);
	return i.toString(16);
}
function rgba(color, brightness)
{
	return '#' + color + brightness;
}
function rgba2color(rgba)
{
	return rgba.substring(1, 7);
}
function rgba2brightness(rgba)
{
	return rgba.substring(7, 9);
}

var RGBLed = function(name)
{
	function getLedBrightness()
	{
		var b = '';
		b = val2hex(parseInt($('#' + name + 'Brightness').prop('value'), 10));
		return b;
	}
	function getLedColor()
	{
		var c = '';
		c = $('input[name=' + name + 'Radios]:checked', '#' + name + 'Form').val();
		return c;
	}
	function getLedStatus()
	{
		var s;
		s = $('#' + name + 'Switch').prop('checked');
		return s;
	}
	
	
	function setLedRadios(sw)
	{		
		$('input[name=' + name + 'Radios]', '#' + name + 'Form').prop('disabled', !sw);
	}
	
	
	this.changeLedIndicator = function(rgba)
	{
		var bg = '#' + rgba2color(rgba);
		var op = parseInt(rgba2brightness(rgba), 16) / 255;
		$('#' + name + 'Status').css({ 'background': bg, 'opacity': op});
	}
	function changeLed(color, status)
	{
		if(status)
		{
			socket.emit('button', color);
		}
		else
		{
			socket.emit('button', rgba(rgba2color(color), '00'));
		}
	}
	
	
	this.setUI = function(c)
	{
		c = c.substring(0, 9);
		led.changeLedIndicator(c);
		$('input[name=' + name + 'Radios][value="' + rgba2color(c) + '"').prop('checked', true);
		if(rgba2brightness(c) != '00')
		{
			$('#' + name + 'Switch').prop('checked', true);
			setLedRadios(true);
		}
		else
		{
			$('#' + name + 'Switch').prop('checked', false);
			setLedRadios(false);
		}
		//$('#ledBrightness').prop('value', parseInt(c.substring(7, 9), 16));
	}
	
	this.onLedInput = function(sw)
	{
		changeLed(rgba(getLedColor(), getLedBrightness()), getLedStatus());
		if(sw) setLedRadios(getLedStatus());
	}
};
