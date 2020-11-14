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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class DBSubscriber {
    static set connection(val) {
        this._connection = val;
        for (let s of this.subscribers) {
            s();
        }
    }
    static get connection() {
        return this._connection;
    }
    static addSubscriber(callback) {
        this.subscribers.push(callback);
    }
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield typeorm_1.createConnection();
            console.log("Connected to db!");
        });
    }
}
DBSubscriber.subscribers = [];
exports.default = DBSubscriber;
