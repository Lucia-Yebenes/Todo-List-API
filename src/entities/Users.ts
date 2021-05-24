import { Entity, Column, PrimaryGeneratedColumn,BaseEntity,OneToMany} from 'typeorm';
import { Todolist } from './Todolist';

@Entity()
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todolist, todolist => todolist.users)
    todolist: Todolist[];


  // @ManyToMany(() => Planet)
  // @JoinTable()
  // planets: Planet[];
  
}