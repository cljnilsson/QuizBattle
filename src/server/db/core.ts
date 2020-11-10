import "reflect-metadata";
import {createConnection, Db, QueryRunner} from "typeorm";
import Quiz from "./models/quiz";
import Question from "./models/question";
import Option from "./models/option"

type Class = { new(...args: any[]): any; };

class DB {
	private static connection

	static async init() {
		this.connection = await createConnection();
		// here you can start to work with your entities
		console.log("Connected to db!")
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
		console.table(all)
		return all;
	}

	static async save(c) {
		return await this.connection.manager.save(c);
	}
}
(async () => {
	let t = await DB.init();
	let all = await DB.get(Quiz);
	if(all.length === 0) {
		let quiz = await DB.create(Quiz, {author: "demoAdmin", created: new Date(), name: "Demo", description: "This is a demo quiz about random stuff. Very serious."});
		let question = await DB.create(Question, {text: "What is 1 + 1", quiz: quiz});
		DB.create(Option, {text: "4", question: question});
		DB.create(Option, {text: "3", question: question});
		DB.create(Option, {text: "1", question: question});
		DB.create(Option, {text: "2", question: question, correct: true});
	}
})();

export default DB;
export {DB};