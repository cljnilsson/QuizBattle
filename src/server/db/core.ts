import "reflect-metadata";
import {createConnection} from "typeorm";
//import Quiz from "./models/quiz";

createConnection().then(connection => {
	// here you can start to work with your entities
	console.log("Connected to db!")
}).catch(error => console.log(error));