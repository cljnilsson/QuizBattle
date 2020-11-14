import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
	labels: [
		'0-25%',
		'25-50%',
		'50-75%',
		"75-99%",
		"Perfect Score",
	],
	datasets: [{
		data: [300, 50, 100, 30, 25],
		backgroundColor: [
		"#FF0000",
		'#FF3953',
		'#FF4C0F',
		'#FFFF00',
		"#00C400"
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

const options = {
	labels: {
		fontColor: "white"
	}
}

function DoughnutChart(props) {

	const data = {
		labels: [
			'0-25%',
			'25-50%',
			'50-75%',
			"75-99%",
			"Perfect Score",
		],
		datasets: [{
			data: props.data,
			backgroundColor: [
			"#FF0000",
			'#FF3953',
			'#FF4C0F',
			'#FFFF00',
			"#00C400"
			],
			hoverBackgroundColor: [
			'#FF6384',
			'#36A2EB',
			'#FFCE56'
			]
		}]
	};
	
	return <Doughnut data={data} legend={options} />
}
   

export default DoughnutChart;
