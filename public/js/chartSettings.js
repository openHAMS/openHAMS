function generateChartSettings() {
    var settings = {
        chart: {
            defaultSeriesType: 'spline',
            renderTo: 'container',
            style: {
                fontFamily: 'Roboto',
                fontWeight: 400
            }
        },
        navigator: {
            enabled: false
        },
        rangeSelector: {
            allButtonsEnabled: true,
            buttons: [{
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
                    count: 180,
                    text: '3h'
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
                }
            ],
            selected: 2
        },
        plotOptions: {
            series: {
                gapSize: 4
            }
        },
        scrollbar: {
            enabled: true
        },
        xAxis: {
            events: {},
            ordinal: false
        },
        tooltip: {
            valueDecimals: 2
        },
        yAxis: [{
                allowDecimals: false,
                labels: {
                    align: 'right',
                    format: '{value:.1f}hPa',
                    reserveSpace: false,
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    },
                    x: 0
                },
                minRange: 2,
                title: {
                    text: 'Pressure',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            },
            {
                labels: {
                    align: 'left',
                    format: '{value:.1f}°C',
                    reserveSpace: false,
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    },
                    x: 0
                },
                minRange: 2,
                title: {
                    text: 'Temperature',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: false
            }
        ]
    };

    return settings;
}
