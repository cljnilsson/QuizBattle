import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import QuizContext from "../QuizContext";
import Get, { Post } from "../../Libs/Request";

function QuizMaker(props) {
	let context = useContext(QuizContext);
	console.log(context)
	function getQuestions() {
		let arr = [];
		let i = 1;

		for(let q of context.questions) {
			arr.push(<div className="row mt-1"><div className="col"><Link to={"/newquiz/" + i +  "/edit"} className="btn btn-outline-light">{q.text}</Link></div></div>);
			i++;
		}

		return arr;
	}

	return <>
		<Link to={"/"}>Back</Link>
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
			<div className="row mt-3">
				<div className="col">
					<Link to={"/newquiz/newquestion"} className="btn btn-outline-light">+</Link>
				</div>
			</div>
			<button className="btn btn-outline-light" onClick={() => Post("quizpost", "/createquiz", context)}>Create Quiz</button>
		</div>
	</>;
}
   

export default QuizMaker;
