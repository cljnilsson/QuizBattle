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
const typeorm_1 = require("typeorm");
const admin_bro_1 = __importDefault(require("admin-bro"));
const typeorm_2 = require("@admin-bro/typeorm");
admin_bro_1.default.registerAdapter({ Database: typeorm_2.Database, Resource: typeorm_2.Resource });
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
            return this.connection;
        });
    }
}
DBSubscriber.subscribers = [];
exports.default = DBSubscriber;
