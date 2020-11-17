import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Get from "../Libs/Request";

function QuizMaker() {
	function getOptions() {
		let arr = [];

		for(let i = 0; i < 4; i++) {
			arr.push(
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<button className="btn btn-outline-light" type="button">This is an answer to the question</button>
					</div>
					<div className="input-group-append">
						<div className="input-group-text">
							<input type="checkbox"/>
						</div>
					</div>
				</div>
			)
		}

		return arr;
	}

	return <>
		{getOptions()}
	</>;
}
   

export default QuizMaker;
