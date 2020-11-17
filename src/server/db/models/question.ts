import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, BaseEntity } from 'typeorm';
import Option from "./option";
import Quiz from "./quiz";

@Entity()
class Question extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    text: string;
	
	@OneToMany(() => Option, option => option.question, {eager: true})
	options: Option[];
	
	@ManyToOne(() => Quiz, quiz => quiz.questions)
	quiz: Quiz;
}

export default Question;