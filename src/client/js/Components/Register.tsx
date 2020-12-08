import React, { useContext } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {Post} from "../Libs/Request";
import UserContext from "./Contexts/UserStateContext";

export default function Register() {
    let context = useContext(UserContext);
    let history = useHistory();

    function onSubmit(e) {
        Post("makeacc", "/register", {});
        // Todo
        context.setOnline(true);
        context.setName("Demo user"); // Change
        e.preventDefault();
        history.push("/");
    }

    return (<>
        <Link to="/">Back</Link>
        <div className="row justify-content-center align-items-center">
            <form className="col col-sm-6" onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password"/>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input"/>
                    <label className="form-check-label">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>)
}
