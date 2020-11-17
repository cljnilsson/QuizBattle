import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import Question from "./question";

@Entity()
class Quiz extends BaseEntity {

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