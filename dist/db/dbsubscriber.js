"use strict";
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
    static async init() {
        this.connection = await typeorm_1.createConnection();
        console.log("Connected to db!");
        return this.connection;
    }
}
DBSubscriber.subscribers = [];
exports.default = DBSubscriber;
