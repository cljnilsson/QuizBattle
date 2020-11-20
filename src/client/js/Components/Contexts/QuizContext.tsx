import React, {createContext, Dispatch, useReducer} from "react";

let defaultFunction = () => {};

interface AppContextInterface {
	name,
	setName,
	description,
	setDescription,
	author,
	setAuthor,
	created,
	questions,
	setQuestions
}

export default React.createContext<AppContextInterface>(null);