import React from 'react';

import Chart from 'react-apexcharts';

export const BarChart = ({labelsArray, amountsArray}) => {
  const state = {
    series: [{
      data: amountsArray
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        width: '100%'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            enabled: false,
            position: 'bottom'
          }
        }
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: labelsArray,
        crosshairs: {
          show: false,
      }},
    }
  };

  return <div id="chart" style={{direction: 'rtl'}}>
        <Chart options={state.options}
                        series={state.series} type="bar" height={350}/>
      </div>

  }

