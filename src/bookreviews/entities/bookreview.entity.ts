import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';


import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';

@Entity()
export class BookReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column('int')
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Book, book => book.reviews)
  book: Book;

  @Column({ nullable: true })
  userId: string; // Foreign key to User entity, optional if using cascade
}