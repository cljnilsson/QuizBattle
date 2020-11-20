import {createConnection} from "typeorm";

import AdminBro from "admin-bro";
import { Database, Resource } from "@admin-bro/typeorm";

AdminBro.registerAdapter({ Database, Resource });

/*import { validate } from 'class-validator'
Resource.validate = validate;*/

class DBSubscriber {
	private static _connection;
	private static initialized = false;

	private static subscribers : { (): void; } [] = []

	static set connection(val) {
		this._connection = val;
		this.initialized = true;

		for(let s of this.subscribers) {
			s();
		}
	}

	static get connection() : any{
		return this._connection;
	}

	static addSubscriber(callback : () => void) {
		this.subscribers.push(callback)
		if(this.initialized) {
			callback();
		}
 	}

	static async init() {
		this.connection = await createConnection();
		// here you can start to work with your entities
		console.log("Connected to db!");
		return this.connection;
	}
}

export default DBSubscriber;