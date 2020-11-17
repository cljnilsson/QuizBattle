"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.adminBro = void 0;
const core_1 = __importDefault(require("./db/core"));
const admin_bro_1 = __importDefault(require("admin-bro"));
const express_1 = __importDefault(require("@admin-bro/express"));
const quiz_1 = __importDefault(require("./db/models/quiz"));
const question_1 = __importDefault(require("./db/models/question"));
const option_1 = __importDefault(require("./db/models/option"));
const highscore_1 = __importDefault(require("./db/models/highscore"));
quiz_1.default.useConnection(core_1.default.connection);
question_1.default.useConnection(core_1.default.connection);
option_1.default.useConnection(core_1.default.connection);
option_1.default.useConnection(core_1.default.connection);
const adminBro = new admin_bro_1.default({
    resources: [
        { resource: quiz_1.default },
        { resource: question_1.default },
        { resource: option_1.default },
        { resource: highscore_1.default },
    ],
    rootPath: '/admin',
});
exports.adminBro = adminBro;
const router = express_1.default.buildRouter(adminBro);
exports.router = router;
