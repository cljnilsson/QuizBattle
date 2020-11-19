import React, {useContext, useRef } from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import QuizContext from "../QuizContext"

function QuizOptionMaker(props) {
	let context = useContext(QuizContext);

	function onConfirm() {
		console.log("THE OPTION SHOULD BE CREATED!!!!!!!")
		let current = [...context.questions];
		let parent = current[props.id - 1];
		parent.options.push({text: textfield.current?.value, correct: checkbox.current.checked})

		context.setQuestions(current);
	}

	let textfield = useRef(null)
	let checkbox  = useRef(null);

	return <>
		<Link to={"/newquiz/" + props.id + "/edit"}>Back</Link>
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<input type="text" ref={textfield} className="form-control"></input>
			</div>
			<div className="input-group-append">
				<div className="input-group-text">
					<input type="checkbox" ref={checkbox} defaultChecked={false} />
				</div>
			</div>
		</div>
		<Link to={"/newquiz/" + props.id + "/edit"} className="btn btn-outline-light" onClick={onConfirm}>Add Option</Link>
	</>;
}

export default QuizOptionMaker;
