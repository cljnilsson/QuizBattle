import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Videos() {
	let bosses = ["Shriekwing", "Huntsman Altimor", "Hungering Destroyer", "Artificer Xy'mox", "Lady Inerva Darkvein", "Sun King's Salvation"];
	let links = ["https://www.youtube.com/watch?v=kRLhT1NMuUA", "https://www.youtube.com/watch?v=Bw-xb0kQ9DE", "https://www.youtube.com/watch?v=YKV01WL6cKM", "https://www.youtube.com/watch?v=CQvVEqFSo5E", "https://www.youtube.com/watch?v=lo6ypLHfyVk"];

	function rows() {
		let arr = [];

		for(let i = 0; i < bosses.length; i++) {
			arr.push(<tr><td>{bosses[i]}</td><td>{links[i]}</td></tr>);
		}

		return arr;
	}
	
	return (<div className="row">
				<div className="col">
					<table className="table">
						<thead>
							<tr>
							<th scope="col">Boss</th>
							<th scope="col">Link</th>
							</tr>
						</thead>
						<tbody>
							{rows()}
						</tbody>
					</table>
				</div>
			</div>)
}
   

export default Videos;
