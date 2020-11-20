import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function Register() {

    function onSubmit(e) {
        // Todo
        e.preventDefault();
    }

    return (<>
        <Link to="/">Back</Link>
        <div className="row justify-content-center align-items-center">
            <form className="col col-sm-6">
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
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
