import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
class Quiz {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 15})
    name: string;

    @Column()
    author: string;

    @Column()
    created: Date;
}

export default Quiz;
export {Quiz};