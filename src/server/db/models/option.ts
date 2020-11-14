import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import Question from "./question";

@Entity()
class Option {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 15})
	text: string;
	
	@Column()
    correct: boolean = false;

	@ManyToOne(() => Question, question => question.options)
	question: Question;
}

export default Option;