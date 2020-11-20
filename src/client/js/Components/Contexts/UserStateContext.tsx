import React, {createContext, Dispatch, useReducer} from "react";

let defaultFunction = () => {};

interface UserContextInterface {
	name : string,
	setName,
	online : boolean,
	setOnline
}

export default React.createContext<UserContextInterface>(null);