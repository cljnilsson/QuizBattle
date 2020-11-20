import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import QuizContext from "../Contexts/QuizContext";

function QuizMaker(props) {
	let context = useContext(QuizContext);
	let [text, setText] = useState("");
	
	function onConfirm() {
		let current = [...context.questions];
		current.push({text: text, options: []});
		context.setQuestions(current);
	}

	// Update confirm link to take to the created question later
	return <>
		<Link to={"/newquiz"}>Back</Link>
		<input type="text" className="form-control" placeholder="Question" onChange={(event) => setText(event.target.value)} defaultValue={text}/>
		<Link to="/newquiz" className="btn btn-outline-light mt-3" onClick={onConfirm}>Confirm</Link>
		</>;
}
   

export default QuizMaker;
