import React, { useState, useContext, useEffect } from 'react';
import Data from "./test";
import {Get, Post} from "../Libs/Request";

import QuizBody from './QuizBody';


function Quiz() {
	let {quiz, id} = useContext(Data);
	const [started, setStarted] = useState(false);
	const [finished, setFinished] = useState(false);
	const [question, setQuestion] = useState(0);
	let highscores;
	
	if(!quiz) {
		const queries = () => {
			const res1 =  Get("gethighscores", "/gethighscores/" + id);
			const res2 = Get("specificquiz", "/specificquiz/" + id);
			return [res1, res2];
		}
		let qs = queries();

		for(let d of qs) {
			if (d.status === "loading") return <span>'Loading...'</span>

			if (d.error) return <span>'An error has occurred: ' + error.message</span>
		}

		let q = qs[1].data;
		let h = qs[0].data;
		quiz = q;
		highscores = h;

	} else if(!highscores) {
		let { status, error, data } = Get("gethighscores", "/gethighscores/" + id);
		if (status === "loading") return <span>'Loading...'</span>

		if (error) return <span>'An error has occurred: ' + error.message</span>

		highscores = data;
	}
	

	let qCount = quiz.questions.length;

	let count = started ? (question + 1) +"/" + qCount : "";
	return (
		<>
			<div className="row">
				<div className="col">
					<h1>{quiz.name}</h1>
				</div>
				<div className="col text-right">
					<h1>{count}</h1>
				</div>
			</div>
			<h3 className="text-center">{quiz.description}</h3>
			<hr></hr>
			<div className="row">
				<div className="col text-right">
					<small>{highscores.length} completions</small>
				</div>
			</div>
			<div className="text-center row">
				<div className="col">
					<QuizBody id={id}
						quiz={quiz}
						qCount={qCount}
						question={question}
						setQuestion={setQuestion}
						finished={finished}
						setFinished={setFinished}
						started={started}
						setStarted={setStarted}
						highscores={highscores}
					/>
				</div>
			</div>
		</>
	);
}
   

export default Quiz;
