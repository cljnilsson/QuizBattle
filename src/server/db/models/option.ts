import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import Question from "./question";

@Entity()
class Option extends BaseEntity {

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