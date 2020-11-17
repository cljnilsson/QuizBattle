"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const core_1 = __importDefault(require("../db/core"));
require("../db/generate");
const highscore_1 = __importDefault(require("../db/models/highscore"));
const quiz_1 = __importDefault(require("../db/models/quiz"));
const QuizGrader_1 = __importDefault(require("../libs/QuizGrader"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    let db = yield core_1.default.init();
    Promise.resolve().then(() => __importStar(require("../server.js"))).then((app) => {
        app.get("/", (req, res) => {
            res.sendfile("./dist/public/index.html");
        });
        app.get("/allquiz", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            res.json(yield core_1.default.get(quiz_1.default));
        }));
        app.get("/specificquiz/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            let quiz = yield core_1.default.getFirstWhere(quiz_1.default, { id: req.params.id });
            res.json(quiz);
        }));
        app.get("/gethighscores/:quizid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("requested highscores!");
            let highscores = yield core_1.default.getWhere(highscore_1.default, { quiz: req.params.quizid });
            console.log(highscores);
            res.json(highscores);
        }));
        app.get("*", (req, res) => {
            res.sendfile("./dist/public/index.html");
        });
        app.post("/submithighscore", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            let obj = { author: req.body.author, quiz: req.body.quiz, score: 0, scoredetails: "111111" };
            let size = Object.keys(req.body.answers).length;
            let quiz = yield core_1.default.getFirstWhere(quiz_1.default, { id: req.body.quiz });
            let grade = new QuizGrader_1.default(quiz, req.body.answers);
            console.log("Score: " + grade.score + " ", grade.scoreDetails);
            obj.score = grade.score;
            obj.scoredetails = grade.scoreDetails;
            yield core_1.default.create(highscore_1.default, obj);
            res.json(Object.assign({}, obj));
        }));
    });
}))();
