import DB from "./core";
import Quiz from "./models/quiz";
import Question from "./models/question";
import Option from "./models/option"

DB.addSubscriber(test);

async function test () {
	let all = await DB.get(Quiz);
	if(all.length === 0) {
		let quiz = await DB.create(Quiz, {author: "demoAdmin", created: new Date(), name: "Demo", description: "This is a demo quiz about random stuff. Very serious."});
		let question = await DB.create(Question, {text: "What is 1 + 1", quiz: quiz});
		DB.create(Option, {text: "4", question: question});
		DB.create(Option, {text: "3", question: question});
		DB.create(Option, {text: "1", question: question});
		DB.create(Option, {text: "2", question: question, correct: true});

		question = await DB.create(Question, {text: "Who writes the worst code?", quiz: quiz});
		DB.create(Option, {text: "Victor", question: question});
		DB.create(Option, {text: "Mellberg", question: question});
		DB.create(Option, {text: "Philip", question: question, correct: true});
		DB.create(Option, {text: "Lukas", question: question});

		question = await DB.create(Question, {text: "Which nordic country is  the best?", quiz: quiz});
		DB.create(Option, {text: "Sweden", question: question, correct: true});
		DB.create(Option, {text: "Norway", question: question, correct: true});
		DB.create(Option, {text: "Finland", question: question, correct: true});
		DB.create(Option, {text: "Denmark", question: question, correct: true});
		DB.create(Option, {text: "Iceland", question: question, correct: true});

		question = await DB.create(Question, {text: "Which programming language is the worst", quiz: quiz});
		DB.create(Option, {text: "Php", question: question, correct: true});
		DB.create(Option, {text: "Java", question: question});
		DB.create(Option, {text: "C#", question: question});
		DB.create(Option, {text: "Python", question: question});
		DB.create(Option, {text: "C++", question: question});
		DB.create(Option, {text: "Lua", question: question});

		question = await DB.create(Question, {text: "!false", quiz: quiz});
		DB.create(Option, {text: "False", question: question});
		DB.create(Option, {text: "True", question: question, correct: true});
	}
}