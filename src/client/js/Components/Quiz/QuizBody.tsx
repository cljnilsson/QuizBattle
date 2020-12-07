import React, { useState } from "react";

import classNames from "classnames";

import {Get, Post} from "../../Libs/Request";

import Breakdown from "./Breakdown";

import Doughnut from "../Charts/doughnut";
import Line from "../Charts/line";
import Timer from "../Timer";

function split(arr, chunk) {
	let toChunk = arr.length / chunk;
	let temparray = [];

	for(let i = 0; i < toChunk; i++) {
		let startIndex = chunk * i;
		let row = arr.slice(startIndex, startIndex+chunk)
		temparray.push(row);
	}

	return temparray;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

function QuizBody(props) {
	function onOptionClick(event) {
		let o = event.target.dataset.option;
		let copy = {...active};

		if(copy[o] === undefined) {
			copy[o] = false;
		}

		copy[o] = !copy[o]
		setActive(copy);
	}

	function getOptions() {
		let arr = [];

		for(let o of props.quiz.questions[props.question].options) {
			let a = active[o.id];
			let names = classNames("btn btn-outline-light", {active: a})
			arr.push(<div className="col"><button className={names} data-option={o.id} onClick={onOptionClick}>{o.text}</button></div>)
		}

		let format = split(arr, 2);
		let final = [];

		for(let row of format) {
			final.push(<div className="row pb-3">{row}</div>)
		}

		return final;
	}

	function onConfirmAnswer() {
		props.setQuestion(props.question + 1);
		setAnswers(a => [...a, active]);
		setActive([]);
		setSec(30);
	}

	let [active, setActive] 	= useState({});
	let [answers, setAnswers] 	= useState([]);
	let [sec, setSec] 			= useState(30);

	if(props.finished) {
		return <Breakdown qCount={props.qCount} id={props.id} answers={answers}/>
	} else if(props.started) {
		if(props.question >= props.qCount) {
			/* Will display breakdown next render, this wont be visible.
			This is questionable rather than just putting <Breadown></Breadown> here but I think it is easier to understand if it is put in a if block with .isFinished */
			props.setFinished(true)
			return <span></span>;
		}

		return (
			<>
				<h3>{props.quiz.questions[props.question].text}</h3>
				<Timer val={sec} setVal={setSec} onFinish={onConfirmAnswer}/>
				{getOptions()}
				<div className="row">
					<div className="col text-center">
						<button className="btn btn-lg btn-outline-light" onClick={onConfirmAnswer}>Confirm Answer</button>
					</div>
				</div>
			</>
		);
	} else {
		let l = [];
		let d : number[] = Array(props.qCount).fill(0);

		let doughnutData : number[] = Array(5).fill(0);

		for(let i = 1; i <= props.qCount; i++) {
			l.push(i);
		}

		for(let h of props.highscores) {
			let percent = h.score / props.qCount * 100;

			// Make a loop for this in the future?
			if(percent < 25) {
				doughnutData[0] += 1;
			} else if(percent < 50) {
				doughnutData[1] += 1;
			} else if(percent < 75) {
				doughnutData[2] += 1;
			} else if(percent < 100) {
				doughnutData[3] += 1;
			} else {
				doughnutData[4] += 1;
			}

			for(let i = 0; i < h.scoredetails.length; i++) {
				d[i] += +h.scoredetails[i];
			}
		}

		return(
			<>
				<div className="row">
					<div className="col">
						<Line labels={l}  data={d} />
					</div>
					<div className="col">
						<Doughnut data={doughnutData} />
					</div>
				</div>
				<hr/>
				<button data-toggle="button" className="btn btn-lg btn-outline-light centerV" onClick={() => props.setStarted(true)}>Start Quiz</button>
			</>
		);
	}
}
   

export default QuizBody;
