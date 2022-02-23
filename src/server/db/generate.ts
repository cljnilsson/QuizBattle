import DB from "./core";
import User from "./models/account";

DB.addSubscriber(test);

async function test () {
	let users = await DB.get(User);

	if(users.length === 0) {
		DB.createUser({name: "admin", pass: "admin"}); // User
	}
}