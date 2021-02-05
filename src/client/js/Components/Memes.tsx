import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Memes() {
	let memes = ["raid.png", "raiding.png", "unfinished.jpg"];

	let htmlMemes = memes.map((c) => <div className="col text-center"><img className="meme" src={"/" + c} /></div>);

	const m = Math.floor(htmlMemes.length / 2);
	const [left, right] = [htmlMemes.slice(0,m), htmlMemes.slice(m, htmlMemes.length)];

	return (<div className="row scroll">
				<div className="col">
					{left}
				</div>
				<div className="col">
					{right}
				</div>
			</div>)
}
   

export default Memes;
