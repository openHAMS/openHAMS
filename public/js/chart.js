var chart;
var q = { q: 'SELECT time,value FROM temp,atm' };

Highcharts.setOptions(
{
	global:
	{
		useUTC: false
	}
});

function queryData()
{
	$.get('query', q, function(influxData)
	{
		var seriesOptions = [];
		//convert Pa to hPa
		transformData(influxData, 0).map(function(obj)
		{
			obj[1] = obj[1] / 100;
			return obj;
		});
		seriesOptions[0] = 
		{
			color: Highcharts.getOptions().colors[1],
			name: 'Pressure',
			data: transformData(influxData, 0),
			yAxis: 0
		};
		seriesOptions[1] = 
		{
			color: Highcharts.getOptions().colors[0],
			name: 'Temperature',
			data: transformData(influxData, 1),
			yAxis: 1
		};
		chartSettings.series = seriesOptions;
		chart = new Highcharts.StockChart( chartSettings );
	});
}

function transformData(influxData, i)
{
	return influxData.results[0].series[i].values;
}
