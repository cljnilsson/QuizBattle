import DB from "./db/core";
import  AdminBro from "admin-bro";
import AdminBroExpress from "@admin-bro/express";

/*import Quiz from "./db/models/quiz";
import Question from "./db/models/question";
import Option from "./db/models/option";
import Highscore from "./db/models/highscore";

Quiz.useConnection(DB.connection);
Question.useConnection(DB.connection);
Option.useConnection(DB.connection);
Option.useConnection(DB.connection);*/

const adminBro = new AdminBro({
	resources: [
		/*{ resource: Quiz },
		{ resource: Question },
		{ resource: Option },
		{ resource: Highscore },*/
	],
	rootPath: "/admin",
});

const router = AdminBroExpress.buildRouter(adminBro);

export {adminBro, router}