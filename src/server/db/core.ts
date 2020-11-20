import "reflect-metadata";
import {createConnection, Db, QueryRunner} from "typeorm";
import bcrypt from "bcrypt";
import DBSubscriber from "./dbsubscriber";
import User from "./models/User";

type Class = { new(...args: any[]): any; };

class DB extends DBSubscriber{
	// Dedicated function since encryption is needed unlike all other creates.
	static async createUser(o) {
		let q = new User();

		let salt = await bcrypt.genSalt(10);
		let pass = await bcrypt.hash("admin", salt)

		o.pass = pass;

		for(const [key, value] of Object.entries(o)) {
			q[key] = value;
		}
		
		await this.save(q);
		return q;
	}

	static async create(c : Class, o : Object) {
		let q = new c();
		for(const [key, value] of Object.entries(o)) {
			q[key] = value;
		}
		await this.save(q);
		return q;
	}

	static async get(c: Class) {
		let repo = this.connection.getRepository(c);
		let all = await repo.find({cache: true});
		return all;
	}

	static async getWhere(c: Class, filter: Object) {
		const repository = this.connection.getRepository(c);
		let all = await repository.find({where: filter, cache: true});
		return all;
	}

	static async getFirstWhere(c: Class, filter: Object) {
		const repository = this.connection.getRepository(c);
		let all = await repository.findOne({where: filter, cache: true});
		return all;
	}

	static async save(c) {
		return await this.connection.manager.save(c);
	}
}

export default DB;