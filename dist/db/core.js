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
exports.DB = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const quiz_1 = __importDefault(require("./models/quiz"));
const question_1 = __importDefault(require("./models/question"));
const option_1 = __importDefault(require("./models/option"));
class DB {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield typeorm_1.createConnection();
            console.log("Connected to db!");
        });
    }
    static create(c, o) {
        return __awaiter(this, void 0, void 0, function* () {
            let q = new c();
            for (const [key, value] of Object.entries(o)) {
                q[key] = value;
            }
            yield this.save(q);
            return q;
        });
    }
    static get(c) {
        return __awaiter(this, void 0, void 0, function* () {
            let repo = this.connection.getRepository(c);
            let all = yield repo.find({ cache: true });
            return all;
        });
    }
    static getWhere(c, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.connection.getRepository(c);
            let all = yield repository.find({ where: filter, cache: true });
            console.table(all);
            return all;
        });
    }
    static save(c) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection.manager.save(c);
        });
    }
}
exports.DB = DB;
(() => __awaiter(void 0, void 0, void 0, function* () {
    let t = yield DB.init();
    let all = yield DB.get(quiz_1.default);
    if (all.length === 0) {
        let quiz = yield DB.create(quiz_1.default, { author: "demoAdmin", created: new Date(), name: "Demo", description: "This is a demo quiz about random stuff. Very serious." });
        let question = yield DB.create(question_1.default, { text: "What is 1 + 1", quiz: quiz });
        DB.create(option_1.default, { text: "4", question: question });
        DB.create(option_1.default, { text: "3", question: question });
        DB.create(option_1.default, { text: "1", question: question });
        DB.create(option_1.default, { text: "2", question: question, correct: true });
    }
}))();
exports.default = DB;
