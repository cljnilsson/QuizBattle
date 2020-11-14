import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Get from "../Libs/Request";

import Data from "./test";
import Quiz from "./Quiz";
import Index from "./index";

function App() {
	function AllQuiz() {
		return <Index/>
	}

	function TakeQuiz({match}) {
		let selected;
		
		if(data.length > 0) {
			selected = data.filter( function(q){
				return q.id == match.params.id;
			})[0];
		}
		
		return <Data.Provider value={{quiz: selected, id: match.params.id}}><Quiz/></Data.Provider>
	}

	const [data, setData] = useState([]);

	return (
		<div className="container mt-5">
			<Router>
				<Route exact path="/" component={AllQuiz} />
        		<Route exact path="/quiz/:id" component={TakeQuiz} />
			</Router>
		</div>
	);
}
   

export default App;
