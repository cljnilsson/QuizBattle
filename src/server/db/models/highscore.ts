import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import Quiz from "./quiz";

@Entity()
class Highscore {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
	score: number;

	@Column()
	author: string;
	
	@Column()
    scoredetails: string;

	@ManyToOne(() => Quiz)
	quiz: Quiz;
}

export default Highscore;