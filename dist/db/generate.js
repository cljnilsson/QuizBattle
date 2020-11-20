"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("./core"));
const quiz_1 = __importDefault(require("./models/quiz"));
const question_1 = __importDefault(require("./models/question"));
const option_1 = __importDefault(require("./models/option"));
const User_1 = __importDefault(require("./models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
core_1.default.addSubscriber(test);
async function test() {
    let users = await core_1.default.get(User_1.default);
    if (users.length === 0) {
        bcrypt_1.default.genSalt(10, function (err, salt) {
            bcrypt_1.default.hash("admin", salt, function (err, hash) {
                core_1.default.create(User_1.default, { name: "admin", pass: hash });
            });
        });
    }
    let all = await core_1.default.get(quiz_1.default);
    if (all.length === 0) {
        let quiz = await core_1.default.create(quiz_1.default, { author: "demoAdmin", name: "Demo", description: "This is a demo quiz about random stuff. Very serious." });
        let question = await core_1.default.create(question_1.default, { text: "What is 1 + 1", quiz: quiz });
        core_1.default.create(option_1.default, { text: "4", question: question });
        core_1.default.create(option_1.default, { text: "3", question: question });
        core_1.default.create(option_1.default, { text: "1", question: question });
        core_1.default.create(option_1.default, { text: "2", question: question, correct: true });
        question = await core_1.default.create(question_1.default, { text: "Who writes the worst code?", quiz: quiz });
        core_1.default.create(option_1.default, { text: "Victor", question: question });
        core_1.default.create(option_1.default, { text: "Mellberg", question: question });
        core_1.default.create(option_1.default, { text: "Philip", question: question, correct: true });
        core_1.default.create(option_1.default, { text: "Lukas", question: question });
        question = await core_1.default.create(question_1.default, { text: "Which nordic country is  the best?", quiz: quiz });
        core_1.default.create(option_1.default, { text: "Sweden", question: question, correct: true });
        core_1.default.create(option_1.default, { text: "Norway", question: question, correct: true });
        core_1.default.create(option_1.default, { text: "Finland", question: question, correct: true });
        core_1.default.create(option_1.default, { text: "Denmark", question: question, correct: true });
        core_1.default.create(option_1.default, { text: "Iceland", question: question, correct: true });
        question = await core_1.default.create(question_1.default, { text: "Which programming language is the worst", quiz: quiz });
        core_1.default.create(option_1.default, { text: "Php", question: question, correct: true });
        core_1.default.create(option_1.default, { text: "Java", question: question });
        core_1.default.create(option_1.default, { text: "C#", question: question });
        core_1.default.create(option_1.default, { text: "Python", question: question });
        core_1.default.create(option_1.default, { text: "C++", question: question });
        core_1.default.create(option_1.default, { text: "Lua", question: question });
        question = await core_1.default.create(question_1.default, { text: "!false", quiz: quiz });
        core_1.default.create(option_1.default, { text: "False", question: question });
        core_1.default.create(option_1.default, { text: "True", question: question, correct: true });
    }
}
