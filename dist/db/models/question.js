"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const option_1 = __importDefault(require("./option"));
const quiz_1 = __importDefault(require("./quiz"));
let Question = class Question {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], Question.prototype, "text", void 0);
__decorate([
    typeorm_1.OneToMany(() => option_1.default, option => option.question, { eager: true }),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    typeorm_1.ManyToOne(() => quiz_1.default, quiz => quiz.questions),
    __metadata("design:type", quiz_1.default)
], Question.prototype, "quiz", void 0);
Question = __decorate([
    typeorm_1.Entity()
], Question);
exports.default = Question;
