import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Loading from "./svgs/Loading";
import Get from "../Libs/Request";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import UserContext from "./Contexts/UserStateContext";

function Index() {
	let {online, name} = useContext(UserContext);
	let [selected, setSelected] = useState(-1);

	let classes = ["dh", "dk", "druid", "hunter", "mage", "monk", "paladin", "priest", "rogue", "shaman", "warlock", "warrior"];

	function select(e) {
		console.log(e.target.dataset.id);
		setSelected(e.target.dataset.id);
	}

	function images() {
		let addType = ".png";
		let all = [...classes];

		return all.map((v, i) => <img className={selected == i ? "class classSelected" : "class"} data-id={i} src={v + addType} onClick={select}></img>)
	}

	function form() {
		return 	(
		<div className="row mt-1 justify-content-center">
			<div className="col-8">
				<form>
					<div className="form-row">
						<div className="col">
							<input type="text" className="form-control" placeholder="First name" />
						</div>
						<div className="col">
							<input type="text" className="form-control" placeholder="Last name" />
						</div>
						<div className="col-md-2">
							<input type="text" className="form-control" placeholder="Age" />
						</div>
					</div>
					<div className="form-group mt-3">
						<label>General information</label>
						<textarea className="form-control" placeholder="(where you're from, languages spoken, how long you've played WoW. Anything you like, it's just nice to know a little about the 'real' you!)"></textarea>
					</div>
					<div className="form-row pt-3 border-top">
						<div className="col-4" />
						<div className="col-4">
							<input type="text" className="form-control" placeholder="Character name" />
						</div>
					</div>
					<div className="form-row mt-2 pb-3 border-bottom">
						<div className="col-2" />
						<div className="col-4">
							<input type="text" className="form-control" placeholder="Current Guild" />
						</div>
						<div className="col-4">
							<input type="text" className="form-control" placeholder="Previous Guild(s)" />
						</div>
					</div>
					<div className="form-group">
						<label>Reason(s) for leaving your current/previous guild</label>
						<textarea className="form-control" placeholder="If applicable"></textarea>
					</div>
					<div className="form-group">
						<label>Reason(s) for wanting to join ARC</label>
						<textarea className="form-control"></textarea>
					</div>
					<div className="form-row mt-2 pb-3">
						<div className="col-8">
							<div className="input-group">
								<div className="input-group-prepend">
									<div className="input-group-text">
									<input type="checkbox" />
									</div>
								</div>
								<input type="text" className="form-control" placeholder="Do you already know someone in ARC?" />
							</div>
						</div>
					</div>
					<div className="form-row mt-2 pb-3">
						<div className="col text-right">
							<button className="btn btn-outline-light" type="submit">Apply</button>
						</div>
					</div>
				</form>
			</div>
		</div>)
	}

	/*const { status, error, data } = Get("allquiz", "/allquiz");

	if (status === "loading") return <Loading />

	if (error) return <span>An error has occurred: {error.message}</span>*/


	return <div>
		<div className="row">
			<div className="col text-center">
				{images()}
			</div>
		</div>
		{form()}
	</div>;
}
   

export default Index;
