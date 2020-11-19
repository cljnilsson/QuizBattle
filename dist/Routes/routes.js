"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("../db/core"));
require("../db/generate");
const highscore_1 = __importDefault(require("../db/models/highscore"));
const question_1 = __importDefault(require("../db/models/question"));
const option_1 = __importDefault(require("../db/models/option"));
const quiz_1 = __importDefault(require("../db/models/quiz"));
const QuizGrader_1 = __importDefault(require("../libs/QuizGrader"));
const server_1 = __importDefault(require("../server"));
server_1.default.get("/", (req, res) => {
    res.sendfile("./dist/public/index.html");
});
server_1.default.get("/allquiz", async (req, res) => {
    res.json(await core_1.default.get(quiz_1.default));
});
server_1.default.get("/specificquiz/:id", async (req, res) => {
    let quiz = await core_1.default.getFirstWhere(quiz_1.default, { id: req.params.id });
    res.json(quiz);
});
server_1.default.get("/gethighscores/:quizid", async (req, res) => {
    let highscores = await core_1.default.getWhere(highscore_1.default, { quiz: req.params.quizid });
    res.json(highscores);
});
server_1.default.get("*", (req, res) => {
    res.sendfile("./dist/public/index.html");
});
server_1.default.post("/submithighscore", async (req, res) => {
    let obj = { author: req.body.author, quiz: req.body.quiz, score: 0, scoredetails: "" };
    let size = Object.keys(req.body.answers).length;
    let quiz = await core_1.default.getFirstWhere(quiz_1.default, { id: req.body.quiz });
    let grade = new QuizGrader_1.default(quiz, req.body.answers);
    obj.score = grade.score;
    obj.scoredetails = grade.scoreDetails;
    await core_1.default.create(highscore_1.default, obj);
    res.json(Object.assign({}, obj));
});
server_1.default.post("/createquiz", async (req, res) => {
    let _a = req.body, { questions } = _a, quiz = __rest(_a, ["questions"]);
    let parent = await core_1.default.create(quiz_1.default, quiz);
    for (let q of questions) {
        console.log(q);
        q.quiz = parent;
        let question = await core_1.default.create(question_1.default, q);
        for (let o of q.options) {
            o.question = question;
            core_1.default.create(option_1.default, o);
        }
    }
    res.json({ message: "success" });
});
