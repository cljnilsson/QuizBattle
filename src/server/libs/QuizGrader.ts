import Question from "../db/models/question";
import Quiz from "../db/models/quiz";

export default class QuizGrader {
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