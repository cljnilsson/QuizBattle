"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dbsubscriber_1 = __importDefault(require("./dbsubscriber"));
const User_1 = __importDefault(require("./models/User"));
class DB extends dbsubscriber_1.default {
    static async createUser(o) {
        let q = new User_1.default();
        let salt = await bcrypt_1.default.genSalt(10);
        let pass = await bcrypt_1.default.hash("admin", salt);
        o.pass = pass;
        for (const [key, value] of Object.entries(o)) {
            q[key] = value;
        }
        await this.save(q);
        return q;
    }
    static async create(c, o) {
        let q = new c();
        for (const [key, value] of Object.entries(o)) {
            q[key] = value;
        }
        await this.save(q);
        return q;
    }
    static async get(c) {
        let repo = this.connection.getRepository(c);
        let all = await repo.find({ cache: true });
        return all;
    }
    static async getWhere(c, filter) {
        const repository = this.connection.getRepository(c);
        let all = await repository.find({ where: filter, cache: true });
        return all;
    }
    static async getFirstWhere(c, filter) {
        const repository = this.connection.getRepository(c);
        let all = await repository.findOne({ where: filter, cache: true });
        return all;
    }
    static async save(c) {
        return await this.connection.manager.save(c);
    }
}
exports.default = DB;
