import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Users } from './Users';
@Entity()
export class Todolist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    done: boolean;

    @ManyToOne(() => Users, users => users.todolist)
    users: Users;

}