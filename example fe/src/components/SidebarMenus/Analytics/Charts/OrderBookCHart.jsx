import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import darkUnica from 'highcharts/themes/dark-unica'; // Import the dark theme

// Apply the dark theme
darkUnica(Highcharts);

const OrderBookChart = () => {
    const options = {
        chart: {
            type: 'area',
            // zoomType: 'xy'
        },
        xAxis: {
            minPadding: 0,
            maxPadding: 0,
            plotLines: [{
                color: '#888',
                value: 0.1523,
                width: 1,
                label: {
                    text: 'Actual price',
                    rotation: 90
                }
            }],
        },
        yAxis: [{
            lineWidth: 1,
            gridLineWidth: 1,
            title: null,
            tickWidth: 1,
            tickLength: 5,
            tickPosition: 'inside',
            labels: {
                align: 'left',
                x: 8
            }
        }, {
            opposite: true,
            linkedTo: 0,
            lineWidth: 1,
            gridLineWidth: 0,
            title: null,
            tickWidth: 1,
            tickLength: 5,
            tickPosition: 'inside',
            labels: {
                align: 'right',
                x: -8
            }
        }],
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillOpacity: 0.2,
                lineWidth: 1,
                step: 'center'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
            valueDecimals: 2
        },
        series: [{
            name: 'Bids',
            data: [
                [0.1524, 0.948665],
                [0.1539, 35.510715],
                // More data points...
            ],
            color: '#03a7a8'
        }, {
            name: 'Asks',
            data: [
                [0.1435, 242.521842],
                [0.1436, 206.498621],
                [0.1435, 242.521842],
                [0.1436, 206.498621],
                // More data points...
            ],
            color: '#fc5857'
        }]
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default OrderBookChart;
