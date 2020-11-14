import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Question from "./question";

@Entity()
class Quiz {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 15})
	name: string;
	
	@Column({length: 100})
	description: string;

    @Column()
    author: string;

    @Column()
	created: Date;
	
	@OneToMany(() => Question, question => question.quiz, {eager: true})
    questions: Question[];
}

export default Quiz;