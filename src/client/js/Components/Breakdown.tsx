import React, { useState, useEffect } from 'react';

import {Post} from "../Libs/Request";

function Breakdown(props) {
	let [score, setScore] = useState(-1);
	let [scoreDetails, setScoreDetails] = useState("");
	let [loading, setLoading] = useState(true);

	function visualizeScore() {
		let arr = [];

		for(let i = 0; i < scoreDetails.length; i++) {
			arr.push(<p>Question {i + 1}: {scoreDetails[i] === "1" ? "Correct" : "Wrong"}</p>)
		}

		return arr;
	}

	useEffect(() => {
		Post("sendHighscore", "/submithighscore", {author: "WhoKnows", answers: props.answers, quiz: props.id}).then((d) => {
			console.log(d);
			setScoreDetails(d.scoredetails);
			setScore(d.score);
		});
	}, []);
	if(score > -1) {
		return (<>
		<h3>{score}/{props.qCount}</h3>
		{visualizeScore()}
		</>)
	} else {
		return <p>Waiting for score..</p>;
	}
}

export default Breakdown;