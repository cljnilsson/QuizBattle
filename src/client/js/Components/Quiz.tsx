import React, { useState, useContext } from 'react';
import Data from "./test";

function Quiz() {
	function getOptions() {
		let arr = [];

		for(let o of q.questions[0].options) {
			arr.push(<p>{o.text}</p>)
		}

		return arr;
	}

	const q = useContext(Data);
	//const [count, setCount] = useState(0);
	//const {questions, } = this.context;
	console.log(q)
	let qCount = q.questions.length;


	return (
		<>
			<h3>{q.name + "1/" + qCount}</h3>
			<h4>{q.description}</h4>
			<hr></hr>
			<h5>{q.questions[0].text}</h5>
			{getOptions()}
		</>
	);
}
   

export default Quiz;
