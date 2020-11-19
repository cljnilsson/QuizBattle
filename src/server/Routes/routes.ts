import DB from "../db/core";
import "../db/generate";

import Highscore from "../db/models/highscore";
import Question from "../db/models/question";
import Option from "../db/models/option";
import Quiz from "../db/models/quiz";

import QuizGrader from "../libs/QuizGrader";

import app from "../server";

app.get("/", (req, res) => {
	res.sendfile("./dist/public/index.html");
});

app.get("/allquiz", async (req, res) => {
	res.json(await DB.get(Quiz));
});

app.get("/specificquiz/:id", async (req, res) => {
	let quiz = await DB.getFirstWhere(Quiz, {id: req.params.id});
	res.json(quiz);
});

app.get("/gethighscores/:quizid", async (req, res) => {
	let highscores = await DB.getWhere(Highscore, {quiz: req.params.quizid});
	res.json(highscores);
});

app.get("*", (req, res) => {
	res.sendfile("./dist/public/index.html");
});

app.post("/submithighscore", async (req, res) => {
	let obj  = {author: req.body.author, quiz: req.body.quiz, score: 0, scoredetails: ""};
	let size = Object.keys(req.body.answers).length
	let quiz = await DB.getFirstWhere(Quiz, {id: req.body.quiz});

	let grade = new QuizGrader(quiz, req.body.answers);
	obj.score = grade.score;
	obj.scoredetails = grade.scoreDetails;

	await DB.create(Highscore, obj);
	res.json({...obj});
});

app.post("/createquiz", async (req, res) => {
	let {questions, ...quiz} = req.body;
	//console.log(questions)
	// Look into combining into fewer queries
	let parent = await DB.create(Quiz, quiz);
	for(let q of questions) {
		console.log(q)
		q.quiz = parent;
		let question = await DB.create(Question, q);
		for(let o of q.options) {
			o.question = question;
			DB.create(Option, o);
		}
	}

	res.json({message: "success"});
});