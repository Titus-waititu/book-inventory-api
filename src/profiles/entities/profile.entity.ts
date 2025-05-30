import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';


@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'text' })
  bio?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true, type: 'date' })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  location?: string;

  @OneToOne(() => User, user => user.profile)
  user: User;
}
