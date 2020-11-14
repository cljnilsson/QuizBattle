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
require("reflect-metadata");
const dbsubscriber_1 = __importDefault(require("./dbsubscriber"));
class DB extends dbsubscriber_1.default {
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
            return all;
        });
    }
    static getFirstWhere(c, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.connection.getRepository(c);
            let all = yield repository.findOne({ where: filter, cache: true });
            return all;
        });
    }
    static save(c) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection.manager.save(c);
        });
    }
}
DB.init();
exports.default = DB;
