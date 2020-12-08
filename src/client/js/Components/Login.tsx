import React, { useContext, useState } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {Post} from "../Libs/Request";
import UserContext from "./Contexts/UserStateContext"; // for logging in later

export default function Login() {
    let history = useHistory();
    let context = useContext(UserContext);
    let [error, setError] = useState("");

    let nameRef = React.createRef<HTMLInputElement>();
    let passRef = React.createRef<HTMLInputElement>();

    async function onSubmit(e) {
        e.preventDefault();

        let {valid, err} = await Post("login", "/login", {username: nameRef.current.value, password: passRef.current.value});
        console.log(valid, err);
        if(valid) {
            context.setOnline(true);
            context.setName(nameRef.current.value); // change later
            history.push("/");
        } else {
            setError(err);
        }
    }

    function getError() {
		if(error != "") {
			return <div className="alert alert-danger" role="alert">
				<span>{error}</span>
			</div>
		} else {
			return <></>
		}
	}

    return (
        <>
            <Link to="/">Back</Link>
            {getError()}
            <div className="row justify-content-center align-items-center">
                <form className="col col-sm-6" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" ref={nameRef} className="form-control" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" ref={passRef} className="form-control" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    )
}
