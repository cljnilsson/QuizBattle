import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Data 				from "./Contexts/IndexContext";
import Index 				from "./index";
import Register				from "./Register";

import Quiz 				from "./Quiz/Quiz";
import QuizCreator 			from "./Quiz/QuizMaker";
import QuizQuestionEdit 	from "./Quiz/QuizQuestionEdit";
import QuizQuestionMaker 	from "./Quiz/QuizQuestionMaker";
import QuizOptionMaker 		from "./Quiz/QuizOptionMaker";

import QuizContext			from "./Contexts/QuizContext";

function App() {
	let [questions, setQuestions] 		= useState([]);
	let [name, setName] 				= useState("");
	let [author, setAuthor] 			= useState("");
	let [description, setDescription] 	= useState("");

	let val = {
		name: name,
		setName: 		(n : string) => setName(n),
		description: 	description,
		setDescription: (d : string) => setDescription(d),
		author: 		author,
		setAuthor: 		(a : string) => setAuthor(a),
		created: 		new Date(),
		questions: 		questions,
		setQuestions: 	(q) 		 => setQuestions(q)
	};

	const AllQuiz 			= () 		=> <Data.Provider 		 value={{allQuiz, setAllQuiz}}><Index/></Data.Provider>
	const CreateQuiz 		= ({match}) => <QuizContext.Provider value={val}><QuizCreator 		id={match.params.id} /></QuizContext.Provider>
	const CreateQuestion 	= ({match}) => <QuizContext.Provider value={val}><QuizQuestionMaker id={match.params.id} /></QuizContext.Provider>
	const EditQuestion 		= ({match}) => <QuizContext.Provider value={val}><QuizQuestionEdit  id={match.params.id} /></QuizContext.Provider>
	const CreateOption		= ({match}) => <QuizContext.Provider value={val}><QuizOptionMaker 	id={match.params.id} /></QuizContext.Provider>

	function TakeQuiz({match}) {
		let selected;
		
		if(allQuiz.length > 0) {
			selected = allQuiz.filter( function(q){
				return q.id == match.params.id;
			})[0];
		}
		
		return <Data.Provider value={{quiz: selected, id: match.params.id}}><Quiz/></Data.Provider>
	}

	const [allQuiz, setAllQuiz] = useState([]);

	return (
		<div className="container">
			<Router>
				<div className="text-center">
					<Link to="/"><img src="/logo.png"/></Link>
				</div>
				<Route exact path="/" 							render={AllQuiz} />
				<Route exact path="/register"					render={Register} />
				<Route exact path="/quiz/:id" 					render={TakeQuiz} />
				<Route exact path="/newquiz" 					render={CreateQuiz} />
				<Route exact path="/newquiz/newquestion" 		render={CreateQuestion} />
				<Route exact path="/newquiz/:id/edit" 			render={EditQuestion} />
				<Route exact path="/newquiz/:id/edit/newoption" render={CreateOption} />
			</Router>
		</div>
	);
}
   

export default App;
