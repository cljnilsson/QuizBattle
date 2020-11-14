import React, { forwardRef } from 'react';
import {Line} from 'react-chartjs-2';

const legend = {
	labels: {
		fontColor: "white"
	}
}

const options = {
	scales: {
        xAxes: [{
			ticks: {
                fontColor: "white"
            },
            gridLines: {
				color: "rgba(255, 255, 255, 0.5)",
				zeroLineColor: "white"
            }
		}],
		yAxes: [{
			ticks: {
                fontColor: "white"
            },
            gridLines: {
				color: "rgba(255, 255, 255, 0.5)",
				zeroLineColor: "white"
            }
        }]
    }
}

function LineChart(props) {
	const data = {
		labels: props.labels,
		datasets: [{
				label: 'Correct Answer Per Question',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'white',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'white',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: props.data
		}]
	};
	

	return <Line data={data} legend={legend} options={options} />
}
   

export default LineChart;
