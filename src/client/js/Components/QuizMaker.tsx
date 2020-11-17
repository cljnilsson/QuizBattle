import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Get from "../Libs/Request";

function QuizMaker() {
	function getQuestions() {
		let arr = [];

		for(let i = 0; i < 4; i++) {
			arr.push(<Link to={"/newquiz/" + i} className="btn btn-outline-light">Link</Link>);
		}

		return arr;
	}

	return <>
		<div className="form-group">
			<input placeholder="My Question Here" />
			<br></br>
			{getQuestions()}
		</div>
	</>;
}
   

export default QuizMaker;
