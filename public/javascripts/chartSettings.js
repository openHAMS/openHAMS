var chartSettings =
{
	chart:
	{
		defaultSeriesType: 'spline',
		renderTo: 'container',
		style:
		{
			fontFamily: 'Roboto',
			fontWeight: 400
		}
	},
	navigator : { enabled: false },
	rangeSelector:
	{
		allButtonsEnabled: true,
		buttons: 
		[
			{
				type: 'minute',
				count: 1,
				text: '1m'
			},
			{
				type: 'minute',
				count: 60,
				text: '1h'
			},
			{
				type: 'minute',
				count: 360,
				text: '6h'
			},
			{
				type: 'minute',
				count: 720,
				text: '12h'
			},
			{
				type: 'day',
				count: 1,
				text: '24h'
			},
			{
				type: 'week',
				count: 1,
				text: 'week'
			},
			{
				type: 'all',
				text: 'All'
			}
		],
		selected: 2
	},
	plotOptions: { series: { gapSize: 4 } },	
	scrollbar: { enabled: true },
	xAxis: { ordinal: false },
	yAxis:
	[
		{
			allowDecimals: false,
			labels:
			{
				align: 'left',
				format: '{value:.1f}hPa',
				style: { color: Highcharts.getOptions().colors[1] },
				x: 0
			},
			minRange: 2,
			title:
			{
				text: 'Pressure',
				style: { color: Highcharts.getOptions().colors[1] }
			},
			opposite: true
		}, 
		{
			labels:
			{
				align: 'right',
				format: '{value:.1f}°C',
				style: { color: Highcharts.getOptions().colors[0] }
			},
			minRange: 2,
			title:
			{
				text: 'Temperature',
				style: { color: Highcharts.getOptions().colors[0] }
			},
			opposite: false
		}
	]
};