import {createConnection} from "typeorm";

import AdminBro from 'admin-bro';
import { Database, Resource } from '@admin-bro/typeorm';
import Quiz from "./models/quiz";

AdminBro.registerAdapter({ Database, Resource });

/*import { validate } from 'class-validator'
Resource.validate = validate;*/

class DBSubscriber {
	private static _connection

	private static subscribers : { (): void; } [] = []

	static set connection(val) {
		this._connection = val;
		for(let s of this.subscribers) {
			s();
		}
	}

	static get connection() : any{
		return this._connection;
	}

	static addSubscriber(callback : () => void) {
		this.subscribers.push(callback)
	}

	static async init() {
		this.connection = await createConnection();
		// here you can start to work with your entities
		console.log("Connected to db!");
		return this.connection;
	}
}

export default DBSubscriber;