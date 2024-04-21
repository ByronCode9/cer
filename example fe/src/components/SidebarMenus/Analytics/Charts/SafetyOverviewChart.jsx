import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SafetyOverviewChart = (overview) => {
  console.log(overview, "-------")
  const [series] = useState([overview.overview]);
  const [options] = useState({
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#09090B",
          strokeWidth: '97%',
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: '22px'
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    fill: {
      // type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      },
    },
    labels: ['Safety Overview'],
    colors: ['#BC8312'] // Change the color of the chart line
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="radialBar" />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default SafetyOverviewChart;
