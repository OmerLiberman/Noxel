import React from 'react';

import Chart from 'react-apexcharts';

export const Donut = ({labelsArray, amountsArray}) => {

  return <Chart
      options={{
        labels: labelsArray,
        legend: {
          position: 'top'
        }
      }}
      series={amountsArray}
      type="donut"
      height="350"
  />;

};