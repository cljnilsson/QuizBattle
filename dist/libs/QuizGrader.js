"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuizGrader {
    constructor(q, answers) {
        this.score = 0;
        this.scoreDetails = "";
        this.quiz = q;
        this.answers = answers;
        this.calculate();
    }
    calculate() {
        for (let i = 0; i < this.quiz.questions.length; i++) {
            let q = this.quiz.questions[i];
            if (this.isQuestionCorrect(q, i)) {
                this.score++;
                this.scoreDetails += "1";
            }
            else {
                this.scoreDetails += "0";
            }
        }
    }
    isQuestionCorrect(question, index) {
        let correct = this.getCorrectOptions(question);
        let all = this.answers[index + ""];
        let subscore = 0;
        for (let key in all) {
            let val = all[key];
            if (val === true) {
                let s = this.getInputCorrect(+key, correct);
                if (s === 0) {
                    subscore--;
                }
                subscore += s;
            }
        }
        console.log(subscore + "/" + correct.length);
        console.log("------");
        return subscore === correct.length;
    }
    getCorrectOptions(question) {
        return question.options.filter(o => o.correct);
    }
    getInputCorrect(id, correct) {
        let needed = correct.length;
        let matching = correct.filter(o => o.id === id);
        return matching.length;
    }
}
exports.default = QuizGrader;
