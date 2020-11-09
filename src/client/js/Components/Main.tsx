import React, { useState } from 'react';
import Data from "./test";

import { useQuery} from 'react-query'

function Get(key : string, url : string) {
	return useQuery(key, () => {
		return fetch(url).then(res => res.json());
	});
}

function App() {
	//const [count, setCount] = useState(0);
	const { status, error, data } = Get("key", "/test");

	if (status === "loading") return <span>'Loading...'</span>

	if (error) return <span>'An error has occurred: ' + error.message</span>

	return (
		<div>
			<h1>{data.message}</h1>
		</div>
	);
	
}
   

export default App;
