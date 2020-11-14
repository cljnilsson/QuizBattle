import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Get from "../Libs/Request";

function Index() {
	function QuizList() {
		const list = [];

		for(let q of data) {
			list.push(
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">{q.name}</h5>
						<p className="card-text">{q.description}</p>
						<Link to={"/quiz/" + q.id} className="btn btn-primary">Take Quiz</Link>
					</div>
				</div>
			);
		}

		return list;	
	}

	const { status, error, data } = Get("allquiz", "/allquiz");

	if (status === "loading") return <span>'Loading...'</span>

	if (error) return <span>'An error has occurred: ' + error.message</span>

	return <>{QuizList()}</>;
}
   

export default Index;
