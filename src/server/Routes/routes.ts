import app from "../server.js";
import DB from "../db/core";
import "../db/generate";

import Highscore from "../db/models/highscore";
import Question from "../db/models/question";
import Quiz from "../db/models/quiz";

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
	console.log("requested highscores!");
	let highscores = await DB.getWhere(Highscore, {quiz: req.params.quizid});
	console.log(highscores);
	res.json(highscores);
});

app.get("*", (req, res) => {
	res.sendfile("./dist/public/index.html");
});


class QuizGrader {
	private quiz : Quiz;
	private answers : object;
	public score : number = 0;
	public scoreDetails : string = "";

	constructor(q : Quiz, answers: object) {
		this.quiz = q;
		this.answers = answers;

		this.calculate();
	}

	private calculate() {
		for(let i = 0; i < this.quiz.questions.length; i++) {
			let q = this.quiz.questions[i];
			if(this.isQuestionCorrect(q, i)) {
				this.score++;
				this.scoreDetails += "1";
			} else {
				this.scoreDetails += "0";
			}
		}
	}

	private isQuestionCorrect(question : Question, index : number) : boolean {
		let correct = this.getCorrectOptions(question);
		let all = this.answers[index + ""];
		let subscore = 0;

		for(let key in all) {
			let val = all[key];
			if(val === true) {
				let s = this.getInputCorrect(+key, correct);
				if(s === 0) {
					subscore--;
				}
				subscore += s;
			}
		}
		console.log(subscore + "/" + correct.length)
		
		console.log("------");
		return subscore === correct.length;
	}

	private getCorrectOptions(question) {
		return question.options.filter(o => o.correct);
	}

	private getInputCorrect(id : number, correct) : number {
		let needed = correct.length;
		let matching = correct.filter(o => o.id === id);
		
		return matching.length;
	}
}

app.post("/submithighscore", async (req, res) => {
	let obj = {author: req.body.author, quiz: req.body.quiz, score: 0, scoredetails: "111111"};
	let size = Object.keys(req.body.answers).length
	let quiz = await DB.getFirstWhere(Quiz, {id: req.body.quiz});

	let grade = new QuizGrader(quiz, req.body.answers);
	console.log("Score: " + grade.score + " ", grade.scoreDetails);
	obj.score = grade.score;
	obj.scoredetails = grade.scoreDetails;

	await DB.create(Highscore, obj);
	res.json({...obj});
});
