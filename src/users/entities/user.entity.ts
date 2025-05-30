import { join } from 'path';
import { BookReview } from 'src/bookreviews/entities/bookreview.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';


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
  @JoinColumn({name: 'profileId'})
  profile: Profile;

  @OneToMany(() => BookReview, review => review.user)
  reviews: BookReview[];

  @Column({ nullable: true })
  profileId: string; // Foreign key to Profile entity, optional if using cascade
}