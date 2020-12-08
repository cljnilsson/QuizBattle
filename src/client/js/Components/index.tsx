import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Loading from "./svgs/Loading";
import Get from "../Libs/Request";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Data from "./Contexts/IndexContext";
import UserContext from "./Contexts/UserStateContext";

import Timer from "./Timer";

function Index() {
	let {allQuiz, setAllQuiz} = useContext(Data);
	let {online, name} = useContext(UserContext);

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

	function loginView() {
		if(!online) {
			return <div className="col text-right">
				<Link to="/register" className="btn btn-outline-light">Register</Link>
				<Link to="/login" className="btn btn-outline-light">Login</Link>
			</div>
		} else {
			return <div className="col text-right">
				<small>You are logged in as {name}</small>
			</div>
		}
	}

	const { status, error, data } = Get("allquiz", "/allquiz");

	if (status === "loading") return <Loading />

	if (error) return <span>An error has occurred: {error.message}</span>

	setAllQuiz(data);

	return <>
		<div className="row mb-3">
			<div className="col">
				<Link to="/newquiz" className="btn btn-outline-light">Create Quiz</Link>
			</div>
			{loginView()}
		</div>
		<Zoom duration={250}>
			<Fade duration={2000}>
				<div className="row">
					<div className="col card-columns">
						{QuizList()}
					</div>
				</div>
			</Fade>
        </Zoom>
	</>;
}
   

export default Index;
