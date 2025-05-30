import { BookReview } from 'src/bookreviews/entities/bookreview.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, profile => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => BookReview, review => review.user)
  reviews: BookReview[];
}