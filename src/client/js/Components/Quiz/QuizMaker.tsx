import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import QuizContext from "../Contexts/QuizContext";
import Get, { Post } from "../../Libs/Request";

function QuizMaker(props) {
	let context = useContext(QuizContext);
	let [error, setError] = useState("");

	function addError(e, err: string) {
		setError(err);
		e.preventDefault()
	}

	function onSubmit(e) {
		if(context.name === "") {
			addError(e, "Name must not be empty!");
		} else if(context.author === "") {
			addError(e, "Author must not be empty!");
		} else if(context.description === "") {
			addError(e, "Description must not be empty!");
		} else if(context.questions.length === 0) {
			addError(e, "Must have at least 1 question!");
		} else {
			let enoughOptions = true;
			let oneIsCorrect  = false;

			for(let q of context.questions) {
				if(q.options.length < 2) {
					enoughOptions = false;
					break;
				}
				for(let o of q.options) {
					if(o.correct === true) {
						oneIsCorrect = true;
					}
				}
			}

			if(!enoughOptions) {
				addError(e, "All questions must have at least  2 options");
			} else if(!oneIsCorrect) {
				addError(e, "All questions must have at least 1 option marked as correct");
			} else {
				Post("quizpost", "/createquiz", context)
			}
		}
	}

	function getQuestions() {
		let arr = [];
		let i = 1;

		for(let q of context.questions) {
			arr.push(<div className="row mt-1"><div className="col"><Link to={"/newquiz/" + i +  "/edit"} className="btn btn-outline-light">{q.text}</Link></div></div>);
			i++;
		}

		return arr;
	}

	function getError() {
		if(error != "") {
			return <div className="alert alert-danger" role="alert">
				<span>{error}</span>
			</div>
		} else {
			return <></>
		}
	}

	return <>
		<Link to={"/"}>Back</Link>
		{getError()}
		<div className="form-group">
			<div className="row">
				<div className="col">
					<input className="form-control" placeholder="My Quiz Title Here" onChange={(event) => context.setName(event.target.value)} defaultValue={context.name} />
				</div>
				<div className="col">
					<input className="form-control" placeholder="Author"onChange={(event) => context.setAuthor(event.target.value)} defaultValue={context.author} />
				</div>
			</div>
			<div className="row mb-2">
				<div className="col">
					<input className="form-control mt-3" placeholder="Description" onChange={(event) => context.setDescription(event.target.value)} defaultValue={context.description}/>
				</div>
			</div>
			{getQuestions()}
			<div className="row mt-3 mb-3">
				<div className="col">
					<Link to={"/newquiz/newquestion"} className="btn btn-outline-light">+</Link>
				</div>
			</div>
			<Link to="/" className="btn btn-outline-light" onClick={onSubmit}>Create Quiz</Link>
		</div>
	</>;
}
   

export default QuizMaker;
