import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne} from "typeorm";
import Option from "./option";
import Quiz from "./quiz";

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 15})
    text: string;
	
	@OneToMany(() => Option, option => option.question, {eager: true})
	options: Option[];
	
	@ManyToOne(() => Quiz, quiz => quiz.questions)
	quiz: Quiz;
}

export default Question;