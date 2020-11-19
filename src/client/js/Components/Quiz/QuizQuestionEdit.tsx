import React, { useState, useContext } from "react";
import classnames from "classnames";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import QuizContext from "../QuizContext";

function QuizQuestionEdit(props) {
	let context = useContext(QuizContext);

	function getOptions() {
		let arr = [];
		let q = context.questions[props.id - 1].options;

		for(let o of q) {
			arr.push(
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<button className="btn btn-outline-light" type="button">{o.text}</button>
					</div>
					<div className="input-group-append">
						<div className="input-group-text">
							<input type="checkbox" defaultChecked={o.correct} />
						</div>
					</div>
				</div>
			)
		}

		return arr;
	}

	return <>
		<h3 className="text-center">Demo question here??</h3>
		<Link to={"/newquiz"}>Back</Link>
		{getOptions()}
		<br></br>
		<Link className="btn btn-outline-light" to="/newquiz/1/edit/newoption">+</Link>
	</>;
}
   

export default QuizQuestionEdit;
