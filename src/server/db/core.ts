import "reflect-metadata";
import {createConnection, Db, QueryRunner} from "typeorm";

import DBSubscriber from './dbsubscriber';

type Class = { new(...args: any[]): any; };

class DB extends DBSubscriber{
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

DB.init();

export default DB;