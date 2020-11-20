import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Question from "./question";

@Entity()
class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 15})
	name: string;
	
	@Column()
    pass: string;

    @UpdateDateColumn()
    lastUpdate: Date;

    @CreateDateColumn()
    created: Date;
}

export default User;