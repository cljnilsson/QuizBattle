"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = __importDefault(require("../server.js"));
const core_1 = __importDefault(require("../db/core"));
require("../db/generate");
const highscore_1 = __importDefault(require("../db/models/highscore"));
const quiz_1 = __importDefault(require("../db/models/quiz"));
server_js_1.default.get("/", (req, res) => {
    res.sendfile("./dist/public/index.html");
});
server_js_1.default.get("/allquiz", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield core_1.default.get(quiz_1.default));
}));
server_js_1.default.get("/specificquiz/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let quiz = yield core_1.default.getFirstWhere(quiz_1.default, { id: req.params.id });
    res.json(quiz);
}));
server_js_1.default.get("/gethighscores/:quizid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("requested highscores!");
    let highscores = yield core_1.default.getWhere(highscore_1.default, { quiz: req.params.quizid });
    console.log(highscores);
    res.json(highscores);
}));
server_js_1.default.get("*", (req, res) => {
    res.sendfile("./dist/public/index.html");
});
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
server_js_1.default.post("/submithighscore", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let obj = { author: req.body.author, quiz: req.body.quiz, score: 0, scoredetails: "111111" };
    let size = Object.keys(req.body.answers).length;
    let quiz = yield core_1.default.getFirstWhere(quiz_1.default, { id: req.body.quiz });
    let grade = new QuizGrader(quiz, req.body.answers);
    console.log("Score: " + grade.score + " ", grade.scoreDetails);
    obj.score = grade.score;
    obj.scoredetails = grade.scoreDetails;
    yield core_1.default.create(highscore_1.default, obj);
    res.json(Object.assign({}, obj));
}));
