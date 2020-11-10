import React 		from 'react';
import ReactDOM 	from 'react-dom';
import App 			from './js/Components/Main';
import "./css/main.css";
import "./public/bg.png";

let r = <App/>;
let element = document.getElementById('root');

ReactDOM.render(r, element);