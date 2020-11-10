import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Data from "./test";
import Quiz from "./Quiz";

import { useQuery} from 'react-query'

function Get(key : string, url : string) {
	return useQuery(key, () => {
		return fetch(url).then(res => res.json());
	});
}

function App() {
	function Index() {
		return <>{QuizList(data)}</>;
	}

	function TakeQuiz({match}) {
		console.log("Id: " + match.params.id)
		let selected = data.filter( function(q){
			return q.id == match.params.id;
		})[0];
		console.log(selected)
		return <Data.Provider value={selected}><Quiz/></Data.Provider>
	}

	function QuizList(data) {

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

	//const [allQuiz, setAllQuiz] = useState(0);
	const { status, error, data } = Get("allquiz", "/allquiz");

	if (status === "loading") return <span>'Loading...'</span>

	if (error) return <span>'An error has occurred: ' + error.message</span>

	//setAllQuiz(data);

	return (
		<div className="container mt-5">
			<Router>
				<Route path="/" exact component={Index} />
        		<Route path="/quiz/:id" component={TakeQuiz} />
			</Router>
		</div>
	);
}
   

export default App;
