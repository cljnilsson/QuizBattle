import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Data 				from "./Contexts/IndexContext";
import Index 				from "./index";
import { AnimatedSwitch } from "react-router-transition";

import UserStateContext		from "./Contexts/UserStateContext";
import Memes 				from "./memes";
import Videos 				from "./videos";
import FAQ					from "./faq";

function App() {
	let [user, setUser] 				= useState("");
	let [online, setOnline]				= useState(false);

	let userState = {
		name : user,
		setName: (n: string) => setUser(n),
		online : online,
		setOnline: (b : boolean) => setOnline(b)
	};

	const AllQuiz = () => <UserStateContext.Provider value={userState}><Data.Provider value={{allQuiz, setAllQuiz}}><Index/></Data.Provider></UserStateContext.Provider>

	const [allQuiz, setAllQuiz] = useState([]);
	const memes = () => <Memes/>

	return (
		<div className="container">
			<Router>
				<div className="text-center border-bottom mb-3">
					<Link to="/"><img src="/ARC.png"/></Link>
				</div>
				<div className="row mb-3">
					<div className="col text-center">
						<Link to="/FAQ">FAQ</Link>
						<span> | </span>
						<Link to="/videos">Killshots/Killvids</Link>
						<span> | </span>
						<Link to="/memes">Memes</Link>
					</div>
				</div>
				<AnimatedSwitch
						atEnter={{ offset: -500 }}
						atLeave={{ offset: -500 }}
						atActive={{ offset: 0 }}
						mapStyles={(styles) => ({
						  transform: `translateX(${styles.offset}%)`,
						})}
						className="switch-wrapper"
				>
					<Route exact path="/" render={AllQuiz} />
					<Route exact path="/memes" render={memes} />
					<Route exact path="/FAQ" render={FAQ} />
					<Route exact path="/videos" render={Videos} />
				</AnimatedSwitch>
			</Router>
		</div>
	);
}
   

export default App;
