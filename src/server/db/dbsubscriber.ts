import {createConnection} from "typeorm";

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
		console.log("Connected to db!")
	}
}

export default DBSubscriber;