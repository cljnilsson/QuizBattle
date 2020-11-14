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
const core_1 = __importDefault(require("./core"));
const quiz_1 = __importDefault(require("./models/quiz"));
const question_1 = __importDefault(require("./models/question"));
const option_1 = __importDefault(require("./models/option"));
core_1.default.addSubscriber(test);
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        let all = yield core_1.default.get(quiz_1.default);
        if (all.length === 0) {
            let quiz = yield core_1.default.create(quiz_1.default, { author: "demoAdmin", created: new Date(), name: "Demo", description: "This is a demo quiz about random stuff. Very serious." });
            let question = yield core_1.default.create(question_1.default, { text: "What is 1 + 1", quiz: quiz });
            core_1.default.create(option_1.default, { text: "4", question: question });
            core_1.default.create(option_1.default, { text: "3", question: question });
            core_1.default.create(option_1.default, { text: "1", question: question });
            core_1.default.create(option_1.default, { text: "2", question: question, correct: true });
            question = yield core_1.default.create(question_1.default, { text: "Who writes the worst code?", quiz: quiz });
            core_1.default.create(option_1.default, { text: "Victor", question: question });
            core_1.default.create(option_1.default, { text: "Mellberg", question: question });
            core_1.default.create(option_1.default, { text: "Philip", question: question, correct: true });
            core_1.default.create(option_1.default, { text: "Lukas", question: question });
            question = yield core_1.default.create(question_1.default, { text: "Which nordic country is  the best?", quiz: quiz });
            core_1.default.create(option_1.default, { text: "Sweden", question: question, correct: true });
            core_1.default.create(option_1.default, { text: "Norway", question: question, correct: true });
            core_1.default.create(option_1.default, { text: "Finland", question: question, correct: true });
            core_1.default.create(option_1.default, { text: "Denmark", question: question, correct: true });
            core_1.default.create(option_1.default, { text: "Iceland", question: question, correct: true });
            question = yield core_1.default.create(question_1.default, { text: "Which programming language is the worst", quiz: quiz });
            core_1.default.create(option_1.default, { text: "Php", question: question, correct: true });
            core_1.default.create(option_1.default, { text: "Java", question: question });
            core_1.default.create(option_1.default, { text: "C#", question: question });
            core_1.default.create(option_1.default, { text: "Python", question: question });
            core_1.default.create(option_1.default, { text: "C++", question: question });
            core_1.default.create(option_1.default, { text: "Lua", question: question });
            question = yield core_1.default.create(question_1.default, { text: "!false", quiz: quiz });
            core_1.default.create(option_1.default, { text: "False", question: question });
            core_1.default.create(option_1.default, { text: "True", question: question, correct: true });
        }
    });
}
